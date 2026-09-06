import type { HTMLAttributes, ReactNode } from 'react';
import type { UIMessage } from 'ai-toolkit';
import { cn } from './util/cn';

type MessagePart = UIMessage['parts'][number];

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  /** The message to render. */
  message: UIMessage;
  /** Optional avatar rendered next to the message. */
  avatar?: ReactNode;
  /**
   * Override rendering for a part. Return `undefined` to fall back to the
   * default rendering, or `null` to skip the part.
   */
  renderPart?: (part: MessagePart, index: number) => ReactNode;
}

function ToolCallSummary({ name, state }: { name: string; state: string }) {
  return (
    <div data-slot="message-tool" data-tool={name} data-state={state}>
      <span>Tool call: {name}</span> <span>({state})</span>
    </div>
  );
}

function DefaultPart({ part }: { part: MessagePart }) {
  switch (part.type) {
    case 'text':
      return (
        <p data-slot="message-text" data-state={part.state ?? 'done'}>
          {part.text}
        </p>
      );
    case 'reasoning':
      return (
        <details data-slot="message-reasoning" data-state={part.state ?? 'done'}>
          <summary>Reasoning</summary>
          <p>{part.text}</p>
        </details>
      );
    case 'dynamic-tool':
      return <ToolCallSummary name={part.toolName} state={part.state} />;
    case 'source-url':
      return (
        <a data-slot="message-source" href={part.url}>
          {part.title ?? part.url}
        </a>
      );
    case 'source-document':
      return <span data-slot="message-source">{part.title}</span>;
    case 'file':
      return (
        <span data-slot="message-file">{part.filename ?? part.mediaType}</span>
      );
    default:
      // Tool invocations (`tool-<name>`), data parts, and step boundaries
      // render as a compact summary unless overridden via `renderPart`.
      if (part.type.startsWith('tool-')) {
        const state =
          'state' in part && typeof part.state === 'string' ? part.state : 'unknown';
        return <ToolCallSummary name={part.type.slice('tool-'.length)} state={state} />;
      }
      return null;
  }
}

/**
 * Renders a single `UIMessage` with role-based alignment. Assistant messages
 * align left, user messages align right. Override individual parts with
 * `renderPart`.
 */
export function Message({ message, avatar, renderPart, className, ...props }: MessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      {...props}
      data-slot="message"
      data-role={message.role}
      className={cn('flex w-full gap-3', isUser && 'flex-row-reverse', className)}
    >
      {avatar ? <div data-slot="message-avatar">{avatar}</div> : null}
      <div data-slot="message-content" className="flex min-w-0 flex-col gap-2">
        {message.parts.map((part, index) => {
          const override = renderPart?.(part, index);
          if (override !== undefined) {
            return override === null ? null : (
              <div key={`${part.type}-${index}`}>{override}</div>
            );
          }
          return <DefaultPart key={`${part.type}-${index}`} part={part} />;
        })}
      </div>
    </div>
  );
}
