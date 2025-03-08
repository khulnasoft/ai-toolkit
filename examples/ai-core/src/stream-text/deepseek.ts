import { deepseek } from '@ai-toolkit/deepseek';
import { streamText } from 'ai-toolkit';
import 'dotenv/config';

async function main() {
  const result = streamText({
    model: deepseek('deepseek-chat'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log();
  console.log('Token usage:', await result.usage);
  console.log('Finish reason:', await result.finishReason);
}

main().catch(console.error);
