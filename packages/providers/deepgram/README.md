# AI TOOLKIT - Deepgram Provider

The **[Deepgram provider](https://studio.khulnasoft.com/providers/ai-toolkit-providers/deepgram)** for the [AI TOOLKIT](https://studio.khulnasoft.com/docs)
contains transcription model support for the Deepgram transcription API and speech model support for the Deepgram text-to-speech API.

## Setup

The Deepgram provider is available in the `@ai-toolkit/deepgram` module. You can install it with

```bash
npm i @ai-toolkit/deepgram
```

## Provider Instance

You can import the default provider instance `deepgram` from `@ai-toolkit/deepgram`:

```ts
import { deepgram } from '@ai-toolkit/deepgram';
```

## Examples

### Transcription

```ts
import { deepgram } from '@ai-toolkit/deepgram';
import { experimental_transcribe as transcribe } from 'ai';

const { text } = await transcribe({
  model: deepgram.transcription('nova-3'),
  audio: new URL(
    'https://github.com/khulnasoft/ai-toolkit/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
});
```

### Transcription with Language Detection

```ts
import { deepgram } from '@ai-toolkit/deepgram';
import { experimental_transcribe as transcribe } from 'ai';

const { text, language } = await transcribe({
  model: deepgram.transcription('nova-3'),
  audio: new URL(
    'https://github.com/khulnasoft/ai-toolkit/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
  providerOptions: {
    deepgram: {
      detectLanguage: true,
    },
  },
});
```

### Text-to-Speech

```ts
import { deepgram } from '@ai-toolkit/deepgram';
import { experimental_generateSpeech as generateSpeech } from 'ai';

const { audio } = await generateSpeech({
  model: deepgram.speech('aura-2-helena-en'),
  text: 'Hello, welcome to Deepgram!',
});
```

## Documentation

Please check out the **[Deepgram provider documentation](https://studio.khulnasoft.com/providers/ai-toolkit-providers/deepgram)** for more information.
