import { tool, type UIMessageStreamWriter } from 'ai';
import type { Session } from '@/lib/auth';
import { createTastingNote } from '@/lib/db/queries/tasting-note';
import { tastingNoteToolInputSchema } from '@/lib/db/schema/wine';
import type { ChatMessage } from '@/lib/types/chat';

interface SaveTastingNoteProps {
  session: Session;
  dataStream: UIMessageStreamWriter<ChatMessage>;
}

export const saveTastingNote = ({
  session,
  dataStream,
}: SaveTastingNoteProps) =>
  tool({
    description:
      'Save the tasting note to the database once the user is done assessing the wine.',
    inputSchema: tastingNoteToolInputSchema,
    execute: async (data) => {
      const tastingNote = await createTastingNote({ input: data, session });

      dataStream.write({
        type: 'data-finish',
        data: null,
        transient: true,
      });

      return tastingNote;
    },
  });
