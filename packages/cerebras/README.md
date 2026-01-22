# AI TOOLKIT - Cerebras Provider

The **Cerebras provider** for the [AI TOOLKIT](https://ai-toolkit.dev/docs) contains language model support for [Cerebras](https://cerebras.ai), offering high-speed AI model inference powered by Cerebras Wafer-Scale Engines and CS-3 systems.

## Setup

The Cerebras provider is available in the `@ai-toolkit/cerebras` module. You can install it with

```bash
npm i @ai-toolkit/cerebras
```

## Provider Instance

You can import the default provider instance `cerebras` from `@ai-toolkit/cerebras`:

```ts
import { cerebras } from '@ai-toolkit/cerebras';
```

## Available Models

Cerebras offers a variety of high-performance language models:
https://inference-docs.cerebras.ai/models/overview

## Example

```ts
import { cerebras } from '@ai-toolkit/cerebras';
import { generateText } from 'ai';

const { text } = await generateText({
  model: cerebras('llama-3.3-70b'),
  prompt: 'Write a JavaScript function that sorts a list:',
});
```

## Documentation

For more information about Cerebras' high-speed inference capabilities and API documentation, please visit:

- [Cerebras Inference Documentation](https://inference-docs.cerebras.ai/introduction)
- [Cerebras Website](https://cerebras.ai)

Note: Due to high demand in the early launch phase, context windows are temporarily limited to 8192 tokens in the Free Tier.
