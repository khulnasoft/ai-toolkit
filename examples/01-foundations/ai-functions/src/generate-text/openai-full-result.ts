import { openai } from '@ai-toolkit/openai';
import { generateText } from 'ai-toolkit';
import { run } from '../lib/run';

run(async () => {
  const result = await generateText({
    model: openai('gpt-4o-mini'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  console.log(JSON.stringify(result, null, 2));
});
