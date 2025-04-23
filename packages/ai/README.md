# 🚀 AI TOOLKIT

[![GitHub Discussions](https://img.shields.io/github/discussions/khulnasoft/ai-toolkit?style=for-the-badge)](https://github.com/khulnasoft/ai-toolkit/discussions)
[![Documentation](https://img.shields.io/badge/Docs-Available-blue?style=for-the-badge)](https://sdk.khulnasoft.com/docs)
[![License](https://img.shields.io/github/license/khulnasoft/ai-toolkit?style=for-the-badge)](https://github.com/khulnasoft/ai-toolkit/blob/main/LICENSE)

The [AI TOOLKIT](https://sdk.khulnasoft.com/docs) is a powerful TypeScript toolkit for building AI-powered applications with popular frameworks like **Next.js, React, Svelte, Vue** and runtimes like **Node.js**.

🔹 **Seamless AI Integrations** with OpenAI, Anthropic, Google Generative AI, and more  
🔹 **Framework Agnostic** - Works with multiple frontend and backend environments  
🔹 **Developer Friendly** - Easy installation, clear API, and comprehensive documentation

📖 Learn more in our [API Reference](https://sdk.khulnasoft.com/docs/reference) and [Documentation](https://sdk.khulnasoft.com/docs).

---

## 📥 Installation

Ensure you have **Node.js 18+** and **pnpm** installed on your machine.

```sh
npm install ai-toolkit
```

---

## 🛠 Usage

### 🔹 AI TOOLKIT Core

The [AI TOOLKIT Core](https://sdk.khulnasoft.com/docs/ai-toolkit-core/overview) provides a unified API to interact with model providers like:

- [OpenAI](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/openai)
- [Anthropic](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/anthropic)
- [Google Generative AI](https://sdk.khulnasoft.com/providers/ai-toolkit-providers/google-generative-ai)

Install your preferred model provider:

```sh
npm install @ai-toolkit/openai
```

#### ⚡ Example: Node.js Runtime

```ts
import { generateText } from 'ai-toolkit';
import { openai } from '@ai-toolkit/openai'; // Ensure OPENAI_API_KEY is set

const { text } = await generateText({
  model: openai('gpt-4o'),
  system: 'You are a friendly assistant!',
  prompt: 'Why is the sky blue?',
});

console.log(text);
```

### 🔹 AI TOOLKIT UI

The [AI TOOLKIT UI](https://sdk.khulnasoft.com/docs/ai-toolkit-ui/overview) provides framework-agnostic hooks to build AI chatbots and generative UI components.

#### ⚡ Example: Next.js App Router

```tsx
'use client';
import { useChat } from 'ai-toolkit/react';

export default function Page() {
  const { messages, input, handleSubmit, handleInputChange, status } =
    useChat();

  return (
    <div>
      {messages.map(message => (
        <div key={message.id}>
          <strong>{message.role}</strong>: {message.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Send a message..."
          onChange={handleInputChange}
          disabled={status !== 'ready'}
        />
      </form>
    </div>
  );
}
```

#### ⚡ Example: Next.js API Route

```ts
import { streamText } from 'ai-toolkit';
import { openai } from '@ai-toolkit/openai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();
}
```

---

## 📦 Templates

We provide **ready-to-use templates** with AI TOOLKIT integrations for different frameworks, providers, and use cases.  
Check them out [here](https://khulnasoft.com/templates?type=ai).

---

## 🌎 Community

Join the **AI TOOLKIT** community to discuss, share ideas, and contribute!  
💬 [GitHub Discussions](https://github.com/khulnasoft/ai-toolkit/discussions)  
🐦 [Follow us on Twitter](https://twitter.com/khulnasoft)  
🚀 [Join our Discord](https://discord.gg/khulnasoft)

---

## 🤝 Contributing

We welcome contributions! Before you start, please read our [Contribution Guidelines](https://github.com/khulnasoft/ai-toolkit/blob/main/CONTRIBUTING.md).

---

## 👨‍💻 Authors & Credits

Developed by **[Khulnasoft](https://khulnasoft.com)** and **[Next.js](https://nextjs.org)** team members, with valuable contributions from the **Open Source Community**.  
[View Contributors](https://github.com/khulnasoft/ai-toolkit/graphs/contributors) 💙

---

## 📜 License

This project is licensed under the **MIT License**. See the full [LICENSE](https://github.com/khulnasoft/ai-toolkit/blob/main/LICENSE) for details.
