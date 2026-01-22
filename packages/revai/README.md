# AI TOOLKIT - Rev.ai Provider

The **[Rev.ai provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/revai)** for the [AI TOOLKIT](https://ai-toolkit.dev/docs)
contains language model support for the Rev.ai transcription API.

## Setup

The Rev.ai provider is available in the `@ai-toolkit/revai` module. You can install it with

```bash
npm i @ai-toolkit/revai
```

## Provider Instance

You can import the default provider instance `revai` from `@ai-toolkit/revai`:

```ts
import { revai } from '@ai-toolkit/revai';
```

## Example

```ts
import { revai } from '@ai-toolkit/revai';
import { experimental_transcribe as transcribe } from 'ai';

const { text } = await transcribe({
  model: revai.transcription('machine'),
  audio: new URL(
    'https://github.com/khulnasoft/ai-toolkit/raw/refs/heads/main/examples/ai-functions/data/galileo.mp3',
  ),
});
```

## Documentation

Please check out the **[Rev.ai provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/revai)** for more information.
