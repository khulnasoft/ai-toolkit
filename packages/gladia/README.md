# AI SDK - Gladia Provider

The **[Gladia provider](https://ai-sdk.dev/providers/ai-sdk-providers/assemblyai)** for the [AI SDK](https://ai-sdk.dev/docs)
contains transcription model support for the Gladia transcription API.

## Setup

The Gladia provider is available in the `@ai-tools/gladia` module. You can install it with

```bash
npm i @ai-tools/gladia
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the AI SDK skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `gladia` from `@ai-tools/gladia`:

```ts
import { gladia } from '@ai-tools/gladia';
```

## Example

```ts
import { gladia } from '@ai-tools/gladia';
import { experimental_transcribe as transcribe } from 'ai';

const { text } = await transcribe({
  model: gladia.transcription(),
  audio: new URL(
    'https://github.com/khulnasoft/ai-toolkit/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
});
```

## Documentation

Please check out the **[Gladia provider documentation](https://ai-sdk.dev/providers/ai-sdk-providers/gladia)** for more information.
