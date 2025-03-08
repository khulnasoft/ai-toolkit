import { cohere } from '@ai-toolkit/cohere';
import { generateText } from 'ai-toolkit';
import 'dotenv/config';

async function main() {
  const { text, usage } = await generateText({
    model: cohere('command-r-plus'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  console.log(text);
  console.log();
  console.log('Usage:', usage);
}

main().catch(console.error);
