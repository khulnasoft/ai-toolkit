# AI TOOLKIT - DeepInfra Provider

The **[DeepInfra provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/deepinfra)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs)
contains language model support for the DeepInfra API, giving you access to models like Llama 3, Mixtral, and other state-of-the-art LLMs.

## Setup

The DeepInfra provider is available in the `@ai-toolkit/deepinfra` module. You can install it with

```bash
npm i @ai-toolkit/deepinfra
```

## Provider Instance

You can import the default provider instance `deepinfra` from `@ai-toolkit/deepinfra`:

```ts
import { deepinfra } from '@ai-toolkit/deepinfra';
```

## Example

```ts
import { deepinfra } from '@ai-toolkit/deepinfra';
import { generateText } from 'ai';

const { text } = await generateText({
  model: deepinfra('meta-llama/Llama-3.3-70B-Instruct'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[DeepInfra provider documentation](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/deepinfra)** for more information.
