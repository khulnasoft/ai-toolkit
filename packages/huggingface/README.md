# Vercel AI TOOLKIT - Hugging Face Provider

The **[Hugging Face Inference Providers](https://huggingface.co/docs/inference-providers/index)** for the [Vercel AI TOOLKIT](https://studio.khulnasoft.com/docs) contains language model support for thousands of models through multiple inference providers via the Hugging Face router API.

## Setup

The Hugging Face provider is available in the `@ai-toolkit/huggingface` module. You can install it with:

```bash
npm i @ai-toolkit/huggingface
```

## Provider Instance

You can import the default provider instance `huggingface` from `@ai-toolkit/huggingface`:

```ts
import { huggingface } from '@ai-toolkit/huggingface';
```

## Example

```ts
import { huggingface } from '@ai-toolkit/huggingface';
import { generateText } from 'ai';

const { text } = await generateText({
  model: huggingface('meta-llama/Llama-3.1-8B-Instruct'),
  prompt: 'Write a vegetarian lasagna recipe.',
});
```

## Documentation

Please check out the **[Hugging Face provider documentation](https://studio.khulnasoft.com/providers/ai-toolkit-providers/huggingface)** for more information.
