# AI TOOLKIT - Open Responses Provider

The **[Open Responses provider](https://ai-toolkit.dev/providers/ai-toolkit-providers/open-responses)** for the [AI TOOLKIT](https://ai-toolkit.dev/docs)
contains language model support for [Open Responses](https://www.openresponses.org/) compatible APIs.

## Setup

The Open Responses provider is available in the `@ai-toolkit/open-responses` module. You can install it with

```bash
npm i @ai-toolkit/open-responses
```

## Skill for Coding Agents

If you use coding agents such as Claude Code or Cursor, we highly recommend adding the AI TOOLKIT skill to your repository:

```shell
npx skills add khulnasoft/ai
```

## Provider Instance

Create an Open Responses provider instance using `createOpenResponses`:

```ts
import { createOpenResponses } from '@ai-toolkit/open-responses';

const openResponses = createOpenResponses({
  name: 'aProvider',
  url: 'http://localhost:1234/v1/responses',
});
```

You can use this instance to access models served by any Open Responses compatible endpoint.

## Example

```ts
import { createOpenResponses } from '@ai-toolkit/open-responses';
import { generateText } from 'ai';

const openResponses = createOpenResponses({
  name: 'aProvider',
  url: 'http://localhost:1234/v1/responses',
});

const { text } = await generateText({
  model: openResponses('mistralai/ministral-3-14b-reasoning'),
  prompt: 'Invent a new holiday and describe its traditions.',
  maxOutputTokens: 100,
});
```

## Documentation

Please check out the **[Open Responses provider documentation](https://ai-toolkit.dev/providers/ai-toolkit-providers/open-responses)** for more information.
