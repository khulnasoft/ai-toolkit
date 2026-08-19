'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  Copy,
  FileJson,
  Gauge,
  Github,
  KeyRound,
  MessageSquareText,
  MoreHorizontal,
  Play,
  Plus,
  Sparkles,
  Terminal,
  WandSparkles,
  Zap,
} from 'lucide-react';

const models = [
  { name: 'Claude 3.7 Sonnet', id: 'anthropic/claude-3-7-sonnet', speed: 'Fast', cost: '$3 / 1M' },
  { name: 'GPT-4.1', id: 'openai/gpt-4.1', speed: 'Fast', cost: '$2 / 1M' },
  { name: 'Gemini 2.5 Pro', id: 'google/gemini-2.5-pro', speed: 'Standard', cost: '$1.25 / 1M' },
];

const starterPrompts = [
  'Summarize the latest customer feedback',
  'Extract the action items from this meeting',
  'Write a concise product launch announcement',
];

export default function HomePage() {
  const [activeSurface, setActiveSurface] = useState<'chat' | 'code'>('chat');
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [prompt, setPrompt] = useState('Explain how streaming responses work in the AI SDK.');
  const [response, setResponse] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const runPrompt = () => {
    if (!prompt.trim()) return;
    setIsRunning(true);
    setResponse('');
    window.setTimeout(() => {
      setResponse(
        'Streaming lets your UI render model output as it arrives instead of waiting for a complete response. The AI Gateway keeps the interface consistent across providers, so you can switch models without rewriting your application.',
      );
      setIsRunning(false);
    }, 700);
  };

  const copySnippet = async () => {
    await navigator.clipboard?.writeText(`model: '${selectedModel.id}'`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <nav className="border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles data-icon="inline-start" />
            </span>
            <span>AI Elements</span>
            <span className="hidden rounded-full border border-border px-2 py-0.5 font-mono text-[10px] font-normal text-muted-foreground sm:inline-flex">PLAYGROUND</span>
          </Link>
          <div className="hidden items-center gap-1 text-sm text-muted-foreground md:flex">
            <Link className="rounded-md px-3 py-2 hover:bg-muted hover:text-foreground" href="/elements">Elements</Link>
            <Link className="rounded-md px-3 py-2 hover:bg-muted hover:text-foreground" href="/models">Models</Link>
            <Link className="rounded-md px-3 py-2 hover:bg-muted hover:text-foreground" href="/docs">Docs</Link>
            <Link className="rounded-md px-3 py-2 hover:bg-muted hover:text-foreground" href="/gateway">Gateway</Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="https://github.com/vercel/ai" className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground sm:flex"><Github data-icon="inline-start" /> GitHub <ArrowUpRight data-icon="inline-end" /></Link>
            <button className="rounded-md border border-border bg-card px-3 py-2 text-sm font-medium shadow-sm hover:bg-muted">Get started</button>
          </div>
        </div>
      </nav>

      <section className="mx-auto max-w-[1440px] px-5 pb-12 pt-16 lg:px-8 lg:pt-24">
        <div className="grid items-end gap-10 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1.5 font-mono text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" /> v1.0 is now available</div>
            <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.06em] sm:text-7xl lg:text-[88px]">Build AI interfaces that feel <span className="text-primary">native.</span></h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">AI Elements is a component library and custom registry built on shadcn/ui. Compose chat, generative UI, and agent experiences without starting from scratch.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={() => document.getElementById('workbench')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90"><WandSparkles data-icon="inline-start" /> Open the playground</button>
              <Link href="/elements" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted">Browse components <ArrowUpRight data-icon="inline-end" /></Link>
            </div>
          </div>
          <div className="border-l border-border pl-6 lg:mb-3 lg:pl-10">
            <div className="flex items-center gap-2 font-mono text-xs text-primary"><Zap data-icon="inline-start" /> AI GATEWAY FOR DEVELOPERS</div>
            <p className="mt-4 max-w-md text-2xl font-medium leading-snug tracking-tight">Hundreds of models. One API key. No markup.</p>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Check className="text-primary" /> Text & reasoning</span><span className="flex items-center gap-2"><Check className="text-primary" /> Image & video</span><span className="flex items-center gap-2"><Check className="text-primary" /> Audio & speech</span><span className="flex items-center gap-2"><Check className="text-primary" /> Automatic fallbacks</span></div>
          </div>
        </div>
      </section>

      <section id="workbench" className="mx-auto max-w-[1440px] px-5 pb-20 lg:px-8">
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/5">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-muted/30 px-4 py-3">
            <div className="flex items-center gap-3"><div className="flex gap-1.5"><span className="size-2.5 rounded-full bg-destructive/70" /><span className="size-2.5 rounded-full bg-primary/60" /><span className="size-2.5 rounded-full bg-muted-foreground/40" /></div><span className="hidden font-mono text-xs text-muted-foreground sm:inline">playground / untitled-request</span></div>
            <div className="flex items-center gap-2"><span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground"><span className="size-1.5 rounded-full bg-primary" /> gateway connected</span><button className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"><MoreHorizontal data-icon="inline-start" /></button></div>
          </div>
          <div className="grid min-h-[600px] lg:grid-cols-[260px_1fr_300px]">
            <aside className="border-b border-border p-4 lg:border-b-0 lg:border-r"><p className="mb-3 px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Workspace</p><div className="flex flex-col gap-1"><button className="flex items-center gap-3 rounded-md bg-muted px-3 py-2.5 text-left text-sm font-medium"><MessageSquareText className="text-primary" /> Chat playground</button><button className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted"><Code2 /> Code examples</button><button className="flex items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground hover:bg-muted"><Boxes /> Component registry</button></div><div className="mt-8 border-t border-border pt-6"><p className="mb-3 px-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Recent</p><button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs text-muted-foreground hover:bg-muted"><FileJson /> JSON extraction</button><button className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-xs text-muted-foreground hover:bg-muted"><Terminal /> Tool calling</button></div><button className="mt-8 flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border px-3 py-2 text-xs text-muted-foreground hover:bg-muted"><Plus data-icon="inline-start" /> New session</button></aside>
            <div className="flex min-w-0 flex-col">
              <div className="flex items-center justify-between border-b border-border px-5 py-4"><div><p className="font-medium">Try a prompt</p><p className="mt-1 text-xs text-muted-foreground">Test your model configuration in real time.</p></div><div className="flex rounded-md border border-border bg-muted p-1"><button onClick={() => setActiveSurface('chat')} className={`rounded px-3 py-1.5 text-xs ${activeSurface === 'chat' ? 'bg-card font-medium shadow-sm' : 'text-muted-foreground'}`}>Chat</button><button onClick={() => setActiveSurface('code')} className={`rounded px-3 py-1.5 text-xs ${activeSurface === 'code' ? 'bg-card font-medium shadow-sm' : 'text-muted-foreground'}`}>Code</button></div></div>
              <div className="flex flex-1 flex-col gap-5 p-5"><div className="flex flex-1 flex-col justify-end gap-4"><div className="max-w-[86%] rounded-lg border border-border bg-muted/40 p-4 text-sm leading-6 text-muted-foreground"><span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-primary">assistant</span>{response || 'Your response will appear here. Ask anything about the AI SDK, models, or your application.'}</div></div><div className="rounded-lg border border-border bg-background shadow-sm"><textarea value={prompt} onChange={event => setPrompt(event.target.value)} rows={3} className="w-full resize-none bg-transparent p-4 text-sm outline-none placeholder:text-muted-foreground" placeholder="Ask the model anything..." /><div className="flex items-center justify-between border-t border-border px-3 py-2"><div className="flex items-center gap-1"><button className="rounded p-1.5 text-muted-foreground hover:bg-muted"><Plus data-icon="inline-start" /></button><span className="hidden text-xs text-muted-foreground sm:inline">Add context or tools</span></div><button onClick={runPrompt} disabled={isRunning} className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground disabled:opacity-60">{isRunning ? 'Running…' : 'Run prompt'} <Play data-icon="inline-end" /></button></div></div><div className="flex flex-wrap gap-2">{starterPrompts.map(item => <button key={item} onClick={() => setPrompt(item)} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted">{item}</button>)}</div></div>
            </div>
            <aside className="border-t border-border p-5 lg:border-l lg:border-t-0"><div className="flex items-center justify-between"><p className="font-medium">Configuration</p><button className="rounded p-1.5 text-muted-foreground hover:bg-muted"><CircleHelp data-icon="inline-start" /></button></div><label className="mt-6 block text-xs font-medium text-muted-foreground">MODEL</label><div className="relative mt-2"><select value={selectedModel.id} onChange={event => setSelectedModel(models.find(model => model.id === event.target.value) ?? models[0])} className="w-full appearance-none rounded-md border border-border bg-background px-3 py-2.5 pr-8 text-sm outline-none focus:ring-2 focus:ring-ring">{models.map(model => <option key={model.id} value={model.id}>{model.name}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-3 text-muted-foreground" /></div><div className="mt-3 flex items-center justify-between text-xs text-muted-foreground"><span className="flex items-center gap-1.5"><Gauge data-icon="inline-start" /> {selectedModel.speed}</span><span>{selectedModel.cost}</span></div><div className="mt-7 border-t border-border pt-5"><label className="block text-xs font-medium text-muted-foreground">SYSTEM PROMPT</label><div className="mt-2 rounded-md border border-border bg-muted/30 p-3 font-mono text-[11px] leading-5 text-muted-foreground">You are a helpful assistant for developers. Keep answers clear and actionable.</div></div><div className="mt-7 border-t border-border pt-5"><div className="flex items-center justify-between"><label className="text-xs font-medium text-muted-foreground">REQUEST SNIPPET</label><button onClick={copySnippet} className="flex items-center gap-1 text-xs text-primary hover:underline">{copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />} {copied ? 'Copied' : 'Copy'}</button></div><pre className="mt-2 overflow-x-auto rounded-md bg-foreground p-3 font-mono text-[11px] leading-5 text-background"><code>{`const result = await streamText({\n  model: '${selectedModel.id}',\n  prompt,\n});`}</code></pre></div><div className="mt-7 rounded-md border border-primary/30 bg-primary/5 p-3 text-xs leading-5 text-muted-foreground"><KeyRound className="mb-2 text-primary" /> Your API key stays on the server. Gateway routing is ready.</div></aside>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30"><div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 py-14 lg:flex-row lg:items-center lg:justify-between lg:px-8"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">Ship the interface</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">The building blocks for your next AI product.</h2></div><div className="flex gap-3"><Link href="/elements" className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">Explore AI Elements <ArrowUpRight data-icon="inline-end" /></Link><Link href="/docs" className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-medium">Read the docs</Link></div></div></section>
    </main>
  );
}
