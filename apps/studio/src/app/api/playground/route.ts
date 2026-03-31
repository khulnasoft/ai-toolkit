import { streamText } from 'ai';
import { z } from 'zod';

const requestSchema = z.object({
  model: z.string(),
  systemPrompt: z.string(),
  userPrompt: z.string(),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().min(1).max(128000),
  topP: z.number().min(0).max(1),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { model, systemPrompt, userPrompt, temperature, maxTokens, topP } =
      requestSchema.parse(body);

    const result = streamText({
      model,
      system: systemPrompt,
      prompt: userPrompt,
      temperature,
      maxTokens,
      topP,
    });

    return result.toTextStreamResponse();
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
