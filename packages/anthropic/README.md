# AI TOOLKIT - Anthropic Provider

The **[Anthropic provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/anthropic)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs) contains language model support for the [Anthropic Messages API](https://docs.anthropic.com/claude/reference/messages_post).

## Setup

The Anthropic provider is available in the `@ai-toolkit/anthropic` module. You can install it with

```
npm i @ai-toolkit/anthropic
```

## Provider Instance

You can import the default provider instance `anthropic` from `@ai-toolkit/anthropic`:

```ts
import { anthropic } from '@ai-toolkit/anthropic';
```

## Example

```ts
import { anthropic } from '@ai-toolkit/anthropic';
import { generateText } from 'ai-toolkit';

const { text } = await generateText({
  model: anthropic('claude-3-haiku-20240307'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

## Documentation

Please check out the **[Anthropic provider documentation](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/anthropic)** for more information.
