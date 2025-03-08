import 'dotenv/config';
import { xai } from '@ai-toolkit/xai';
import { generateText } from 'ai-toolkit';

async function main() {
  const result = await generateText({
    model: xai('grok-2-1212'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  console.log(result.text);
  console.log();
  console.log('Token usage:', result.usage);
  console.log('Finish reason:', result.finishReason);
}

main().catch(console.error);
