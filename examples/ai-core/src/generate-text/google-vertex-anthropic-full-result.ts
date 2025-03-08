import 'dotenv/config';
import { vertexAnthropic } from '@ai-toolkit/google-vertex/anthropic';
import { generateText } from 'ai-toolkit';

async function main() {
  const result = await generateText({
    model: vertexAnthropic('claude-3-5-sonnet-v2@20241022'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
