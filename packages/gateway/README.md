# AI SDK - Gateway Provider

The Gateway provider for the [AI SDK](https://ai-sdk.dev/docs) allows the use of a wide variety of AI models and providers.

## Setup

The Gateway provider is available in the `@ai-toolkit/gateway` module. You can install it with

```bash
npm i @ai-toolkit/gateway
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the AI SDK skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `gateway` from `@ai-toolkit/gateway`:

```ts
import { gateway } from '@ai-toolkit/gateway';
```

## Example

```ts
import { gateway } from '@ai-toolkit/gateway';
import { generateText } from 'ai';

const { text } = await generateText({
  model: gateway('xai/grok-3-beta'),
  prompt:
    'Tell me about the history of the San Francisco Mission-style burrito.',
});
```

## Documentation

Please check out the [AI SDK documentation](https://ai-sdk.dev/docs) for more information.
