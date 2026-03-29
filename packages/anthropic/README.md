# AI SDK - Anthropic Provider

The **[Anthropic provider](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic)** for the [AI SDK](https://ai-sdk.dev/docs) contains language model support for the [Anthropic Messages API](https://docs.anthropic.com/claude/reference/messages_post).

## Setup

The Anthropic provider is available in the `@ai-toolkit/anthropic` module. You can install it with

```bash
npm i @ai-toolkit/anthropic
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the AI SDK skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `anthropic` from `@ai-toolkit/anthropic`:

```ts
import { anthropic } from '@ai-toolkit/anthropic';
```

## Example

```ts
import { anthropic } from '@ai-toolkit/anthropic';
import { generateText } from 'ai';

const { text } = await generateText({
  model: anthropic('claude-3-haiku-20240307'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Anthropic provider documentation](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic)** for more information.
