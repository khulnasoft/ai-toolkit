import { createSource } from '@vercel/geistdocs/source';
import { cookbook, docs, providers } from '@/.source/server';
import { config } from './config';

export const geistdocsSource = createSource({
  docs,
  config,
});

export const providersSource = createSource({
  docs: providers,
  config,
  baseUrl: '/providers',
});

export const cookbookSource = createSource({
  docs: cookbook,
  config,
  baseUrl: '/cookbook',
});

/** Every source bundle (all content families). */
export const sources = [geistdocsSource, providersSource, cookbookSource];

export const source = geistdocsSource.source;
export const getPageImage = geistdocsSource.getPageImage;
export const getLLMText = geistdocsSource.getPageMarkdown;
