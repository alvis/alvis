import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { CodeBlock } from './CodeBlock';

// --- TEST SUITES --- //

describe('rc:CodeBlock', () => {
  it('should render the source verbatim inside a <pre> element', () => {
    const html = renderToStaticMarkup(
      <CodeBlock
        caption="harness.py — loop driver"
        language="python"
        source={'def run():\n    pass'}
      />,
    );

    expect(html).toContain(
      '<pre data-language="python">def run():\n    pass</pre>',
    );
  });

  it('should render the caption inside a figcaption.code-caption', () => {
    const html = renderToStaticMarkup(
      <CodeBlock caption="harness.py" language="python" source="pass" />,
    );

    expect(html).toContain(
      '<figcaption class="code-caption">harness.py</figcaption>',
    );
  });

  it('should wrap the source and caption in a figure with the codefigure class', () => {
    const html = renderToStaticMarkup(
      <CodeBlock caption="cap" language="ts" source="const x = 1;" />,
    );

    expect(html).toMatch(/^<figure class="codefigure">/);
    expect(html).toMatch(/<\/figure>$/);
  });

  it('should pass the language through to the pre data-language attribute', () => {
    const html = renderToStaticMarkup(
      <CodeBlock caption="cap" language="rust" source="fn main() {}" />,
    );

    expect(html).toContain('data-language="rust"');
  });
});
