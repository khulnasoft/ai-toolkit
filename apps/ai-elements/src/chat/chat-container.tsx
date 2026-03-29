'use client';

import * as React from 'react';
import { Card, cn } from '@ai-toolkit/design-system';
import { ChatMessage, type ChatMessageProps } from './chat-message';
import { ChatInput } from './chat-input';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatContainerProps {
  messages: Message[];
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  isLoading?: boolean;
  className?: string;
  placeholder?: string;
}

export function ChatContainer({
  messages,
  input,
  onInputChange,
  onSubmit,
  onStop,
  isLoading,
  className,
  placeholder,
}: ChatContainerProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Card className={cn('flex flex-col h-full', className)}>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Start a conversation
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))
        )}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <ChatMessage role="assistant" content="" isLoading />
        )}
      </div>
      <div className="border-t p-4">
        <ChatInput
          value={input}
          onChange={onInputChange}
          onSubmit={onSubmit}
          onStop={onStop}
          isLoading={isLoading}
          placeholder={placeholder}
        />
      </div>
    </Card>
  );
}
