---
title: AI TOOLKIT DevTools
description: Debug AI TOOLKIT calls by inspecting captured runs and steps.
---

# AI TOOLKIT DevTools

## Why Use DevTools

DevTools captures all AI TOOLKIT calls (`generateText`, `streamText`, `ToolLoopAgent`) to a local JSON file. This lets you inspect LLM requests, responses, tool calls, and multi-step interactions without manually logging.

## Setup

Requires AI TOOLKIT 6. Install `@ai-toolkit/devtools` using your project's package manager.

Wrap your model with the middleware:

```ts
import { wrapLanguageModel, gateway } from 'ai';
import { devToolsMiddleware } from '@ai-toolkit/devtools';

const model = wrapLanguageModel({
  model: gateway('anthropic/claude-sonnet-4.5'),
  middleware: devToolsMiddleware(),
});
```

## Viewing Captured Data

All runs and steps are saved to:

```
.devtools/generations.json
```

Read this file directly to inspect captured data:

```bash
cat .devtools/generations.json | jq
```

Or launch the web UI:

```bash
npx @ai-toolkit/devtools
# Open http://localhost:4983
```

## Data Structure

- **Run**: A complete multi-step interaction grouped by initial prompt
- **Step**: A single LLM call within a run (includes input, output, tool calls, token usage)
