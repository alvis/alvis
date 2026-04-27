import { preset } from 'presetter';
import next from '@presetter/preset-next';

export default preset('alvis', {
  extends: [next],
  override: {
    assets: {
      'vitest.config.ts': {
        default: {
          esbuild: {
            // jsx: 'automatic',
          },
        },
      },
    },
  },
});
