# AI TOOLKIT - Gladia Provider

The **[Gladia provider](https://studio.khulnasoft.com/providers/ai-toolkit-providers/assemblyai)** for the [AI TOOLKIT](https://studio.khulnasoft.com/docs)
contains transcription model support for the Gladia transcription API.

## Setup

The Gladia provider is available in the `@ai-toolkit/gladia` module. You can install it with

```bash
npm i @ai-toolkit/gladia
```

## Provider Instance

You can import the default provider instance `gladia` from `@ai-toolkit/gladia`:

```ts
import { gladia } from '@ai-toolkit/gladia';
```

## Example

```ts
import { gladia } from '@ai-toolkit/gladia';
import { experimental_transcribe as transcribe } from 'ai';

const { text } = await transcribe({
  model: gladia.transcription(),
  audio: new URL(
    'https://github.com/khulnasoft/ai-toolkit/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
});
```

## Documentation

Please check out the **[Gladia provider documentation](https://studio.khulnasoft.com/providers/ai-toolkit-providers/gladia)** for more information.
