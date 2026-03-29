'use client';

import { useState, useCallback } from 'react';
import { Button, Card, CardContent, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from '@ai-toolkit/design-system';
import {
  ModelSelector,
  PromptEditor,
  ParameterControls,
  ResponseViewer,
  type ResponseMetadata,
} from '@ai-toolkit/ai-elements';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { Play, RotateCcw, Copy, Download } from 'lucide-react';

export default function PlaygroundPage() {
  const [model, setModel] = useState('openai/gpt-4o');
  const [systemPrompt, setSystemPrompt] = useState(
    'You are a helpful AI assistant.'
  );
  const [userPrompt, setUserPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [topP, setTopP] = useState(1);
  const [response, setResponse] = useState('');
  const [metadata, setMetadata] = useState<ResponseMetadata | undefined>();
  const [isStreaming, setIsStreaming] = useState(false);

  const handleRun = useCallback(async () => {
    if (!userPrompt.trim()) return;

    setIsStreaming(true);
    setResponse('');
    setMetadata(undefined);

    const startTime = Date.now();

    try {
      const res = await fetch('/api/playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          systemPrompt,
          userPrompt,
          temperature,
          maxTokens,
          topP,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate response');
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let fullResponse = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          fullResponse += chunk;
          setResponse(fullResponse);
        }

        setMetadata({
          model,
          latency: Date.now() - startTime,
          finishReason: 'stop',
        });
      }
    } catch {
      setResponse('Error generating response. Please try again.');
    } finally {
      setIsStreaming(false);
    }
  }, [model, systemPrompt, userPrompt, temperature, maxTokens, topP]);

  const handleReset = () => {
    setUserPrompt('');
    setResponse('');
    setMetadata(undefined);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Playground" />
        <main className="flex-1 overflow-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
            <div className="lg:col-span-1 space-y-4 overflow-auto">
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
                      { id: 'anthropic/claude-opus-4', name: 'Claude Opus 4', provider: 'Anthropic', description: 'Most intelligent' },
                      { id: 'google/gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'Google', description: 'Advanced reasoning' },
                      { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'Google', description: 'Fast responses' },
                    ]}
                    value={model}
                    onValueChange={setModel}
                    className="w-full"
                  />
                </CardContent>
              </Card>

              <PromptEditor
                systemPrompt={systemPrompt}
                onSystemPromptChange={setSystemPrompt}
                disabled={isStreaming}
              />

              <ParameterControls
                temperature={temperature}
                onTemperatureChange={setTemperature}
                maxTokens={maxTokens}
                onMaxTokensChange={setMaxTokens}
                topP={topP}
                onTopPChange={setTopP}
                disabled={isStreaming}
              />
            </div>

            <div className="lg:col-span-2 flex flex-col gap-4">
              <Card className="flex-1">
                <CardHeader className="pb-3 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-medium">User Prompt</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleReset}
                      disabled={isStreaming}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Reset
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleRun}
                      disabled={isStreaming || !userPrompt.trim()}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      {isStreaming ? 'Running...' : 'Run'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    placeholder="Enter your prompt here..."
                    className="w-full h-32 p-3 text-sm border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                    disabled={isStreaming}
                  />
                </CardContent>
              </Card>

              <div className="flex-1 min-h-[300px]">
                <ResponseViewer
                  content={response}
                  metadata={metadata}
                  isStreaming={isStreaming}
                  className="h-full"
                />
              </div>

              {response && !isStreaming && (
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
