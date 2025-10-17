import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // required for React DOM
    globals: true, // optional but useful for global test APIs like describe/test
    setupFiles: './vitest.setup.ts', // optional: used to set up global mocks or config
    include: ['src/**/*.ui.test.ts', 'src/**/*.ui.test.tsx'],
    deps: {
      fallbackCJS: true, // in case some deps aren't ESM-compatible
    },
  },
});
