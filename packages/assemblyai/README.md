# AI TOOLKIT - AssemblyAI Provider

The **[AssemblyAI provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/assemblyai)** for the [AI TOOLKIT](https://ai-toolkit.dev/docs)
contains transcription model support for the AssemblyAI transcription API.

## Setup

The AssemblyAI provider is available in the `@ai-toolkit/assemblyai` module. You can install it with

```bash
npm i @ai-toolkit/assemblyai
```

## Provider Instance

You can import the default provider instance `assemblyai` from `@ai-toolkit/assemblyai`:

```ts
import { assemblyai } from '@ai-toolkit/assemblyai';
```

## Example

```ts
import { assemblyai } from '@ai-toolkit/assemblyai';
import { experimental_transcribe as transcribe } from 'ai';

const { text } = await transcribe({
  model: assemblyai.transcription('best'),
  audio: new URL(
    'https://github.com/khulnasoft/ai-toolkit/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
});
```

## Documentation

Please check out the **[AssemblyAI provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/assemblyai)** for more information.
