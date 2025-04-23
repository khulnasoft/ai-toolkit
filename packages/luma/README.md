# AI TOOLKIT - Luma Provider

The **Luma provider** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) contains support for Luma AI's state-of-the-art image generation models - Photon and Photon Flash.

## About Luma Photon Models

Luma Photon and Photon Flash are groundbreaking image generation models that deliver:

- Ultra-high quality image generation
- 10x higher cost efficiency compared to similar models
- Superior prompt understanding and adherence
- Unique character consistency capabilities from single reference images
- Multi-image reference support for precise style matching

For more detailed information about the Luma models and their capabilities, please visit [Luma AI](https://lumalabs.ai/).

## Setup

The Luma provider is available in the `@ai-toolkit/luma` module. You can install it with:

```bash
npm i @ai-toolkit/luma
```

## Provider Instance

You can import the default provider instance `luma` from `@ai-toolkit/luma`:

```ts
import { luma } from '@ai-toolkit/luma';
```

## Image Generation Example

```ts
import { luma } from '@ai-toolkit/luma';
import { experimental_generateImage as generateImage } from 'ai';
import fs from 'fs';

const { image } = await generateImage({
  model: luma.image('photon-1'),
  prompt: 'A serene mountain landscape at sunset',
});

const filename = `image-${Date.now()}.png`;
fs.writeFileSync(filename, image.uint8Array);
console.log(`Image saved to ${filename}`);
```

## Documentation

Please check out the **[Luma provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/luma)** for more information.
