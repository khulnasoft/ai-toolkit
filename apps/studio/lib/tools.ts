import { tools } from '../../../content/tools-registry/registry';

export { tools };
export type { Tool } from '../../../content/tools-registry/registry';

export function getToolTags(): string[] {
  return Array.from(new Set(tools.flatMap(tool => tool.tags ?? []))).sort(
    (a, b) => a.localeCompare(b),
  );
}
