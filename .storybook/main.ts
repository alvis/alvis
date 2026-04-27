// eslint-disable-next-line import/no-nodejs-modules -- Storybook config runs in Node at build time.
import { readFile } from 'node:fs/promises';

import { loadCsf } from 'storybook/internal/csf-tools';

import type { StorybookConfig } from '@storybook/nextjs-vite';
import type { Indexer } from 'storybook/internal/types';

/**
 * Spec-file indexer so that `*.spec.sto.(ts|tsx)` files participate in the
 * Storybook index alongside canonical `*.stories.(ts|tsx)` files. These
 * spec stories carry `play()` functions that are executed by
 * `@storybook/addon-vitest` and serve as our component-level interaction
 * test suite.
 */
const specStoIndexer: Indexer = {
  test: /\.spec\.sto\.(m?js|ts)x?$/u,
  createIndex: async (fileName, options) => {
    const code = (await readFile(fileName, 'utf-8')).toString();
    if (code.trim().length === 0) {
      return [];
    }

    return loadCsf(code, { ...options, fileName }).parse().indexInputs;
  },
};

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(ts|tsx)',
    '../src/**/*.spec.sto.@(ts|tsx)',
  ],
  framework: '@storybook/nextjs-vite',
  features: {
    // Required for Next.js App Router Server Components to render inside
    // the Storybook preview + the vitest browser runner.
    experimentalRSC: true,
  },
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-themes',
    'storybook-addon-pseudo-states',
    '@storybook/addon-vitest',
  ],
  experimental_indexers: (existing) => [specStoIndexer, ...(existing ?? [])],
};

export default config;
