import { Intro } from '../sections/Intro';

import type { FC } from 'react';

/**
 * the main landing page
 * @returns a component holding the landing page
 */
export default (function HomePage() {
  return (
    <main>
      <Intro>a curious techy turned maths PhD turned entrepreneur</Intro>
    </main>
  );
} satisfies FC);
