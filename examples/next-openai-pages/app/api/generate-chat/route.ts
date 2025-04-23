import { CoreMessage, generateText } from 'ai';
import { openai } from '@ai-toolkit/openai';

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const { response } = await generateText({
    model: openai('gpt-4'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return Response.json({ messages: response.messages });
}
