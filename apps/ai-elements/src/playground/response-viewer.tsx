'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from '@ai-toolkit/design-system';

export interface ResponseMetadata {
  model?: string;
  promptTokens?: number;
  completionTokens?: number;
  totalTokens?: number;
  latency?: number;
  finishReason?: string;
}

export interface ResponseViewerProps {
  content: string;
  metadata?: ResponseMetadata;
  isStreaming?: boolean;
  className?: string;
}

export function ResponseViewer({
  content,
  metadata,
  isStreaming,
  className,
}: ResponseViewerProps) {
  return (
    <Card className={cn('h-full flex flex-col', className)}>
      <CardHeader className="pb-3 flex flex-row items-center justify-between">
        <CardTitle className="text-sm font-medium">Response</CardTitle>
        {isStreaming && (
          <Badge variant="secondary" className="animate-pulse">
            Streaming...
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="output" className="h-full flex flex-col">
          <TabsList className="mb-2">
            <TabsTrigger value="output">Output</TabsTrigger>
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>
          <TabsContent
            value="output"
            className="flex-1 overflow-auto mt-0 border rounded-md p-4"
          >
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {content || (
                <span className="text-muted-foreground">
                  Response will appear here...
                </span>
              )}
            </div>
          </TabsContent>
          <TabsContent
            value="metadata"
            className="flex-1 overflow-auto mt-0 border rounded-md p-4"
          >
            {metadata ? (
              <div className="space-y-2 text-sm">
                {metadata.model && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Model:</span>
                    <span className="font-mono">{metadata.model}</span>
                  </div>
                )}
                {metadata.promptTokens !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Prompt Tokens:</span>
                    <span className="font-mono">{metadata.promptTokens}</span>
                  </div>
                )}
                {metadata.completionTokens !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completion Tokens:</span>
                    <span className="font-mono">{metadata.completionTokens}</span>
                  </div>
                )}
                {metadata.totalTokens !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Tokens:</span>
                    <span className="font-mono">{metadata.totalTokens}</span>
                  </div>
                )}
                {metadata.latency !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Latency:</span>
                    <span className="font-mono">{metadata.latency}ms</span>
                  </div>
                )}
                {metadata.finishReason && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Finish Reason:</span>
                    <span className="font-mono">{metadata.finishReason}</span>
                  </div>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground text-sm">
                No metadata available
              </span>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
