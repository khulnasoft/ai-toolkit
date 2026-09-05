# AI TOOLKIT - Hume Provider

The **[Hume provider](https://studio.khulnasoft.com/providers/ai-toolkit-providers/hume)** for the [AI TOOLKIT](https://studio.khulnasoft.com/docs)
contains support for the Hume API.

## Setup

The Hume provider is available in the `@ai-toolkit/hume` module. You can install it with

```bash
npm i @ai-toolkit/hume
```

## Provider Instance

You can import the default provider instance `hume` from `@ai-toolkit/hume`:

```ts
import { hume } from '@ai-toolkit/hume';
```

## Example

```ts
import { hume } from '@ai-toolkit/hume';
import { experimental_generateSpeech as generateSpeech } from 'ai';

const result = await generateSpeech({
  model: hume.speech('aurora'),
  text: 'Hello, world!',
});
```

## Documentation

Please check out the **[Hume provider documentation](https://studio.khulnasoft.com/providers/ai-toolkit-providers/hume)** for more information.
