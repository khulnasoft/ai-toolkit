import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    external: ['ai-toolkit', 'react', 'svelte', 'vue', 'chai', 'chai/*'],
    dts: false,
    sourcemap: true,
    target: 'es2018',
    platform: 'node',
    define: {
      __PACKAGE_VERSION__: JSON.stringify(
        (await import('./package.json', { with: { type: 'json' } })).default.version,
      ),
    },
  },
  {
    entry: ['internal/index.ts'],
    outDir: 'dist/internal',
    format: ['cjs', 'esm'],
    external: ['ai-toolkit', 'chai', 'chai/*'],
    dts: false,
    sourcemap: true,
    target: 'es2018',
    platform: 'node',
    define: {
      __PACKAGE_VERSION__: JSON.stringify(
        (await import('./package.json', { with: { type: 'json' } })).default.version,
      ),
    },
  },
  {
    entry: ['test/index.ts'],
    outDir: 'dist/test',
    format: ['cjs', 'esm'],
    external: ['ai-toolkit', 'chai', 'chai/*', 'vitest', 'vitest/*', '@vitest/*', 'vitest/dist/*', 'vitest/dist/chunks/*', 'vitest/dist/node/*', 'vitest/dist/node/chunks/*'],
    dts: false,
    sourcemap: true,
    target: 'es2020',
    platform: 'node',
    define: {
      __PACKAGE_VERSION__: JSON.stringify(
        (await import('./package.json', { with: { type: 'json' } })).default.version,
      ),
    },
  },
]);
