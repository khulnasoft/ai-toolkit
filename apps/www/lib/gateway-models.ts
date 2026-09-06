import { readFileSync } from 'fs';
import { join } from 'path';

const GATEWAY_MODELS_ROOT = join(
  process.cwd(),
  '../../packages/special/gateway/src',
);

const MODEL_SETTINGS_FILES: Record<GatewayModelModality, string> = {
  language: 'gateway-language-model-settings.ts',
  embedding: 'gateway-embedding-model-settings.ts',
  image: 'gateway-image-model-settings.ts',
};

export type GatewayModelModality = 'language' | 'embedding' | 'image';

export interface GatewayModel {
  id: string;
  provider: string;
  modality: GatewayModelModality;
}

export interface GatewayModelProvider {
  id: string;
  name: string;
  count: number;
}

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

function providerLabel(provider: string): string {
  if (PROVIDER_LABELS[provider]) return PROVIDER_LABELS[provider];
  return provider
    .split(/[-_]/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
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

export function getGatewayModels(): GatewayModel[] {
  return (Object.keys(MODEL_SETTINGS_FILES) as GatewayModelModality[]).flatMap(
    modality =>
      parseModelIds(MODEL_SETTINGS_FILES[modality]).map(id => ({
        id,
        provider: id.split('/')[0],
        modality,
      })),
  );
}

export function getGatewayModelCounts(): Record<GatewayModelModality, number> {
  return getGatewayModels().reduce<Record<GatewayModelModality, number>>(
    (counts, model) => {
      counts[model.modality]++;
      return counts;
    },
    { language: 0, embedding: 0, image: 0 },
  );
}

export function getGatewayModelProviders(): GatewayModelProvider[] {
  const counts = new Map<string, number>();
  for (const model of getGatewayModels()) {
    counts.set(model.provider, (counts.get(model.provider) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([id, count]) => ({ id, name: providerLabel(id), count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
