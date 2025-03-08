import { groq } from '@ai-toolkit/groq';
import { generateText } from 'ai-toolkit';
import 'dotenv/config';

async function main() {
  const result = await generateText({
    model: groq('gemma2-9b-it'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  console.log(result.text);
  console.log();
  console.log('Token usage:', result.usage);
  console.log('Finish reason:', result.finishReason);
}

main().catch(console.error);
