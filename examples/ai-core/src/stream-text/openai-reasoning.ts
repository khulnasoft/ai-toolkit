import { openai } from '@ai-toolkit/openai';
import { streamText } from 'ai-toolkit';
import 'dotenv/config';

async function main() {
  const result = streamText({
    model: openai('o3-mini'),
    prompt: 'How many "r"s are in the word "strawberry"?',
    temperature: 0.5, // should get ignored (warning)
    maxTokens: 1000, // mapped to max_completion_tokens
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log();
  console.log('Usage:', {
    ...(await result.usage),
    reasoningTokens: (await result.providerMetadata)?.openai?.reasoningTokens,
  });
  console.log('Warnings:', await result.warnings);
}

main().catch(console.error);
