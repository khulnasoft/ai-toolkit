export type Modality = 'language' | 'embedding' | 'image';

export interface ModelEntry {
  id: string;
  provider: string;
  providerName: string;
  modality: Modality;
  capabilities: string[];
}

export interface ProviderCatalogEntry {
  slug: string;
  name: string;
  description: string;
  category: string;
  categoryTitle: string;
}

export interface TemplateEntry {
  name: string;
  title: string;
  category: string;
  framework: string;
  primaryProvider: string | null;
  description: string;
  tags: string[];
  path: string;
  githubUrl: string;
}

export interface Metric {
  requests: number;
  costUsd: number;
  latencyMs: number;
  p99Ms: number;
  uptimePct: number;
  trend: number[];
  deltaPct: number;
}

export interface SearchItem {
  label: string;
  href: string;
  section: string;
  keywords?: string;
}
