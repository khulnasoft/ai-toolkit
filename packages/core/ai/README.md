# ai-toolkit (core / ai)

Lightweight, type-safe core utilities for building AI-powered applications. This package provides the core generation and streaming APIs used by higher-level UI and framework adapters.

- Small, framework-agnostic surface focused on server-side usage and library authors.
- TypeScript-first with exported types for request/response shapes.
- Works with provider adapters (OpenAI, Anthropic, Google, etc.) available under `@ai-toolkit/*` packages.

## Table of contents
- Install
- Quick start
- API (overview)
- Streaming example
- Environment & Providers
- Development
- Contributing
- License

## Install

Using npm:

```bash
npm install ai-toolkit
# plus a provider adapter, e.g.:
npm install @ai-toolkit/openai
```

Using pnpm:

```bash
pnpm add ai-toolkit @ai-toolkit/openai
```

## Quick start

Minimal text generation example (TypeScript):

```ts
import { generateText } from 'ai-toolkit';
import { openai } from '@ai-toolkit/openai';

async function main() {
  const model = openai('gpt-4o'); // provider adapter returns a ModelConfig
  const { text } = await generateText({
    model,
    system: 'You are a helpful assistant.',
    prompt: 'Explain quantum computing simply',
    maxTokens: 300,
    temperature: 0.2,
  });
  console.log(text);
}

main().catch(console.error);
```

## API (overview)

Main exports (high level):
- `generateText(opts): Promise<{ text: string, usage?: Usage }>`
  - opts: `{ model, system?, prompt?, messages?, maxTokens?, temperature? }`
- `streamText(opts)`: Returns an async iterator / ReadableStream with tokens/chunks
- Types: `ModelConfig`, `Message`, `Usage`, `StreamChunk`

For full API docs, see the project documentation: https://sdk.khulnasoft.com/docs

## Streaming example

Node / Next.js streaming example (server-side):

```ts
import { streamText } from 'ai-toolkit';
import { openai } from '@ai-toolkit/openai';

// Example - returns a Node Readable stream or async iterable
export async function createStream(prompt: string) {
  const model = openai('gpt-4o');
  const { textStream } = await streamText({
    model,
    system: 'You are concise and factual.',
    prompt,
    temperature: 0.6,
  });

  // textStream is an async iterable of strings (chunks)
  for await (const chunk of textStream) {
    process.stdout.write(chunk);
  }
}
```

If you use Next.js route handlers, convert this to a response stream per framework docs.

## Environment & Providers

Set provider credentials in env vars. Example for OpenAI:

```env
OPENAI_API_KEY=sk-...
```

Install a provider adapter to configure which provider to use, e.g. `@ai-toolkit/openai`, `@ai-toolkit/anthropic`, etc.

Adapters should return a small `ModelConfig` object consumed by the core functions.

## Development

Run tests and build inside the monorepo:

```bash
# from repo root
pnpm install
pnpm -w test     # run tests across the monorepo
pnpm -w build    # build packages
```

Package-level scripts (in packages/core/ai/package.json) should include:
- build
- test
- lint
- typecheck

When publishing from CI, ensure the package version and changelog are updated.

## Contributing

This repository follows the contribution guidelines at the repo root. Please open issues or PRs against the monorepo. For package-specific changes:
- Add unit tests for new behaviors
- Keep public API backward-compatible; add new exports in a minor release
- Update README and examples when adding or changing features

## License

MIT © Khulnasoft (see top-level LICENSE)
