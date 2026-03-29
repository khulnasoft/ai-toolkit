'use client';

import { Card, Tabs, TabsContent, TabsList, TabsTrigger } from '@ai-toolkit/design-system';

const examples = {
  streamText: `import { streamText } from 'ai';
import { openai } from '@ai-toolkit/openai';

const { textStream } = streamText({
  model: openai('gpt-4o'),
  prompt: 'Write a poem about AI',
});

for await (const text of textStream) {
  console.log(text);
}`,
  generateObject: `import { generateObject } from 'ai';
import { openai } from '@ai-toolkit/openai';
import { z } from 'zod';

const { object } = await generateObject({
  model: openai('gpt-4o'),
  schema: z.object({
    recipe: z.object({
      name: z.string(),
      ingredients: z.array(z.string()),
      steps: z.array(z.string()),
    }),
  }),
  prompt: 'Generate a lasagna recipe.',
});`,
  agent: `import { agent } from 'ai';
import { openai } from '@ai-toolkit/openai';

const myAgent = agent({
  model: openai('gpt-4o'),
  system: 'You are a helpful assistant',
  tools: {
    weather: tool({
      description: 'Get the weather',
      parameters: z.object({
        city: z.string(),
      }),
      execute: async ({ city }) => {
        // Call weather API
        return { temp: 72, condition: 'sunny' };
      },
    }),
  },
});`,
};

export function CodeExample() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Simple, powerful APIs
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              The AI Toolkit provides intuitive APIs for streaming text, generating
              structured data, and building AI agents. Get started in minutes.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Stream text responses in real-time
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Generate type-safe structured outputs
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Build agents with tool calling
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Switch providers with one line
              </li>
            </ul>
          </div>

          <Card className="overflow-hidden">
            <Tabs defaultValue="streamText" className="w-full">
              <div className="border-b px-4 bg-muted/50">
                <TabsList className="h-12 bg-transparent">
                  <TabsTrigger value="streamText" className="text-xs">
                    streamText
                  </TabsTrigger>
                  <TabsTrigger value="generateObject" className="text-xs">
                    generateObject
                  </TabsTrigger>
                  <TabsTrigger value="agent" className="text-xs">
                    agent
                  </TabsTrigger>
                </TabsList>
              </div>
              {Object.entries(examples).map(([key, code]) => (
                <TabsContent key={key} value={key} className="m-0">
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="font-mono text-muted-foreground">{code}</code>
                  </pre>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
}
