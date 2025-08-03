import { anthropic } from '@ai-sdk/anthropic';
// import { geolocation } from '@vercel/functions';
import {
  convertToModelMessages,
  createUIMessageStream,
  JsonToSseTransformStream,
  smoothStream,
  stepCountIs,
  streamText,
} from 'ai';
import type { UserWithAnonymous } from 'better-auth/plugins';
import { headers } from 'next/headers';
// import { after } from 'next/server';
// import {
//   createResumableStreamContext,
//   type ResumableStreamContext,
// } from 'resumable-stream';
import { getQuotaByUserType } from '@/lib/ai/usage-quota';
import { auth } from '@/lib/auth';
import {
  createStreamId,
  deleteChatById,
  getChatById,
  getMessageCountByUserId,
  getMessagesByChatId,
  saveChat,
  saveMessages,
} from '@/lib/db/queries/chat';
import { GrapevineError } from '@/lib/errors';
import type { ChatMessage } from '@/lib/types/chat';
import { convertToUIMessages, generateUUID } from '@/lib/utils';
// import { generateTitleFromUserMessage } from '../../actions';
import { type PostRequestBody, postRequestBodySchema } from './schema';

export const maxDuration = 60;

// let globalStreamContext: ResumableStreamContext | null = null;

// export function getStreamContext() {
//   if (!globalStreamContext) {
//     try {
//       globalStreamContext = createResumableStreamContext({
//         waitUntil: after,
//       });
//     } catch (error: any) {
//       if (error.message.includes('REDIS_URL')) {
//         console.log(
//           ' > Resumable streams are disabled due to missing REDIS_URL',
//         );
//       } else {
//         console.error(error);
//       }
//     }
//   }

//   return globalStreamContext;
// }

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (_error) {
    console.error('Failed to parse request body:', _error);
    return new GrapevineError('bad_request:api').toResponse();
  }

  try {
    const {
      id,
      message,
    }: {
      id: string;
      message: ChatMessage;
    } = requestBody;

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return new GrapevineError('unauthorized:chat').toResponse();
    }

    const messageCount = await getMessageCountByUserId({
      id: session.user.id,
      differenceInHours: 24,
    });

    const quota = getQuotaByUserType(session.user as UserWithAnonymous);

    if (messageCount > quota.maxMessagesPerDay) {
      return new GrapevineError('rate_limit:chat').toResponse();
    }

    const chat = await getChatById({ id });

    if (!chat) {
      // const title = await generateTitleFromUserMessage({
      //   message,
      // });

      const title = 'New Chat';

      await saveChat({
        id,
        userId: session.user.id,
        title,
      });
    } else {
      if (chat.userId !== session.user.id) {
        return new GrapevineError('forbidden:chat').toResponse();
      }
    }

    const messagesFromDb = await getMessagesByChatId({ id });
    const uiMessages = [...convertToUIMessages(messagesFromDb), message];

    // const { longitude, latitude, city, country } = geolocation(request);

    // const requestHints: RequestHints = {
    //   longitude,
    //   latitude,
    //   city,
    //   country,
    // };

    await saveMessages({
      messages: [
        {
          chatId: id,
          id: message.id,
          role: 'user',
          parts: message.parts,
          attachments: [],
          createdAt: new Date(),
        },
      ],
    });

    const streamId = generateUUID();
    await createStreamId({ streamId, chatId: id });

    const stream = createUIMessageStream({
      execute: ({ writer: dataStream }) => {
        const result = streamText({
          model: anthropic('claude-sonnet-4-20250514'),
          system: 'You are a helpful wine expert',
          messages: convertToModelMessages(uiMessages),
          stopWhen: stepCountIs(5),
          experimental_transform: smoothStream({ chunking: 'word' }),
          tools: {},
          // experimental_telemetry: {
          //   isEnabled: isProductionEnvironment,
          //   functionId: 'stream-text',
          // },
        });

        result.consumeStream();

        dataStream.merge(
          result.toUIMessageStream({
            sendReasoning: true,
          }),
        );
      },
      generateId: generateUUID,
      onFinish: async ({ messages }) => {
        await saveMessages({
          messages: messages.map((message) => ({
            id: message.id,
            role: message.role,
            parts: message.parts,
            createdAt: new Date(),
            attachments: [],
            chatId: id,
          })),
        });
      },
      onError: () => {
        return 'Oops, an error occurred!';
      },
    });

    // const streamContext = getStreamContext();

    // if (streamContext) {
    //   return new Response(
    //     await streamContext.resumableStream(streamId, () =>
    //       stream.pipeThrough(new JsonToSseTransformStream()),
    //     ),
    //   );
    // } else {
    // }
    return new Response(stream.pipeThrough(new JsonToSseTransformStream()));
  } catch (error) {
    if (error instanceof GrapevineError) {
      return error.toResponse();
    }
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return new GrapevineError('bad_request:api').toResponse();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return new GrapevineError('unauthorized:chat').toResponse();
  }

  const chat = await getChatById({ id });

  if (chat.userId !== session.user.id) {
    return new GrapevineError('forbidden:chat').toResponse();
  }

  const deletedChat = await deleteChatById({ id });

  return Response.json(deletedChat, { status: 200 });
}
