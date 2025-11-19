import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: {
      only: true,
    },
    sourcemap: true,
    tsconfig: './tsconfig.json',
  },
]);
