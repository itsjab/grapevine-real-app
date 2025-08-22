import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import type { ChatMessage } from '@/lib/types/chat';

export async function generateTitleFromUserMessage({
  message,
}: {
  message: ChatMessage;
}) {
  try {
    const { text: title } = await generateText({
      model: anthropic('claude-3-5-haiku-latest'),
      system: `\n
      - you will generate a short title based on the first message a user begins a conversation with
      - ensure it is not more than 80 characters long
    - the title should be a summary of the user's message
    - do not use quotes or colons`,
      prompt: JSON.stringify(message),
    });

    return title;
  } catch (error) {
    console.error('Error generating title:', error);
    return 'New Chat';
  }
}
