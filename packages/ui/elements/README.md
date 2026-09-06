# AI TOOLKIT Elements

React components for AI-native applications. Pairs with the hooks in
`@ai-toolkit/react` (`useChat`, `useCompletion`) and the types in `ai`.

**Stability**: beta  
**Owner**: @khulnasoft/ai-react-team

## Prerequisites

- React 18+ (peer dependency)
- Tailwind CSS in your app (components ship unstyled `data-slot` hooks with
  Tailwind utility classes; bring your own stylesheet to restyle)

## Install

As an npm package:

```bash
pnpm add @ai-toolkit/elements ai @ai-toolkit/react
```

Or per-component via the shadcn CLI (see `registry.json`):

```bash
pnpm dlx shadcn@latest add https://unpkg.com/@ai-toolkit/elements@latest/registry.json
```

## Usage

```tsx
import { useChat } from '@ai-toolkit/react';
import { Conversation, Message, PromptInput } from '@ai-toolkit/elements';

export function Chat() {
  const { messages, sendMessage, status } = useChat();

  return (
    <>
      <Conversation>
        {messages.map(message => (
          <Message key={message.id} message={message} />
        ))}
      </Conversation>
      <PromptInput
        onSubmit={text => sendMessage({ text })}
        disabled={status === 'submitted' || status === 'streaming'}
      />
    </>
  );
}
```

## Components

### Conversation

Scrollable `role="log"` container. Scrolls to the bottom when children change
unless `autoScroll={false}`.

### Message

Renders a `UIMessage` with role-based alignment (user right, assistant left).
Text, reasoning, tool-invocation, source, and file parts have default
renderings; override any part with `renderPart`, add an `avatar`.

### PromptInput

Chat input form. Enter submits, Shift+Enter inserts a newline. Works
controlled (`value`/`onChange`) or uncontrolled (`defaultValue`). Empty
submissions are ignored and the input clears after submit in uncontrolled mode.

## Styling

Every element exposes `data-slot` attributes (`conversation`, `message`,
`message-text`, `message-reasoning`, `message-tool`, `message-source`,
`message-file`, `message-avatar`, `message-content`, `prompt-input`,
`prompt-input-textarea`, `prompt-input-submit`) plus `data-role` and
`data-state` where relevant, so you can restyle without Tailwind.
