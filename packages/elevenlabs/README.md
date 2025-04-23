# AI TOOLKIT - ElevenLabs Provider

The **[ElevenLabs provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/elevenlabs)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs)
contains language model support for the ElevenLabs chat and completion APIs and embedding model support for the ElevenLabs embeddings API.

## Setup

The ElevenLabs provider is available in the `@ai-toolkit/elevenlabs` module. You can install it with

```bash
npm i @ai-toolkit/elevenlabs
```

## Provider Instance

You can import the default provider instance `elevenlabs` from `@ai-toolkit/elevenlabs`:

```ts
import { elevenlabs } from '@ai-toolkit/elevenlabs';
```

## Example

```ts
import { elevenlabs } from '@ai-toolkit/elevenlabs';
import { experimental_transcribe as transcribe } from 'ai';

const { text } = await transcribe({
  model: elevenlabs.transcription('scribe_v1'),
  audio: new URL(
    'https://github.com/khulnasoft/ai/raw/refs/heads/main/examples/ai-core/data/galileo.mp3',
  ),
});
```

## Documentation

Please check out the **[ElevenLabs provider documentation](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/elevenlabs)** for more information.
