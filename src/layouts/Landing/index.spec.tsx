import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Landing } from './index';

describe('layout:Landing', () => {
  it('should end every route with the site footer', () => {
    const html = renderToStaticMarkup(
      <Landing>
        <main>Page content</main>
      </Landing>,
    );

    expect(html).toContain('<footer');
    expect(html).toContain('Context for AI. Purpose for humans.');
    expect(html).not.toContain('site-footer-kinetic');
    expect(html).toContain('data-footer-separator="split-fold"');
    expect(html).toContain('data-section-separator="soft-ridge"');
  });

  it('should let keyboard users skip to route content', () => {
    const html = renderToStaticMarkup(
      <Landing>
        <main id="main-content">Page content</main>
      </Landing>,
    );

    expect(html).toContain('href="#main-content"');
    expect(html).toContain('Skip to content');
  });

  it('should load only the font families used by the released theme', () => {
    const html = renderToStaticMarkup(
      <Landing>
        <main>Page content</main>
      </Landing>,
    );

    expect(html).toContain('family=Fraunces');
    expect(html).toContain('family=Source+Serif+4');
    expect(html).toContain('family=Caveat');
    expect(html).toContain('family=IBM+Plex+Mono');
    expect(html).toContain('family=Source+Sans+3');
    expect(html).not.toContain('family=Gloock');
  });
});
