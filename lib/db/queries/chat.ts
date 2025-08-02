import { asc, eq } from 'drizzle-orm';

import { db } from '@/lib/db';

import { chat, message } from '@/lib/db/schema/chat';
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
