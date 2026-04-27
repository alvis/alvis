import { describe, expect, it } from 'vitest';

import { essays } from './essays';

describe('essays', () => {
  it('leads with the current Presetter v9 release story', () => {
    const latest = essays[0];

    expect(latest.slug).toBe('presetter-v9-configuration-with-a-memory');
    expect(latest.body.some((block) => block.kind === 'code')).toBe(true);
    expect(latest.links?.map(({ href }) => href)).toEqual(
      expect.arrayContaining([
        'https://presetter.dev/',
        'https://github.com/alvis/presetter/releases/tag/v9.0.0',
      ]),
    );
  });

  it('should give every essay a unique lead image', () => {
    const imageSources = essays.map(({ image }) => image);

    expect(new Set(imageSources).size).toBe(essays.length);
  });

  it('lists essays in reverse chronological order', () => {
    const timestamps = essays.map(({ date }) => Date.parse(date));

    expect(timestamps).toEqual(
      [...timestamps].sort((left, right) => right - left),
    );
  });
});
