import '@fortawesome/fontawesome-svg-core/styles.css';

import '../styles/globals.css';

import { Landing } from '#layouts';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://alvis.im'),
  title: 'Alvis Tang — Context for AI. Purpose for humans.',
  description:
    'AI founder and open-source builder harnessing context for machines and restoring purpose for humans.',
  keywords: [
    'AI agents',
    'context engineering',
    'future of work',
    'Alvis Tang',
  ],
  authors: [{ name: 'Alvis Tang', url: 'https://alvis.im' }],
  creator: 'Alvis HT Tang',
  icons: {
    icon: '/images/icons/favicon.png',
  },
  openGraph: {
    title: 'Alvis Tang — Context for AI. Purpose for humans.',
    description:
      'Building systems where agents remember what matters and people recover the purpose automation forgets.',
    type: 'website',
    url: '/',
  },
};

export default Landing;
