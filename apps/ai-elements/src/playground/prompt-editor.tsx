'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Textarea,
  cn,
} from '@ai-toolkit/design-system';

export interface PromptEditorProps {
  systemPrompt: string;
  onSystemPromptChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function PromptEditor({
  systemPrompt,
  onSystemPromptChange,
  className,
  disabled,
}: PromptEditorProps) {
  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">System Prompt</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={systemPrompt}
          onChange={(e) => onSystemPromptChange(e.target.value)}
          placeholder="You are a helpful AI assistant..."
          className="min-h-[120px] resize-none font-mono text-sm"
          disabled={disabled}
        />
      </CardContent>
    </Card>
  );
}
