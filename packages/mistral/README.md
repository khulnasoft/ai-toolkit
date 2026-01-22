# AI TOOLKIT - Mistral Provider

The **[Mistral provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/mistral)** for the [AI TOOLKIT](https://ai-toolkit.dev/docs) contains language model support for the Mistral chat API.

## Setup

The Mistral provider is available in the `@ai-toolkit/mistral` module. You can install it with

```bash
npm i @ai-toolkit/mistral
```

## Provider Instance

You can import the default provider instance `mistral` from `@ai-toolkit/mistral`:

```ts
import { mistral } from '@ai-toolkit/mistral';
```

## Example

```ts
import { mistral } from '@ai-toolkit/mistral';
import { generateText } from 'ai';

const { text } = await generateText({
  model: mistral('mistral-large-latest'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Mistral provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/mistral)** for more information.
