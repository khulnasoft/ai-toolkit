# AI TOOLKIT - Vercel Provider

The **[Vercel provider](https://studio.khulnasoft.com/providers/ai-toolkit-providers/vercel)** for the [AI TOOLKIT](https://studio.khulnasoft.com/docs)
gives you access to the v0 API, designed for building modern web applications. The `v0-1.0-md` model supports text and image inputs, provides fast streaming responses, and is compatible with the OpenAI Chat Completions API format.

Key features include:

- Framework aware completions: Optimized for modern stacks like Next.js and Vercel
- Auto-fix: Identifies and corrects common coding issues during generation
- Quick edit: Streams inline edits as they're available
- Multimodal: Supports both text and image inputs

## Setup

The Vercel provider is available in the `@ai-toolkit/khulnasoft` module. You can install it with

```bash
npm i @ai-toolkit/khulnasoft
```

## Provider Instance

You can import the default provider instance `vercel` from `@ai-toolkit/khulnasoft`:

```ts
import { vercel } from '@ai-toolkit/khulnasoft';
```

## Example

```ts
import { vercel } from '@ai-toolkit/khulnasoft';
import { generateText } from 'ai';

const { text } = await generateText({
  model: vercel('v0-1.0-md'),
  prompt: 'Create a Next.js app',
});
```

## Documentation

Please check out the **[Vercel provider documentation](https://studio.khulnasoft.com/providers/ai-toolkit-providers/vercel)** for more information.
