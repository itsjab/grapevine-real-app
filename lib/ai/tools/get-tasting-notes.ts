import { tool } from 'ai';
import { z } from 'zod';
import type { Session } from '@/lib/auth';
import { getAllTastingNotes } from '@/lib/db/queries/tasting-note';

interface GetTastingNotesProps {
  session: Session;
}

export const getTastingNotes = ({ session }: GetTastingNotesProps) =>
  tool({
    description: "Get all of the user's tasting notes from the database",
    inputSchema: z.object({}),
    execute: async () => {
      const tastingNotes = await getAllTastingNotes(session);
      return {
        tastingNotes,
        count: tastingNotes.length,
      };
    },
  });
