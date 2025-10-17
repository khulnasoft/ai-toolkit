# AI TOOLKIT - Together.ai Provider

The **[Together.ai provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/togetherai)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) contains language model support for the [Together.ai](https://together.ai) platform.

## Setup

The Together.ai provider is available in the `@ai-toolkit/togetherai` module. You can install it with

```bash
npm i @ai-toolkit/togetherai
```

## Provider Instance

You can import the default provider instance `togetherai` from `@ai-toolkit/togetherai`:

```ts
import { togetherai } from '@ai-toolkit/togetherai';
```

## Example

```ts
import { togetherai } from '@ai-toolkit/togetherai';
import { generateText } from 'ai';

const { text } = await generateText({
  model: togetherai('meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo'),
  prompt: 'Write a Python function that sorts a list:',
});
```

## Documentation

Please check out the **[Together.ai provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/togetherai)** for more information.
