'use server';

import { desc, eq } from 'drizzle-orm';
import { after } from 'next/server';
import { generateGradientFromTastingNote } from '@/lib/ai/tools/generate-gradient';
import type { Session } from '@/lib/auth';
import { db } from '@/lib/db';
import {
  type TastingNoteSelect,
  type TastingNoteToolInput,
  tastingNote,
} from '@/lib/db/schema/wine';
import { GrapevineError } from '@/lib/errors';
import { generateUUID } from '@/lib/utils';

export async function addGradientToTastingNote(note: TastingNoteSelect) {
  const gradient = await generateGradientFromTastingNote(note);

  try {
    await db
      .update(tastingNote)
      .set({
        gradient,
        updatedAt: new Date(),
      })
      .where(eq(tastingNote.id, note.id));
  } catch (error) {
    console.error('Failed to add gradient to tasting note:', error);
  }
}

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

    after(async () => await addGradientToTastingNote(result));

    return result;
  } catch (_error) {
    throw new GrapevineError('internal_error:database');
  }
}

export async function getRecentTastingNotes(session: Session) {
  if (!session) {
    throw new GrapevineError('unauthorized:auth');
  }

  try {
    const recentNotes = await db
      .select({
        id: tastingNote.id,
        title: tastingNote.title,
        wineName: tastingNote.wineName,
        grapeVarieties: tastingNote.grapeVarieties,
        createdAt: tastingNote.createdAt,
      })
      .from(tastingNote)
      .where(eq(tastingNote.userId, session.user.id))
      .orderBy(desc(tastingNote.createdAt))
      .limit(4);

    return recentNotes;
  } catch (_error) {
    throw new GrapevineError('internal_error:database');
  }
}
