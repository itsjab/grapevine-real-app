import type { Session } from '@/lib/auth';
import { db } from '@/lib/db';
import { type TastingNoteToolInput, tastingNote } from '@/lib/db/schema/wine';
import { GrapevineError } from '@/lib/errors';
import { generateUUID } from '@/lib/utils';

export async function createTastingNote({
  input,
  session,
}: {
  input: TastingNoteToolInput;
  session: Session;
}) {
  if (!session) {
    throw new GrapevineError('unauthorized:auth');
  }
  const id = generateUUID();

  const tastingNoteData = {
    ...input,
    id,
    userId: session.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const [result] = await db
      .insert(tastingNote)
      .values(tastingNoteData)
      .returning();
    return result;
  } catch (_error) {
    throw new GrapevineError('internal_error:database');
  }
}
