# Vercel AI SDK - Hugging Face Provider

The **[Hugging Face Inference Providers](https://huggingface.co/docs/inference-providers/index)** for the [Vercel AI SDK](https://ai-sdk.dev/docs) contains language model support for thousands of models through multiple inference providers via the Hugging Face router API.

## Setup

The Hugging Face provider is available in the `@ai-tools/huggingface` module. You can install it with:

```bash
npm i @ai-tools/huggingface
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the AI SDK skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `huggingface` from `@ai-tools/huggingface`:

```ts
import { huggingface } from '@ai-tools/huggingface';
```

## Example

```ts
import { huggingface } from '@ai-tools/huggingface';
import { generateText } from 'ai';

const { text } = await generateText({
  model: huggingface('meta-llama/Llama-3.1-8B-Instruct'),
  prompt: 'Write a vegetarian lasagna recipe.',
});
```

## Documentation

Please check out the **[Hugging Face provider documentation](https://ai-sdk.dev/providers/ai-sdk-providers/huggingface)** for more information.
