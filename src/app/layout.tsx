import '@fortawesome/fontawesome-svg-core/styles.css';

import '#global.css';

import { Landing } from '#layouts';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Hi! I'm Alvis",
  description: 'A curious techy turned maths PhD turned entrepreneur',
  keywords: ['alvis', 'personal', 'website'],
  authors: [{ name: 'Alvis HT Tang', url: 'https://hilbert.space' }],
  creator: 'Alvis HT Tang',
  icons: {
    icon: '/images/icons/favicon.png',
  },
};

export default Landing;
