import { openai } from '@ai-toolkit/openai';
import { streamText } from 'ai-toolkit';
import 'dotenv/config';

async function main() {
  const result = streamText({
    model: openai('gpt-3.5-turbo'),
    maxTokens: 512,
    temperature: 0.3,
    maxRetries: 5,
    prompt: 'Invent a new holiday and describe its traditions.',
    providerOptions: {
      openai: {
        store: true,
        metadata: {
          custom: 'value',
        },
      },
    },
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log();
  console.log('Token usage:', await result.usage);
  console.log('Finish reason:', await result.finishReason);
}

main().catch(console.error);
