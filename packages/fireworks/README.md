# AI TOOLKIT - Fireworks Provider

The **[Fireworks provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/fireworks)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) contains language model and image model support for the [Fireworks](https://fireworks.ai) platform.

## Setup

The Fireworks provider is available in the `@ai-toolkit/fireworks` module. You can install it with

```bash
npm i @ai-toolkit/fireworks
```

## Provider Instance

You can import the default provider instance `fireworks` from `@ai-toolkit/fireworks`:

```ts
import { fireworks } from '@ai-toolkit/fireworks';
```

## Language Model Example

```ts
import { fireworks } from '@ai-toolkit/fireworks';
import { generateText } from 'ai-toolkit';

const { text } = await generateText({
  model: fireworks('accounts/fireworks/models/deepseek-v3'),
  prompt: 'Write a JavaScript function that sorts a list:',
});
```

## Image Model Examples

```ts
import { fireworks } from '@ai-toolkit/fireworks';
import { experimental_generateImage as generateImage } from 'ai-toolkit';
import fs from 'fs';

const { image } = await generateImage({
  model: fireworks.image('accounts/fireworks/models/flux-1-dev-fp8'),
  prompt: 'A serene mountain landscape at sunset',
});
const filename = `image-${Date.now()}.png`;
fs.writeFileSync(filename, image.uint8Array);
console.log(`Image saved to ${filename}`);
```

## Documentation

Please check out the **[Fireworks provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/fireworks)** for more information.
