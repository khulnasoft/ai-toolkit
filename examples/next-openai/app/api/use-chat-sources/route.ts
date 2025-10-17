import { vertex } from '@ai-toolkit/google-vertex';
import { perplexity } from '@ai-toolkit/perplexity';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    // model: vertex('gemini-1.5-flash', { useSearchGrounding: true }),
    model: perplexity('sonar-pro'),
    messages,
  });

  return result.toDataStreamResponse({
    sendSources: true,
  });
}
