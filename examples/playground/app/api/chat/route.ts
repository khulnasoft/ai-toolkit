import { streamText } from 'ai';
import { getProviderModel } from '@/lib/providers';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, providerId, modelId } = await req.json();

  try {
    const model = getProviderModel(providerId, modelId);

    const result = await streamText({
      model,
      messages,
      temperature: 0.7,
      maxTokens: 1000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
