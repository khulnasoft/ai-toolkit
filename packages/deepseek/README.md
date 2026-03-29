# AI SDK - DeepSeek Provider

The **[DeepSeek provider](https://ai-sdk.dev/providers/ai-sdk-providers/deepseek)** for the [AI SDK](https://ai-sdk.dev/docs) contains language model support for the [DeepSeek](https://www.deepseek.com) platform.

## Setup

The DeepSeek provider is available in the `@ai-tools/deepseek` module. You can install it with

```bash
npm i @ai-tools/deepseek
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the AI SDK skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `deepseek` from `@ai-tools/deepseek`:

```ts
import { deepseek } from '@ai-tools/deepseek';
```

## Example

```ts
import { deepseek } from '@ai-tools/deepseek';
import { generateText } from 'ai';

const { text } = await generateText({
  model: deepseek('deepseek-chat'),
  prompt: 'Write a JavaScript function that sorts a list:',
});
```

## Documentation

Please check out the **[DeepSeek provider](https://ai-sdk.dev/providers/ai-sdk-providers/deepseek)** for more information.
