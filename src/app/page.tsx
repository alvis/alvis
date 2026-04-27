import { Details, Intro, Writing } from '#sections';

import type { FC } from 'react';

/**
 * the main landing page
 * @returns a component holding the landing page
 */
export default (function HomePage() {
  return (
    <main id="main-content">
      <Intro>
        Product, AI, and writing shaped by curiosity, context, and craft.
      </Intro>
      <Writing />
      <Details />
    </main>
  );
} satisfies FC);
