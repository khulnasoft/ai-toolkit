import { openai } from '@ai-toolkit/openai';
import { generateText } from 'ai-toolkit';
import fs from 'node:fs';
import 'dotenv/config';

async function main() {
  const result = await generateText({
    model: openai('gpt-4o-audio-preview'),
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'What is the audio saying?' },
          {
            type: 'file',
            mimeType: 'audio/mpeg',
            data: fs.readFileSync('./data/galileo.mp3'),
          },
        ],
      },
    ],
  });

  console.log(result.text);
}

main().catch(console.error);
