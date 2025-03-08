// @ts-nocheck
import { generateText } from 'ai-toolkit';
import { createCohere } from '@ai-toolkit/cohere';
import { nanoid } from 'ai-toolkit';
import 'dotenv/config';

async function main() {
  const cohereProvider = createCohere({
    generateId: nanoid,
  });

  const { text } = await generateText({
    model: cohereProvider('command-r-plus'),
    prompt: 'Write a short story about red pandas.',
  });
  console.log(text);
}

main().catch(console.error);
