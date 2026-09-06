# AI TOOLKIT - ByteDance Provider

The **[ByteDance provider](https://studio.khulnasoft.com/providers/ai-toolkit-providers/bytedance)** for the [AI TOOLKIT](https://studio.khulnasoft.com/docs) contains video and image model support for the [ByteDance ModelArk API](https://arkmodelplatform.page.link/).

## Setup

The ByteDance provider is available in the `@ai-toolkit/bytedance` module. You can install it with

```bash
npm i @ai-toolkit/bytedance
```

## Provider Instance

You can import the default provider instance `byteDance` from `@ai-toolkit/bytedance`:

```ts
import { byteDance } from '@ai-toolkit/bytedance';
```

## Video Generation Example

```ts
import { byteDance } from '@ai-toolkit/bytedance';
import { experimental_generateVideo as generateVideo } from 'ai-toolkit';

const { video } = await generateVideo({
  model: byteDance.video('seedance-1-0-pro-250528'),
  prompt: 'A cat walking on a treadmill',
});
```

## Image Generation Example

```ts
import { byteDance } from '@ai-toolkit/bytedance';
import { generateImage } from 'ai-toolkit';

const { image } = await generateImage({
  model: byteDance.image('seedream-5-0-260128'),
  prompt: 'A cat wearing a intricate robe',
});
```

## Additional Options

If you want to pass additional inputs to the model besides the prompt, use the `providerOptions.bytedance` property:

```ts
const { video } = await generateVideo({
  model: byteDance.video('seedance-1-0-pro-250528'),
  prompt: 'A cat walking on a treadmill',
  aspectRatio: 'adaptive',
  providerOptions: {
    bytedance: {
      generateAudio: true,
    },
  },
});
```

## Documentation

Please check out the **[ByteDance provider](https://studio.khulnasoft.com/providers/ai-toolkit-providers/bytedance)** for more information.
