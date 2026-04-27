import '@fortawesome/fontawesome-svg-core/styles.css';

import '#global.css';

import { Landing } from '#layouts';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alvis Tang - Maths, Product Systems, and AI Tooling',
  description:
    'Personal site for Alvis Tang, a maths PhD and product builder working across rigorous ideas, AI systems, and useful software.',
  keywords: ['alvis', 'personal', 'website'],
  authors: [{ name: 'Alvis HT Tang', url: 'https://hilbert.space' }],
  creator: 'Alvis HT Tang',
  icons: {
    icon: '/images/icons/favicon.png',
  },
};

export default Landing;
