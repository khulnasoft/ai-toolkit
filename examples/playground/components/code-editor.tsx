'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Copy, Download } from 'lucide-react';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onGenerate?: (prompt: string) => void;
  isGenerating?: boolean;
}

export function CodeEditor({ 
  initialCode = '', 
  language = 'typescript',
  onGenerate,
  isGenerating = false 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [prompt, setPrompt] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-code.${language === 'typescript' ? 'ts' : 'js'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerate = () => {
    if (prompt.trim() && onGenerate) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="border rounded-lg">
      <div className="border-b p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Code Editor</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Generate Code Prompt</label>
            <div className="flex space-x-2 mt-1">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the code you want to generate..."
                className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="// Your generated code will appear here..."
            className="w-full h-96 p-4 font-mono text-sm bg-muted border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            spellCheck={false}
          />
          <div className="absolute top-2 right-2 text-xs text-muted-foreground">
            {language}
          </div>
        </div>
      </div>
    </div>
  );
}
