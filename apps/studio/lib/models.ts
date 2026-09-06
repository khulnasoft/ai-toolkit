import { readFileSync } from 'fs';
import { join } from 'path';
import { metricFor } from './metrics';
import type { Metric, ModelEntry, Modality } from './types';

const GATEWAY_MODELS_ROOT = join(
  process.cwd(),
  '../../packages/special/gateway/src',
);

const MODEL_SETTINGS_FILES: Record<Modality, string> = {
  language: 'gateway-language-model-settings.ts',
  embedding: 'gateway-embedding-model-settings.ts',
  image: 'gateway-image-model-settings.ts',
};

const PROVIDER_LABELS: Record<string, string> = {
  alibaba: 'Alibaba',
  amazon: 'Amazon',
  anthropic: 'Anthropic',
  'arcee-ai': 'Arcee AI',
  bfl: 'Black Forest Labs',
  bytedance: 'ByteDance',
  cohere: 'Cohere',
  deepseek: 'DeepSeek',
  google: 'Google',
  inception: 'Inception',
  kwaipilot: 'Kwaipilot',
  meituan: 'Meituan',
  meta: 'Meta',
  minimax: 'MiniMax',
  mistral: 'Mistral',
  moonshotai: 'Moonshot AI',
  morph: 'Morph',
  nvidia: 'NVIDIA',
  openai: 'OpenAI',
  perplexity: 'Perplexity',
  'prime-intellect': 'Prime Intellect',
  recraft: 'Recraft',
  stealth: 'Stealth',
  vercel: 'Vercel',
  voyage: 'Voyage',
  xai: 'xAI',
  xiaomi: 'Xiaomi',
  zai: 'Z.ai',
};

const PROVIDER_CAPABILITIES: Record<string, string[]> = {
  amazon: ['reasoning', 'coding'],
  anthropic: ['reasoning', 'coding', 'long-context'],
  cohere: ['rag', 'tool-use'],
  deepseek: ['reasoning', 'coding'],
  google: ['multimodal', 'fast', 'long-context'],
  groq: ['fast', 'open-source'],
  meta: ['open-source'],
  minimax: ['multimodal'],
  mistral: ['efficient', 'open-source'],
  moonshotai: ['coding'],
  nvidia: ['open-source'],
  openai: ['reasoning', 'vision', 'coding'],
  perplexity: ['search', 'realtime'],
  xai: ['reasoning', 'coding'],
  zai: ['reasoning', 'coding'],
};

function providerLabel(provider: string): string {
  if (PROVIDER_LABELS[provider]) return PROVIDER_LABELS[provider];
  return provider
    .split(/[-_]/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function providerCapabilities(provider: string, modality: Modality): string[] {
  if (modality === 'embedding') return ['embeddings'];
  if (modality === 'image') return ['image'];
  return PROVIDER_CAPABILITIES[provider] ?? [];
}

function parseModelIds(fileName: string): string[] {
  const source = readFileSync(join(GATEWAY_MODELS_ROOT, fileName), 'utf8');
  const ids: string[] = [];
  const pattern = /^\s*\|\s*'([^']+)'/gm;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

export function getGatewayModels(): ModelEntry[] {
  return (Object.keys(MODEL_SETTINGS_FILES) as Modality[]).flatMap(modality =>
    parseModelIds(MODEL_SETTINGS_FILES[modality]).map(id => {
      const provider = id.split('/')[0];
      return {
        id,
        provider,
        providerName: providerLabel(provider),
        modality,
        capabilities: providerCapabilities(provider, modality),
      };
    }),
  );
}

export function getModelCounts(): Record<Modality, number> {
  return getGatewayModels().reduce<Record<Modality, number>>(
    (counts, model) => {
      counts[model.modality]++;
      return counts;
    },
    { language: 0, embedding: 0, image: 0 },
  );
}

export function getModelProviders(): { name: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const model of getGatewayModels()) {
    counts.set(model.providerName, (counts.get(model.providerName) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function getModelMetrics(id: string): Metric {
  return metricFor(`model:${id}`);
}

export function providerModalityDistribution(): {
  name: string;
  count: number;
}[] {
  return getModelProviders();
}
