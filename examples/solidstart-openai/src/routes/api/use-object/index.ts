import { openai } from '@ai-toolkit/openai';
import { streamObject } from 'ai-toolkit';
import { notificationSchema } from './schema';
import { APIHandler } from '@solidjs/start/server';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export const POST: APIHandler = async ({ request }) => {
  const context = await request.json();

  const result = streamObject({
    model: openai('gpt-4o'),
    prompt: `Generate 3 notifications for a messages app in this context: ${context}`,
    schema: notificationSchema,
  });

  return result.toTextStreamResponse();
};
