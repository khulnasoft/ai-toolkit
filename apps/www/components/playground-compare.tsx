'use client';

import { GitCompare, Sparkles, Timer } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const comparisons = [
  {
    label: 'Explain',
    prompt: 'Explain serverless functions in one paragraph.',
    models: [
      {
        name: 'OpenAI · gpt-4.1',
        latency: '1.2s',
        tokens: '148',
        cost: '$0.004',
        response:
          'A serverless function runs your code on demand without you managing servers. The platform provisions compute per request, scales to zero, and bills only for execution time and resources used. You deploy code, the platform handles infrastructure, and cold starts are the main trade-off for latency-sensitive workloads.',
      },
      {
        name: 'Anthropic · claude-4-sonnet',
        latency: '0.9s',
        tokens: '132',
        cost: '$0.009',
        response:
          'Serverless functions execute a single unit of logic in response to events, abstracting away the server entirely. The provider allocates resources purely per invocation — scaling up, down, and to zero automatically. You pay for what you use, and idle capacity costs nothing.',
      },
    ],
  },
  {
    label: 'Extract',
    prompt:
      'Extract JSON with the fields city, summary, and temperature from: "Sunny in Paris today, 24 degrees."',
    models: [
      {
        name: 'OpenAI · gpt-4.1',
        latency: '1.5s',
        tokens: '96',
        cost: '$0.003',
        response:
          '{"city": "Paris", "summary": "Sunny in Paris today", "temperature": 24}',
      },
      {
        name: 'Anthropic · claude-4-sonnet',
        latency: '1.1s',
        tokens: '110',
        cost: '$0.008',
        response:
          '{"city":"Paris","summary":"Sunny skies expected in Paris today","temperature":24}',
      },
    ],
  },
  {
    label: 'Haiku',
    prompt: 'Write a haiku about distributed databases.',
    models: [
      {
        name: 'OpenAI · gpt-4.1',
        latency: '1.8s',
        tokens: '74',
        cost: '$0.002',
        response:
          'shards drift across nodes\nconsistent at last — one view\nquietly agreed',
      },
      {
        name: 'Anthropic · claude-4-sonnet',
        latency: '2.1s',
        tokens: '69',
        cost: '$0.005',
        response:
          'replicas whisper\nacross partitions of glass\nthe quorum agrees',
      },
    ],
  },
];

export function PlaygroundCompare() {
  const [active, setActive] = useState(0);
  const comparison = comparisons[active];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-muted/30 px-4 py-2">
        <div className="flex items-center gap-2">
          {comparisons.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setActive(index)}
              className={cn(
                'rounded-md px-2.5 py-1 font-mono text-[11px]',
                index === active
                  ? 'bg-primary/15 text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <GitCompare className="size-3.5" />
          Compare
        </span>
      </div>

      <div className="border-b border-border px-4 py-3">
        <p className="text-sm text-foreground/90">{comparison.prompt}</p>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        {comparison.models.map((model, index) => (
          <div
            key={model.name}
            className={cn(
              'flex flex-col p-4',
              index === 0 ? 'md:border-r md:border-border' : '',
            )}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                <Sparkles className="size-3.5 text-primary" />
                {model.name}
              </span>
              <span className="flex items-center gap-1 font-mono text-[10px] text-muted-foreground">
                <Timer className="size-3" />
                {model.latency}
              </span>
            </div>
            <p className="mt-3 text-[13px] leading-6 text-foreground/90">
              {model.response}
            </p>
            <div className="mt-4 flex gap-4 border-t border-border pt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <span>{model.tokens} tok</span>
              <span>{model.cost}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
