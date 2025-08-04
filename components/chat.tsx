'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import type { Session } from 'better-auth';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { getChatHistoryPaginationKey } from './sidebar-history';
import { toast } from 'sonner';
import { Messages } from '@/components/messages';
import { MultimodalInput } from '@/components/multimodal-input';
// import { ChatHeader } from '@/components/chat-header';
// import { useAutoResume } from '@/hooks/use-auto-resume';
import { GrapevineError } from '@/lib/errors';
import type { Attachment, ChatMessage } from '@/lib/types/chat';
import { fetchWithErrorHandlers, generateUUID } from '@/lib/utils';

export function Chat({
  id,
  initialMessages,
  isReadonly,
  session,
}: {
  id: string;
  initialMessages: ChatMessage[];
  isReadonly: boolean;
  session?: Session;
}) {
  // const { visibilityType } = useChatVisibility({
  //   chatId: id,
  //   initialVisibilityType,
  // });

  // const { mutate } = useSWRConfig();
  // const { setDataStream } = useDataStream();

  const [input, setInput] = useState<string>('');

  const {
    messages,
    setMessages,
    sendMessage,
    status,
    stop,
    regenerate,
    resumeStream,
  } = useChat<ChatMessage>({
    id,
    messages: initialMessages,
    experimental_throttle: 100,
    generateId: generateUUID,
    transport: new DefaultChatTransport({
      api: '/api/chat',
      fetch: fetchWithErrorHandlers,
      prepareSendMessagesRequest({ messages, id, body }) {
        return {
          body: {
            id,
            message: messages.at(-1),
            ...body,
          },
        };
      },
    }),
    // onData: (dataPart) => {
    //   setDataStream((ds) => (ds ? [...ds, dataPart] : []));
    // },
    // onFinish: () => {
    //   mutate(unstable_serialize(getChatHistoryPaginationKey));
    // },
    onError: (error) => {
      if (error instanceof GrapevineError) {
        toast.error(error.message);
      }
    },
  });

  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  const [hasAppendedQuery, setHasAppendedQuery] = useState(false);

  useEffect(() => {
    if (query && !hasAppendedQuery) {
      sendMessage({
        role: 'user' as const,
        parts: [{ type: 'text', text: query }],
      });

      setHasAppendedQuery(true);
      window.history.replaceState({}, '', `/chat/${id}`);
    }
  }, [query, sendMessage, hasAppendedQuery, id]);

  // const [attachments, setAttachments] = useState<Array<Attachment>>([]);

  // useAutoResume({
  //   autoResume,
  //   initialMessages,
  //   resumeStream,
  //   setMessages,
  // });

  return (
    <div className="flex flex-col min-w-0 h-[calc(100vh-2.5rem)] md:h-[calc(100vh-4rem)] bg-background">
      {/* <ChatHeader
        chatId={id}
        selectedModelId={initialChatModel}
        selectedVisibilityType={initialVisibilityType}
        isReadonly={isReadonly}
        session={session}
      /> */}

      <Messages
        chatId={id}
        status={status}
        messages={messages}
        setMessages={setMessages}
        regenerate={regenerate}
        isReadonly={isReadonly}
        isArtifactVisible={false}
      />

      <form className="flex mx-auto md:pb-6 gap-2 w-full md:max-w-3xl">
        {!isReadonly && (
          <MultimodalInput
            chatId={id}
            input={input}
            setInput={setInput}
            status={status}
            stop={stop}
            // attachments={attachments}
            // setAttachments={setAttachments}
            messages={messages}
            setMessages={setMessages}
            sendMessage={sendMessage}
            // selectedVisibilityType={visibilityType}
          />
        )}
      </form>
    </div>
  );
}
