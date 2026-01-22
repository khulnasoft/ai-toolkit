# AI TOOLKIT - Baseten Provider

The **[Baseten provider](https://studio.khulnasoft.com/providers/ai-toolkit-providers/baseten)** for the [AI TOOLKIT](https://studio.khulnasoft.com/docs) contains language model and embedding model support for the [Baseten](https://baseten.co) platform.

## Setup

The Baseten provider is available in the `@ai-toolkit/baseten` module. You can install it with

```bash
npm i @ai-toolkit/baseten
```

## Provider Instance

You can import the default provider instance `baseten` from `@ai-toolkit/baseten`:

```ts
import { baseten } from '@ai-toolkit/baseten';
```

## Language Model Example (Model APIs)

```ts
import { baseten } from '@ai-toolkit/baseten';
import { generateText } from 'ai';

const { text } = await generateText({
  model: baseten('deepseek-ai/DeepSeek-V3-0324'),
  prompt: 'What is the meaning of life?',
});
```

## Documentation

Please check out the **[Baseten provider](https://studio.khulnasoft.com/providers/ai-toolkit-providers/baseten)** for more information.
