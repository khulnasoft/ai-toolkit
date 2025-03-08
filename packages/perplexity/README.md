# AI TOOLKIT - Perplexity Provider

The **[Perplexity provider](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/perplexity)** for the [AI TOOLKIT](https://sdk.khulnasoft.com/docs)
contains language model support for Perplexity's Sonar API - a powerful answer engine with real-time web search capabilities.

## Features

- Real-time web search grounding for accurate, up-to-date responses
- Support for advanced queries and follow-up questions
- Multiple tiers available:
  - **Sonar Pro**: Enhanced capabilities for complex tasks with 2x more citations
  - **Sonar**: Lightweight offering optimized for speed and cost
- Industry-leading answer quality
- Data privacy - no training on customer data
- Self-serve API access with scalable pricing

## Setup

The Perplexity provider is available in the `@ai-toolkit/perplexity` module. You can install it with:

```bash
npm i @ai-toolkit/perplexity
```

## Provider Instance

You can import the default provider instance `perplexity` from `@ai-toolkit/perplexity`:

```ts
import { perplexity } from '@ai-toolkit/perplexity';
```

## Example

```ts
import { perplexity } from '@ai-toolkit/perplexity';
import { generateText } from 'ai-toolkit';

const { text } = await generateText({
  model: perplexity('sonar-pro'),
  prompt: 'What are the latest developments in quantum computing?',
});
```

## Documentation

Please check out the **[Perplexity provider documentation](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/perplexity)** for more information.
