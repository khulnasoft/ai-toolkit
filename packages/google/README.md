# AI TOOLKIT - Google Generative AI Provider

The **[Google Generative AI provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/google-generative-ai)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) contains language model support for the [Google Generative AI](https://ai.google/discover/generativeai/) APIs.

## Setup

The Google Generative AI provider is available in the `@ai-toolkit/google` module. You can install it with

```bash
npm i @ai-toolkit/google
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
  model: google('gemini-1.5-pro-latest'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Google Generative AI provider documentation](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/google-generative-ai)** for more information.
