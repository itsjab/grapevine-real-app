import { and, asc, count, desc, eq, gt, gte, lt, type SQL } from 'drizzle-orm';

import type { Session } from '@/lib/auth';
import { db } from '@/lib/db';

import {
  type Chat,
  chat,
  type DBMessage,
  message,
  stream,
} from '@/lib/db/schema/chat';
import { GrapevineError } from '@/lib/errors';

export async function getChatById({ id }: { id: string }) {
  try {
    const [selectedChat] = await db.select().from(chat).where(eq(chat.id, id));
    return selectedChat;
  } catch (_error) {
    throw new GrapevineError(
      'bad_request:database',
      'Failed to get chat by id',
    );
  }
}

export async function getMessagesByChatId({ id }: { id: string }) {
  try {
    return await db
      .select()
      .from(message)
      .where(eq(message.chatId, id))
      .orderBy(asc(message.createdAt));
  } catch (_error) {
    throw new GrapevineError(
      'bad_request:database',
      'Failed to get messages by chat id',
    );
  }
}

export async function createStreamId({
  streamId,
  chatId,
}: {
  streamId: string;
  chatId: string;
}) {
  try {
    await db
      .insert(stream)
      .values({ id: streamId, chatId, createdAt: new Date() });
  } catch (error) {
    throw new GrapevineError(
      'bad_request:database',
      'Failed to create stream id',
    );
  }
}

export async function getMessageCountByUserId({
  id,
  differenceInHours,
}: {
  id: string;
  differenceInHours: number;
}) {
  try {
    const hoursAgo = new Date(Date.now() - differenceInHours * 60 * 60 * 1000);

    const [stats] = await db
      .select({ count: count(message.id) })
      .from(message)
      .innerJoin(chat, eq(message.chatId, chat.id))
      .where(
        and(
          eq(chat.userId, id),
          gte(message.createdAt, hoursAgo),
          eq(message.role, 'user'),
        ),
      )
      .execute();

    return stats?.count ?? 0;
  } catch (_error) {
    throw new GrapevineError(
      'bad_request:database',
      'Failed to get message count by user id',
    );
  }
}

export async function deleteChatById({ id }: { id: string }) {
  try {
    await db.delete(message).where(eq(message.chatId, id));
    await db.delete(stream).where(eq(stream.chatId, id));

    const [chatsDeleted] = await db
      .delete(chat)
      .where(eq(chat.id, id))
      .returning();
    return chatsDeleted;
  } catch (_error) {
    throw new GrapevineError(
      'bad_request:database',
      'Failed to delete chat by id',
    );
  }
}

export async function getChatsByUserId({
  id,
  limit,
  startingAfter,
  endingBefore,
}: {
  id: string;
  limit: number;
  startingAfter: string | null;
  endingBefore: string | null;
}) {
  try {
    const extendedLimit = limit + 1;

    const query = (whereCondition?: SQL<any>) =>
      db
        .select()
        .from(chat)
        .where(
          whereCondition
            ? and(whereCondition, eq(chat.userId, id))
            : eq(chat.userId, id),
        )
        .orderBy(desc(chat.createdAt))
        .limit(extendedLimit);

    let filteredChats: Array<Chat> = [];

    if (startingAfter) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, startingAfter))
        .limit(1);

      if (!selectedChat) {
        throw new GrapevineError(
          'not_found:database',
          `Chat with id ${startingAfter} not found`,
        );
      }

      filteredChats = await query(gt(chat.createdAt, selectedChat.createdAt));
    } else if (endingBefore) {
      const [selectedChat] = await db
        .select()
        .from(chat)
        .where(eq(chat.id, endingBefore))
        .limit(1);

      if (!selectedChat) {
        throw new GrapevineError(
          'not_found:database',
          `Chat with id ${endingBefore} not found`,
        );
      }

      filteredChats = await query(lt(chat.createdAt, selectedChat.createdAt));
    } else {
      filteredChats = await query();
    }

    const hasMore = filteredChats.length > limit;

    return {
      chats: hasMore ? filteredChats.slice(0, limit) : filteredChats,
      hasMore,
    };
  } catch (_error) {
    throw new GrapevineError(
      'bad_request:database',
      'Failed to get chats by user id',
    );
  }
}

export async function saveMessages({
  messages,
}: {
  messages: Array<DBMessage>;
}) {
  try {
    return await db.insert(message).values(messages);
  } catch (_error) {
    throw new GrapevineError('bad_request:database', 'Failed to save messages');
  }
}

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string;
  title: string;
}) {
  try {
    return await db.insert(chat).values({
      id,
      createdAt: new Date(),
      userId,
      title,
      visibility: 'private',
    });
  } catch (_error) {
    throw new GrapevineError('bad_request:database', 'Failed to save chat');
  }
}

export async function getRecentChats(session: Session) {
  if (!session) {
    throw new GrapevineError('unauthorized:auth');
  }

  try {
    const recentChats = await db
      .select({
        id: chat.id,
        title: chat.title,
        createdAt: chat.createdAt,
      })
      .from(chat)
      .where(eq(chat.userId, session.user.id))
      .orderBy(desc(chat.createdAt))
      .limit(4);

    return recentChats;
  } catch (_error) {
    throw new GrapevineError('internal_error:database');
  }
}
