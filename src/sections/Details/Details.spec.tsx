import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { Details } from './index';

describe('rc:Details', () => {
  it('should use posterior contraction instead of the orbit motif', () => {
    const html = renderToStaticMarkup(<Details />);

    expect(html).toContain('posterior-contraction-artwork');
    expect(html).not.toContain('manifesto-signal');
  });
});
