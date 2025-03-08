import { openai } from '@ai-toolkit/openai';
import { generateText } from 'ai-toolkit';
import 'dotenv/config';

async function main() {
  const { text, usage } = await generateText({
    model: openai('gpt-3.5-turbo'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  console.log(text);
  console.log();
  console.log('Usage:', usage);
}

main().catch(console.error);
