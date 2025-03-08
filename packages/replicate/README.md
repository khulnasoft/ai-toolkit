# AI TOOLKIT - Replicate Provider

The **[Replicate provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/replicate)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) contains image model support for the Replicate API.

## Setup

The Replicate provider is available in the `@ai-toolkit/replicate` module. You can install it with

```bash
npm i @ai-toolkit/replicate
```

## Usage

```ts
import { replicate } from '@ai-toolkit/replicate';
import { experimental_generateImage as generateImage } from 'ai-toolkit';

const { image } = await generateImage({
  model: replicate.image('black-forest-labs/flux-schnell'),
  prompt: 'The Loch Ness Monster getting a manicure',
});

const filename = `image-${Date.now()}.png`;
fs.writeFileSync(filename, image.uint8Array);
console.log(`Image saved to ${filename}`);
```

If you want to pass additional inputs to the model besides the prompt, use the `providerOptions.replicate` property:

```ts
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
```

## Documentation

Please check out the **[Replicate provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/replicate)** for more information.
