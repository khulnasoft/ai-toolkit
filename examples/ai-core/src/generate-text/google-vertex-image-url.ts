import { vertex } from '@ai-toolkit/google-vertex';
import { generateText } from 'ai';
import 'dotenv/config';

async function main() {
  const result = await generateText({
    model: vertex('gemini-1.5-flash'),
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Describe the image in detail.' },
          {
            type: 'image',
            image:
              'https://github.com/khulnasoft/ai/blob/main/examples/ai-core/data/comic-cat.png?raw=true',
          },
        ],
      },
    ],
  });

  console.log(result.text);
}

main().catch(console.error);
