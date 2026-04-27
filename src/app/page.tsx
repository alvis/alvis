import { Details, FinalInvitation, Intro, Writing } from '#sections';

import type { FC } from 'react';

/**
 * the main landing page
 * @returns a component holding the landing page
 */
export default (function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Intro />
      <Details />
      <Writing />
      <FinalInvitation />
    </main>
  );
} satisfies FC);
