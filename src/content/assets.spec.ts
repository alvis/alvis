import { describe, expect, it } from 'vitest';

import { getAssetKey } from './assets';

describe('getAssetKey', () => {
  it('extracts stable keys from public paths', () => {
    expect(getAssetKey('/images/blog/context-harness.webp')).toBe(
      'context-harness',
    );
  });

  it('extracts stable keys from static image descriptors', () => {
    expect(getAssetKey({ src: '/images/profile/me-philosophical.webp' })).toBe(
      'me-philosophical',
    );
  });

  it('removes Next static-image build hashes', () => {
    expect(
      getAssetKey({
        src: '/_next/static/media/agents-need.4390zqnp851bl.png',
      }),
    ).toBe('agents-need');
  });
});
