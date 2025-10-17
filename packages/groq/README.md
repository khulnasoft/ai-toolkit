# AI TOOLKIT - Groq Provider

The **[Groq provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/groq)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs)
contains language model support for the Groq chat and completion APIs and embedding model support for the Groq embeddings API.

## Setup

The Groq provider is available in the `@ai-toolkit/groq` module. You can install it with

```bash
npm i @ai-toolkit/groq
```

## Provider Instance

You can import the default provider instance `groq` from `@ai-toolkit/groq`:

```ts
import { groq } from '@ai-toolkit/groq';
```

## Example

```ts
import { groq } from '@ai-toolkit/groq';
import { generateText } from 'ai';

const { text } = await generateText({
  model: groq('gemma2-9b-it'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Groq provider documentation](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/groq)** for more information.
