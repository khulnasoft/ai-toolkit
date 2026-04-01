# AI TOOLKIT - LMNT Provider

The **[LMNT provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/lmnt)** for the [AI TOOLKIT](https://ai-toolkit.dev/docs)
contains language model support for the LMNT API.

## Setup

The LMNT provider is available in the `@ai-toolkit/lmnt` module. You can install it with

```bash
npm i @ai-toolkit/lmnt
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the AI TOOLKIT skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

You can import the default provider instance `lmnt` from `@ai-toolkit/lmnt`:

```ts
import { lmnt } from '@ai-toolkit/lmnt';
```

## Example

```ts
import { lmnt } from '@ai-toolkit/lmnt';
import { experimental_generateSpeech as generateSpeech } from 'ai';

const result = await generateSpeech({
  model: lmnt.speech('aurora'),
  text: 'Hello, world!',
});
```

## Documentation

Please check out the **[LMNT provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/lmnt)** for more information.
