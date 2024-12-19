import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      reporter: ['text', 'lcov'],
    },
    env: loadEnv('test', process.cwd(), ''),
  },
});
