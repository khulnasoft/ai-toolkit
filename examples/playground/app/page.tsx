'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Code, MessageSquare, Settings } from 'lucide-react';
import { ChatInterface } from '@/components/chat-interface';
import { ProviderSelector } from '@/components/provider-selector';
import { CodeEditor } from '@/components/code-editor';
import { ExampleTemplates } from '@/components/example-templates';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('chat');
  const [selectedProvider, setSelectedProvider] = useState('openai');
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');

  const handleGenerateCode = async (prompt: string) => {
    setIsGeneratingCode(true);
    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          providerId: selectedProvider,
          modelId: selectedModel,
          language: 'typescript',
        }),
      });

      const result = await response.json();
      if (result.code) {
        setGeneratedCode(result.code);
      }
    } catch (error) {
      console.error('Failed to generate code:', error);
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const handleSelectExample = (prompt: string) => {
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">AI Toolkit Playground</h1>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex space-x-1 mb-6">
          <Button
            variant={activeTab === 'chat' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('chat')}
            className="flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Chat</span>
          </Button>
          <Button
            variant={activeTab === 'code' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('code')}
            className="flex items-center space-x-2"
          >
            <Code className="h-4 w-4" />
            <span>Code Generation</span>
          </Button>
          <Button
            variant={activeTab === 'examples' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('examples')}
            className="flex items-center space-x-2"
          >
            <Play className="h-4 w-4" />
            <span>Examples</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {activeTab === 'chat' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Chat Interface</h2>
                <ChatInterface 
                  providerId={selectedProvider} 
                  modelId={selectedModel} 
                />
              </div>
            )}

            {activeTab === 'code' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Code Generation</h2>
                <CodeEditor
                  initialCode={generatedCode}
                  onGenerate={handleGenerateCode}
                  isGenerating={isGeneratingCode}
                />
              </div>
            )}

            {activeTab === 'examples' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Example Templates</h2>
                <ExampleTemplates onSelectExample={handleSelectExample} />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Provider Settings</h3>
              <ProviderSelector
                selectedProvider={selectedProvider}
                selectedModel={selectedModel}
                onProviderChange={setSelectedProvider}
                onModelChange={setSelectedModel}
              />
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Requests:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Tokens Used:</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Provider:</span>
                  <span className="font-medium">{selectedProvider}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
