import type { InferUITool, UIMessage } from 'ai';
import { z } from 'zod';
import type { getTastingNotes } from '@/lib/ai/tools/get-tasting-notes';
import type { saveTastingNote } from '@/lib/ai/tools/save-tasting-note';

type tastingNoteTool = InferUITool<ReturnType<typeof saveTastingNote>>;
type getTastingNotesTool = InferUITool<ReturnType<typeof getTastingNotes>>;

export type DataPart = { type: 'append-message'; message: string };

export const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

export type MessageMetadata = z.infer<typeof messageMetadataSchema>;

export type ChatTools = {
  saveTastingNote: tastingNoteTool;
  getTastingNotes: getTastingNotesTool;
};

export type CustomUIDataTypes = {
  textDelta: string;
  appendMessage: string;
  id: string;
  title: string;
  clear: null;
  finish: null;
};

export type ChatMessage = UIMessage<
  MessageMetadata,
  CustomUIDataTypes,
  ChatTools
>;

export interface Attachment {
  name: string;
  url: string;
  contentType: string;
}
