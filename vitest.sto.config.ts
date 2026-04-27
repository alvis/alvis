import { resolve } from 'node:path';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig  } from 'vitest/config';

import type {Plugin} from 'vitest/config';

/**
 * Storybook interaction-test runner for `alvis`.
 *
 * Stories (including the `*.interaction.stories.(ts|tsx)` interaction
 * suites) are compiled by the Next-aware Storybook framework
 * (`@storybook/nextjs-vite`) and executed as Vitest tests inside a
 * headless Chromium browser. The Next.js addon provides the App Router
 * mocks (`useRouter`, `useSearchParams`, `Link`) so client components
 * can be rendered without a hand-rolled context decorator.
 *
 * This config lives alongside the preset-generated `vitest.config.ts` so
 * Presetter regenerations don't clobber the browser-mode wiring.
 */

/**
 * Workaround for upstream bug
 * https://github.com/storybookjs/vite-plugin-storybook-nextjs/issues/114
 * ("NextImage renders as object with Vite 8 due to Rolldown CJS interop
 * change").
 *
 * `vite-plugin-storybook-nextjs@3.2.4` ships a `virtual:next/image` module
 * that does `NextImageNamespace.default` to reach the real Next component.
 * Under Vite 8 + Next 16, `next/image` is a CJS re-export and Vite's new
 * CJS-interop double-wraps it, so `.default` is `{ default: Fn }` instead
 * of `Fn`. React then receives an object where a component is expected
 * and throws "Element type is invalid ... Check the render method of
 * NextImage".
 *
 * We unwrap the extra `.default` by transforming the generated virtual
 * module just before Vite executes it. The upstream docs at
 * https://storybook.js.org/docs/get-started/frameworks/nextjs-vite#local-images
 * state `next/image` should work "with no configuration" -- this shim
 * exists solely to restore that contract until the upstream fix lands.
 * @returns vite plugin that normalises the virtual next/image default
 */
function patchVirtualNextImageDefault(): Plugin {
  return {
    name: 'alvis:patch-virtual-next-image-default',
    enforce: 'post',
    /**
     *
     * @param code
     * @param id
     */
    transform(code, id) {
      if (!id.includes('virtual:next/image')) {
        return null;
      }
      if (!code.includes('NextImageNamespace.default')) {
        return null;
      }
      // Rewrite `NextImageNamespace.default` to transparently unwrap one
      // layer of CJS interop (`{ default: { default: Fn } }` -> `Fn`) while
      // remaining a no-op when Vite already returns the component.
      const patched = code.replace(
        /NextImageNamespace\.default/g,
        '(NextImageNamespace.default && NextImageNamespace.default.default ? NextImageNamespace.default.default : NextImageNamespace.default)',
      );

      return { code: patched, map: null };
    },
  };
}

export default defineConfig({
  optimizeDeps: {
    include: ['react/jsx-dev-runtime'],
  },
  resolve: {
    conditions: ['browser', 'import', 'default'],
  },
  test: {
    watch: false,
    /**
     * Suppress `act()` warnings that are known false positives in the
     * browser runner. Storybook itself disables these in its renderer;
     * we mirror that here so noisy stderr doesn't drown real failures.
     * @param log - The captured log line.
     * @param type - Whether the line came from stdout or stderr.
     * @returns `false` to suppress, `undefined` to allow the log through.
     */
    onConsoleLog(
      log: string,
      type: 'stdout' | 'stderr',
    ): boolean | undefined {
      if (type === 'stderr') {
        if (log.includes('inside a test was not wrapped in act')) {
          return false;
        }
        if (log.includes('A component suspended inside an `act` scope')) {
          return false;
        }
      }

      return undefined;
    },
    include: ['src/**/*.stories.@(ts|tsx)'],
    projects: [
      {
        extends: true,
        plugins: [
          await storybookTest({
            configDir: resolve(import.meta.dirname, '.storybook'),
            storybookScript: 'npx storybook --no-open',
          }),
          patchVirtualNextImageDefault(),
        ],
        test: {
          name: 'alvis:STORY',
          globals: true,
          testTimeout: 5000,
          hookTimeout: 5000,
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
