import type { Preview } from '@storybook/nextjs-vite';

import './main.css';

/** Marketing-site theme overlay value applied at the document root. */
const MARKETING_THEME = 'codex';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: { pathname: '/' },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.setAttribute('data-theme', MARKETING_THEME);

      return Story(context);
    },
  ],
};

export default preview;
