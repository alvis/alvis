import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Footer } from './Footer';

describe('rc:Footer', () => {
  it('should render the decorative rear plane required by Split Fold', () => {
    const html = renderToStaticMarkup(<Footer />);

    expect(html).toContain(
      '<span aria-hidden="true" class="site-footer-separator-rear"></span>',
    );
  });
});
