import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { Intro } from './index';

vi.mock(
  'next/navigation',
  () =>
    ({
      usePathname: () => '/',
    }) satisfies Partial<typeof import('next/navigation')>,
);

describe('rc:Intro', () => {
  it('should pair the portrait with Ada Lovelace on machine authorship', () => {
    const html = renderToStaticMarkup(<Intro />);

    expect(html).toContain(
      'The Analytical Engine has no pretensions whatever to originate anything.',
    );
    expect(html).toContain('Ada Lovelace, 1843');
    expect(html).not.toContain(
      'Building at the edge of machine context and human meaning.',
    );
  });
});
