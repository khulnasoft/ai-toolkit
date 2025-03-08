import { google } from '@ai-toolkit/google';
import { embedMany } from 'ai-toolkit';
import 'dotenv/config';

async function main() {
  const { embeddings, usage } = await embedMany({
    model: google.textEmbeddingModel('text-embedding-004'),
    values: [
      'sunny day at the beach',
      'rainy afternoon in the city',
      'snowy night in the mountains',
    ],
  });

  console.log(embeddings);
  console.log(usage);
}

main().catch(console.error);
