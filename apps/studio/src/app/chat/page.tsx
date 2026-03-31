'use client';

import { useChat } from '@ai-toolkit/react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@ai-toolkit/design-system';
import { ChatContainer, ModelSelector } from '@ai-toolkit/ai-elements';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';

export default function ChatPage() {
  const [model, setModel] = useState('openai/gpt-4o');
  
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: '/api/chat',
      body: { model },
    });

  const formattedMessages = messages.map((m) => ({
    id: m.id,
    role: m.role as 'user' | 'assistant' | 'system',
    content: m.content,
  }));

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Chat" />
        <main className="flex-1 flex overflow-hidden p-4 gap-4">
          <div className="w-64 shrink-0">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Model</CardTitle>
              </CardHeader>
              <CardContent>
                <ModelSelector
                  models={[
                    { id: 'openai/gpt-4o', name: 'GPT-4o', provider: 'OpenAI', description: 'Most capable model' },
                    { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini', provider: 'OpenAI', description: 'Fast and efficient' },
                    { id: 'anthropic/claude-sonnet-4', name: 'Claude Sonnet 4', provider: 'Anthropic', description: 'Balanced performance' },
                    { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', description: 'Fast responses' },
                  ]}
                  value={model}
                  onValueChange={setModel}
                  className="w-full"
                  disabled={isLoading}
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex-1 min-w-0">
            <ChatContainer
              messages={formattedMessages}
              input={input}
              onInputChange={(value) =>
                handleInputChange({
                  target: { value },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              onSubmit={() =>
                handleSubmit(new Event('submit') as unknown as React.FormEvent)
              }
              onStop={stop}
              isLoading={isLoading}
              className="h-full"
              placeholder="Send a message..."
            />
          </div>
        </main>
      </div>
    </div>
  );
}
