import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { PosteriorContractionArtwork } from './PosteriorContractionArtwork';

describe('rc:PosteriorContractionArtwork', () => {
  it('should render the probability band without a trajectory line', () => {
    const html = renderToStaticMarkup(<PosteriorContractionArtwork />);

    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('posterior-credible-band');
    expect(html).not.toContain('posterior-mean');
    expect(html).not.toContain('posterior-flow');
    expect(html).not.toContain('<circle');
  });
});
