import 'dotenv/config';
import { vertexAnthropic } from '@ai-toolkit/google-vertex/anthropic';
import { streamText } from 'ai-toolkit';
import fs from 'node:fs';

async function main() {
  const result = streamText({
    model: vertexAnthropic('claude-3-5-sonnet-v2@20241022'),
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Describe the image in detail.' },
          { type: 'image', image: fs.readFileSync('./data/comic-cat.png') },
        ],
      },
    ],
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }
}

main().catch(console.error);
