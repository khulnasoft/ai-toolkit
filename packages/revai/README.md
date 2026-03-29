# AI SDK - Rev.ai Provider

The **[Rev.ai provider](https://ai-sdk.dev/providers/ai-sdk-providers/revai)** for the [AI SDK](https://ai-sdk.dev/docs)
contains language model support for the Rev.ai transcription API.

## Setup

The Rev.ai provider is available in the `@ai-tools/revai` module. You can install it with

```bash
npm i @ai-tools/revai
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the AI SDK skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `revai` from `@ai-tools/revai`:

```ts
import { revai } from '@ai-tools/revai';
```

## Example

```ts
import { revai } from '@ai-tools/revai';
import { experimental_transcribe as transcribe } from 'ai';

const { text } = await transcribe({
  model: revai.transcription('machine'),
  audio: new URL(
    'https://github.com/khulnasoft/ai-toolkit/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
});
```

## Documentation

Please check out the **[Rev.ai provider documentation](https://ai-sdk.dev/providers/ai-sdk-providers/revai)** for more information.
