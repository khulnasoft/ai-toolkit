import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts'],
    outDir: 'dist',
    banner: {},
    format: ['cjs', 'esm'],
    external: ['react', 'react-dom'],
    dts: true,
    sourcemap: true,
  },
]);
