# AI TOOLKIT - OpenAI Provider

The **[OpenAI provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/openai)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs)
contains language model support for the OpenAI chat and completion APIs and embedding model support for the OpenAI embeddings API.

## Setup

The OpenAI provider is available in the `@ai-toolkit/openai` module. You can install it with

```bash
npm i @ai-toolkit/openai
```

## Provider Instance

You can import the default provider instance `openai` from `@ai-toolkit/openai`:

```ts
import { openai } from '@ai-toolkit/openai';
```

## Example

```ts
import { openai } from '@ai-toolkit/openai';
import { generateText } from 'ai-toolkit';

const { text } = await generateText({
  model: openai('gpt-4-turbo'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[OpenAI provider documentation](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/openai)** for more information.
