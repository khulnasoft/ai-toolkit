import { streamText } from 'ai';
import { z } from 'zod';

const messageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string(),
});

const requestSchema = z.object({
  model: z.string().default('openai/gpt-4o'),
  messages: z.array(messageSchema),
  systemPrompt: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { model, messages, systemPrompt } = requestSchema.parse(body);

    const result = streamText({
      model,
      system: systemPrompt || 'You are a helpful AI assistant.',
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    });

    return result.toDataStreamResponse();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: 'Invalid request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
