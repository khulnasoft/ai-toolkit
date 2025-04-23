# AI TOOLKIT - Azure OpenAI Provider

The **[Azure provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/azure)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) contains language model support for the Azure OpenAI API.

## Setup

The Azure provider is available in the `@ai-toolkit/azure` module. You can install it with

```bash
npm i @ai-toolkit/azure
```

## Provider Instance

You can import the default provider instance `azure` from `@ai-toolkit/azure`:

```ts
import { azure } from '@ai-toolkit/azure';
```

## Example

```ts
import { azure } from '@ai-toolkit/azure';
import { generateText } from 'ai';

const { text } = await generateText({
  model: azure('gpt-4o'), // your deployment name
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Azure provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/azure)** for more information.
