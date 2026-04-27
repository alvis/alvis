import { describe, expect, it } from 'vitest';

import { isCurrentRoute, socialLinks } from './data';

describe('socialLinks', () => {
  it('links to the current X profile', () => {
    expect(socialLinks.find(({ label }) => label.includes('X'))?.href).toBe(
      'https://x.com/alvvst',
    );
  });

  it('matches section roots and descendants without matching prefixes', () => {
    expect(isCurrentRoute('/thinking', '/thinking')).toBe(true);
    expect(isCurrentRoute('/thinking/context-layer', '/thinking')).toBe(true);
    expect(isCurrentRoute('/thinking', '/')).toBe(false);
    expect(isCurrentRoute('/workshop', '/work')).toBe(false);
  });
});
