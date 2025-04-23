# AI TOOLKIT - Cohere Provider

The **[Cohere provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/cohere)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) contains language model support for the Cohere API.

## Setup

The Cohere provider is available in the `@ai-toolkit/cohere` module. You can install it with

```bash
npm i @ai-toolkit/cohere
```

## Provider Instance

You can import the default provider instance `cohere` from `@ai-toolkit/cohere`:

```ts
import { cohere } from '@ai-toolkit/cohere';
```

## Example

```ts
import { cohere } from '@ai-toolkit/cohere';
import { generateText } from 'ai';

const { text } = await generateText({
  model: cohere('command-r-plus'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Cohere provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/cohere)** for more information.
