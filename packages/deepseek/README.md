# AI TOOLKIT - DeepSeek Provider

The **[DeepSeek provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/deepseek)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) contains language model support for the [DeepSeek](https://www.deepseek.com) platform.

## Setup

The DeepSeek provider is available in the `@ai-toolkit/deepseek` module. You can install it with

```bash
npm i @ai-toolkit/deepseek
```

## Provider Instance

You can import the default provider instance `deepseek` from `@ai-toolkit/deepseek`:

```ts
import { deepseek } from '@ai-toolkit/deepseek';
```

## Example

```ts
import { deepseek } from '@ai-toolkit/deepseek';
import { generateText } from 'ai-toolkit';

const { text } = await generateText({
  model: deepseek('deepseek-chat'),
  prompt: 'Write a JavaScript function that sorts a list:',
});
```

## Documentation

Please check out the **[DeepSeek provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/deepseek)** for more information.
