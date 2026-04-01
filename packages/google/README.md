# AI SDK - Google Generative AI Provider

The **[Google Generative AI provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/google-generative-ai)** for the [AI SDK](https://ai-toolkit.dev/docs) contains language model support for the [Google Generative AI](https://ai.google/discover/generativeai/) APIs.

## Setup

The Google Generative AI provider is available in the `@ai-toolkit/google` module. You can install it with

```bash
npm i @ai-toolkit/google
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the AI SDK skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `google` from `@ai-toolkit/google`:

```ts
import { google } from '@ai-toolkit/google';
```

## Example

```ts
import { google } from '@ai-toolkit/google';
import { generateText } from 'ai';

const { text } = await generateText({
  model: google('gemini-2.5-pro'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Google Generative AI provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/google-generative-ai)** for more information.
