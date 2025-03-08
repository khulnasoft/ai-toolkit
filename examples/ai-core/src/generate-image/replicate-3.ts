import { replicate } from '@ai-toolkit/replicate';
import { experimental_generateImage as generateImage } from 'ai-toolkit';
import { presentImages } from '../lib/present-image';
import 'dotenv/config';

async function main() {
  const { image } = await generateImage({
    model: replicate.image('recraft-ai/recraft-v3'),
    prompt: 'The Loch Ness Monster getting a manicure',
    size: '1365x1024',
    providerOptions: {
      replicate: {
        style: 'realistic_image',
      },
    },
  });

  await presentImages([image]);
}

main().catch(console.error);
