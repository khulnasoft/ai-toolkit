import { mistral } from '@ai-toolkit/mistral';
import { generateText } from 'ai-toolkit';
import 'dotenv/config';

async function main() {
  const result = await generateText({
    model: mistral('mistral-small-latest'),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: 'What is an embedding model according to this document?',
          },
          {
            type: 'file',
            data: new URL(
              'https://github.com/khulnasoft/ai-toolkit/blob/main/examples/ai-core/data/ai.pdf?raw=true',
            ),
            mimeType: 'application/pdf',
          },
        ],
      },
    ],
  });

  console.log(result.text);
}

main().catch(console.error);
