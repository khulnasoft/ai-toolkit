import { useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from './util/cn';

export interface ConversationProps extends HTMLAttributes<HTMLDivElement> {
  /** Message elements, typically `<Message />` components. */
  children: ReactNode;
  /** Scroll to the bottom when children change. Defaults to `true`. */
  autoScroll?: boolean;
}

/**
 * Scrollable conversation container. Keeps the latest message in view while
 * new parts stream in. Pair with `useChat` from `@ai-toolkit/react`:
 *
 * ```tsx
 * const { messages } = useChat();
 * <Conversation>
 *   {messages.map(message => (
 *     <Message key={message.id} message={message} />
 *   ))}
 * </Conversation>
 * ```
 */
export function Conversation({
  children,
  autoScroll = true,
  className,
  ...props
}: ConversationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (element && autoScroll) {
      element.scrollTop = element.scrollHeight;
    }
  }, [children, autoScroll]);

  return (
    <div
      {...props}
      ref={ref}
      role="log"
      aria-live="polite"
      data-slot="conversation"
      className={cn('flex flex-col gap-4 overflow-y-auto', className)}
    >
      {children}
    </div>
  );
}
