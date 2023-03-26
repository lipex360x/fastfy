import 'dotenv/config'

import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '**/src/**/env/*',
        '**/src/**/lib/*',
        '**/src/**/repositories/prisma/*',
        '**/src/**/modules/**/infra/repositories/in-memory/*',
        '**/tests/mocks/*',
      ],
    },
    environmentMatchGlobs: [['tests/e2e/**', 'prisma']],
  },
})
