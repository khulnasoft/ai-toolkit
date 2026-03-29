'use client';

import * as React from 'react';
import { cn } from '@ai-toolkit/design-system';
import { Bot, User } from 'lucide-react';

export interface ChatMessageProps {
  role: 'user' | 'assistant' | 'system';
  content: string;
  isLoading?: boolean;
  className?: string;
}

export function ChatMessage({
  role,
  content,
  isLoading,
  className,
}: ChatMessageProps) {
  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg',
        role === 'user' ? 'bg-muted' : 'bg-background',
        className
      )}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
        )}
      >
        {role === 'user' ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="font-medium text-sm">
          {role === 'user' ? 'You' : 'AI Assistant'}
        </div>
        <div className="text-sm leading-relaxed">
          {isLoading ? (
            <span className="inline-flex items-center gap-1">
              <span className="animate-pulse">Thinking</span>
              <span className="animate-bounce delay-75">.</span>
              <span className="animate-bounce delay-150">.</span>
              <span className="animate-bounce delay-200">.</span>
            </span>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
}
