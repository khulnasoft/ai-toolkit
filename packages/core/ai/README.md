<div align="center">

# 🚀 AI TOOLKIT

### Production-ready TypeScript toolkit for AI applications

[![npm version](https://img.shields.io/npm/v/ai-toolkit?style=flat-square&logo=npm&logoColor=white&labelColor=cb0000&color=cb0000)](https://www.npmjs.com/package/ai-toolkit)
[![npm downloads](https://img.shields.io/npm/dm/ai-toolkit?style=flat-square&logo=npm&logoColor=white&labelColor=cb0000&color=cb0000)](https://www.npmjs.com/package/ai-toolkit)
[![GitHub stars](https://img.shields.io/github/stars/khulnasoft/ai-toolkit?style=flat-square&logo=github&logoColor=white&labelColor=24292e&color=24292e)](https://github.com/khulnasoft/ai-toolkit)
[![GitHub forks](https://img.shields.io/github/forks/khulnasoft/ai-toolkit?style=flat-square&logo=github&logoColor=white&labelColor=24292e&color=24292e)](https://github.com/khulnasoft/ai-toolkit)
[![GitHub issues](https://img.shields.io/github/issues/khulnasoft/ai-toolkit?style=flat-square&logo=github&logoColor=white&labelColor=24292e&color=24292e)](https://github.com/khulnasoft/ai-toolkit/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/khulnasoft/ai-toolkit?style=flat-square&logo=github&logoColor=white&labelColor=24292e&color=24292e)](https://github.com/khulnasoft/ai-toolkit/pulls)
[![License](https://img.shields.io/npm/l/ai-toolkit?style=flat-square&logo=open-source-initiative&logoColor=white&labelColor=3da639&color=3da639)](https://github.com/khulnasoft/ai-toolkit/blob/main/LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue?style=flat-square&logo=typescript&logoColor=white&labelColor=3178c6&color=3178c6)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=flat-square&logo=node.js&logoColor=white&labelColor=339933&color=339933)](https://nodejs.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square&logo=git&logoColor=white&labelColor=2ea043&color=2ea043)](http://makeapullrequest.com)
[![Discord](https://img.shields.io/discord/1081022898786365453?style=flat-square&logo=discord&logoColor=white&labelColor=5865f2&color=5865f2)](https://discord.gg/khulnasoft)

[![GitHub Discussions](https://img.shields.io/github/discussions/khulnasoft/ai-toolkit?style=for-the-badge&logo=github&logoColor=white&labelColor=24292e&color=24292e)](https://github.com/khulnasoft/ai-toolkit/discussions)
[![Documentation](https://img.shields.io/badge/📖_Docs-Latest-blue?style=for-the-badge&logo=readthedocs&logoColor=white&labelColor=2196f3&color=2196f3)](https://sdk.khulnasoft.com/docs)

</div>

---

## ✨ Why AI TOOLKIT?

AI TOOLKIT provides a unified TypeScript API for integrating AI models into modern applications without coupling your application architecture to a single provider or UI framework.

### Core principles

* **Type-safe** — Designed for TypeScript-first development.
* **Provider-agnostic** — Use multiple AI providers behind a consistent API.
* **Streaming-first** — Build responsive AI experiences with streaming generation.
* **Framework-friendly** — Integrate with React, Next.js, Svelte, Vue, Solid.js, and Node.js.
* **Extensible** — Add providers, tools, middleware, and application-specific abstractions.
* **Production-oriented** — Structured error handling, observability hooks, and predictable APIs.

---

## 🌟 Features

| Capability                     | Description                                                                 |
| ------------------------------ | --------------------------------------------------------------------------- |
| 🤖 **Multiple AI Providers**   | Connect OpenAI, Anthropic, Google, Azure, Groq, Cohere, and other providers |
| 🔗 **Unified API**             | Use a consistent interface across supported model providers                 |
| 🌊 **Streaming**               | Stream generated responses for interactive applications                     |
| 🛠️ **Tool Calling**           | Build AI applications that can invoke application-defined tools             |
| 🧩 **Framework Integrations**  | React, Next.js, Svelte, Vue, Solid.js, and Node.js                          |
| 🎨 **Generative UI**           | Connect streamed AI output to interactive application interfaces            |
| 🔒 **Type Safety**             | TypeScript-first APIs and typed integrations                                |
| 📊 **Observability**           | Integrate logging, metrics, tracing, and application monitoring             |
| 🧱 **Extensible Architecture** | Build custom providers and application-level abstractions                   |

> Provider availability and individual capabilities depend on the corresponding provider integration.

---

# 📦 Installation

## Requirements

* Node.js **18+**
* npm, pnpm, yarn, or Bun
* TypeScript **5+** recommended

## Install the core package

```bash
npm install ai-toolkit
```

Or:

```bash
pnpm add ai-toolkit
```

```bash
yarn add ai-toolkit
```

```bash
bun add ai-toolkit
```

### Install a provider

For example:

```bash
npm install @ai-toolkit/openai
```

Other provider integrations:

```bash
npm install @ai-toolkit/anthropic
npm install @ai-toolkit/google
npm install @ai-toolkit/groq
```

---

# ⚡ Quick Start

## 1. Configure your API key

Create `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key
```

For another provider, configure the environment variable required by that provider integration.

---

## 2. Generate text

```typescript
import { generateText } from 'ai-toolkit';
import { openai } from '@ai-toolkit/openai';

export async function generateResponse(prompt: string) {
  const { text } = await generateText({
    model: openai('gpt-4o'),
    system: 'You are a helpful AI assistant.',
    prompt,
    maxTokens: 500,
    temperature: 0.7,
  });

  return text;
}

const response = await generateResponse(
  'Explain quantum computing simply.'
);

console.log(response);
```

---

# 🌊 Streaming

Streaming allows applications to display generated output as it becomes available instead of waiting for the complete response.

```typescript
import { streamText } from 'ai-toolkit';
import { anthropic } from '@ai-toolkit/anthropic';

export async function* streamResponse(prompt: string) {
  const result = await streamText({
    model: anthropic('claude-3-5-sonnet-20241022'),
    system: 'You are a helpful AI assistant.',
    prompt,
  });

  for await (const chunk of result.textStream) {
    yield chunk;
  }
}

for await (const chunk of streamResponse('Tell me about AI')) {
  process.stdout.write(chunk);
}
```

---

# 🎨 AI TOOLKIT UI

AI TOOLKIT UI provides framework integrations for building conversational interfaces, streamed responses, and generative AI experiences.

## Supported frameworks

| Framework       | API                              | Status |
| --------------- | -------------------------------- | ------ |
| React / Next.js | `useChat`, `useCompletion`       | ✅      |
| Svelte          | `createChat`, `createCompletion` | ✅      |
| Vue             | `useChat`, `useCompletion`       | ✅      |
| Solid.js        | `createChat`, `createCompletion` | ✅      |

See the [AI TOOLKIT UI documentation](https://sdk.khulnasoft.com/docs/ai-toolkit-ui/overview) for framework-specific APIs.

---

# ⚛️ React / Next.js

Example client component:

```tsx
'use client';

import { useChat } from 'ai-toolkit/react';

export default function ChatInterface() {
  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    status,
    error,
  } = useChat();

  return (
    <div className="mx-auto max-w-2xl p-4">
      <div className="mb-4 min-h-[400px] rounded-lg border p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            Start a conversation 🤖
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="mb-4">
              <div className="mb-1 text-sm font-semibold">
                {message.role === 'user' ? 'You' : 'AI'}
              </div>

              <div className="rounded-lg border p-3">
                {message.content}
              </div>
            </div>
          ))
        )}

        {status === 'loading' && (
          <div className="text-sm text-gray-500">
            AI is thinking...
          </div>
        )}

        {error && (
          <div className="rounded-lg border p-3 text-red-600">
            Error: {error.message}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          disabled={status !== 'ready'}
          className="flex-1 rounded-lg border px-4 py-2"
        />

        <button
          type="submit"
          disabled={status !== 'ready' || !input.trim()}
          className="rounded-lg border px-6 py-2 disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
```

---

# ▲ Next.js API Route

A minimal streaming endpoint:

```ts
import { streamText } from 'ai-toolkit';
import { openai } from '@ai-toolkit/openai';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: 'Invalid messages format' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const result = await streamText({
      model: openai('gpt-4o'),
      system: `
You are a helpful AI assistant.

Guidelines:
- Be accurate and concise.
- Be clear and professional.
- If you do not know something, say so.
- Focus on the user's request.
      `.trim(),
      messages,
      temperature: 0.7,
      maxTokens: 1000,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);

    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
```

> **Security:** Never expose provider API keys to browser/client-side code. Keep credentials on the server.

---

# 🟠 Svelte

```svelte
<script lang="ts">
  import { createChat } from 'ai-toolkit/svelte';

  const {
    messages,
    input,
    handleSubmit,
    handleInputChange,
    status,
    error,
  } = createChat();
</script>

<div class="chat-container">
  <div class="messages">
    {#each $messages as message}
      <div class:user={message.role === 'user'} class="message">
        <strong>
          {message.role === 'user' ? 'You' : 'AI'}
        </strong>

        <p>{message.content}</p>
      </div>
    {/each}

    {#if $status === 'loading'}
      <div class="typing-indicator">
        AI is thinking...
      </div>
    {/if}

    {#if $error}
      <div class="error">
        Error: {$error.message}
      </div>
    {/if}
  </div>

  <form on:submit|preventDefault={handleSubmit}>
    <input
      bind:value={$input}
      on:input={handleInputChange}
      placeholder="Type your message..."
      disabled={$status !== 'ready'}
    />

    <button
      type="submit"
      disabled={$status !== 'ready' || !$input.trim()}
    >
      Send
    </button>
  </form>
</div>
```

---

# 🧩 Architecture

AI TOOLKIT is designed around a layered architecture:

```text
┌───────────────────────────────────────────────┐
│                 Application                   │
│     Next.js · React · Svelte · Vue · Node    │
├───────────────────────────────────────────────┤
│                  UI Layer                     │
│       Chat · Completion · Generative UI       │
├───────────────────────────────────────────────┤
│                AI TOOLKIT                     │
│ Generate · Stream · Tools · Middleware        │
├───────────────────────────────────────────────┤
│              Provider Layer                   │
│ OpenAI · Anthropic · Google · Groq · Azure   │
├───────────────────────────────────────────────┤
│             Model Infrastructure              │
│        HTTP · Streaming · Provider APIs       │
└───────────────────────────────────────────────┘
```

This separation keeps application code independent from individual model providers wherever practical.

---

# 🛠️ Use Cases

AI TOOLKIT can be used to build:

* 💬 AI chat applications
* 🤖 AI assistants
* ✍️ Writing and content-generation tools
* 📚 RAG applications
* 🔎 AI-powered search
* 🧠 Agentic workflows
* 🛠️ Tool-using AI agents
* 📊 AI dashboards
* 🧑‍💻 Developer assistants
* ⚡ Streaming AI interfaces
* 🎨 Generative UI applications
* 🔗 Multi-provider AI applications

---

# 📚 Documentation

| Resource                                                                      | Description                        |
| ----------------------------------------------------------------------------- | ---------------------------------- |
| 📖 [Documentation](https://sdk.khulnasoft.com/docs)                           | Guides and concepts                |
| 🔧 [API Reference](https://sdk.khulnasoft.com/docs/reference)                 | API documentation                  |
| 🎨 [Templates](https://khulnasoft.com/templates?type=ai)                      | Ready-to-use examples              |
| 💬 [GitHub Discussions](https://github.com/khulnasoft/ai-toolkit/discussions) | Questions and community discussion |
| 🐛 [GitHub Issues](https://github.com/khulnasoft/ai-toolkit/issues)           | Bug reports and feature requests   |

---

# 🚀 Templates

Start with a ready-made application:

| Template     | Framework | Provider  | Use Case           |
| ------------ | --------- | --------- | ------------------ |
| AI Chatbot   | Next.js   | OpenAI    | Chat application   |
| AI Assistant | React     | Anthropic | AI assistant       |
| AI Writer    | Svelte    | Google    | Content generation |
| AI Dashboard | Vue       | Multiple  | Analytics          |
| AI API       | Node.js   | OpenAI    | Backend AI service |

**Browse all templates →**
https://khulnasoft.com/templates?type=ai

---

# 🤝 Contributing

Contributions are welcome.

## Development workflow

```bash
# Clone
git clone https://github.com/khulnasoft/ai-toolkit.git

# Enter the repository
cd ai-toolkit

# Install dependencies
npm install

# Run tests
npm test

# Build
npm run build
```

### Pull requests

1. Fork the repository.
2. Create a feature branch.
3. Implement your changes.
4. Add or update tests.
5. Run the test suite.
6. Commit your changes.
7. Push your branch.
8. Open a pull request.

Please read the [Contribution Guidelines](https://github.com/khulnasoft/ai-toolkit/blob/main/CONTRIBUTING.md) before submitting a PR.

---

# 🌍 Community

Have a question, idea, bug report, or integration to share?

* 💬 [GitHub Discussions](https://github.com/khulnasoft/ai-toolkit/discussions)
* 💬 [Discord](https://discord.gg/khulnasoft)
* 🐦 [Twitter / X](https://twitter.com/khulnasoft)
* 🐛 [GitHub Issues](https://github.com/khulnasoft/ai-toolkit/issues)

---

# 👥 Contributors

AI TOOLKIT is built by **Khulnasoft** together with the open-source community.

<a href="https://github.com/khulnasoft/ai-toolkit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=khulnasoft/ai-toolkit" alt="Contributors" />
</a>

See all contributors:

https://github.com/khulnasoft/ai-toolkit/graphs/contributors

---

# 📄 License

AI TOOLKIT is released under the **MIT License**.

See [LICENSE](https://github.com/khulnasoft/ai-toolkit/blob/main/LICENSE) for details.

---

<div align="center">

## ⭐ AI TOOLKIT

**Build AI applications in TypeScript.
Use the providers you want.
Keep your application architecture yours.**

Made with ❤️ by **Khulnasoft** and the open-source community.

[⬆ Back to top](#-ai-toolkit)

</div>
