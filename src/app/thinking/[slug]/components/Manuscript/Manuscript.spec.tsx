import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';

import { Manuscript } from './Manuscript';

import type { StaticImageData } from 'next/image';
import type { ImgHTMLAttributes, AnchorHTMLAttributes, FC } from 'react';

import type { Essay } from '#content';

// --- MOCKS --- //

vi.mock('next/image', () => {
  const NextImage: FC<
    {
      readonly alt: string;
      readonly src: StaticImageData | string;
      readonly className?: string;
    } & ImgHTMLAttributes<HTMLImageElement>
  > = ({ alt, src, className }) => {
    const resolved = typeof src === 'string' ? src : src.src;

    // eslint-disable-next-line @next/next/no-img-element -- mocked stand-in for next/image inside a unit test
    return <img alt={alt} className={className} src={resolved} />;
  };

  return { default: NextImage };
});

vi.mock('next/link', () => {
  const NextLink: FC<
    AnchorHTMLAttributes<HTMLAnchorElement> & { readonly href: string }
  > = ({ href, children, ...rest }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  );

  return { default: NextLink };
});

// --- CONSTANTS --- //

const SAMPLE_IMAGE: StaticImageData = {
  src: '/hero.png',
  height: 100,
  width: 100,
  blurDataURL: 'data:image/png;base64,xx',
  blurWidth: 1,
  blurHeight: 1,
};

const FIGURE_IMAGE: StaticImageData = {
  src: '/inline.png',
  height: 50,
  width: 50,
  blurDataURL: 'data:image/png;base64,xx',
  blurWidth: 1,
  blurHeight: 1,
};

const FULL_ESSAY: Essay = {
  slug: 'codex-sample',
  title: 'Codex Sample',
  date: 'May 19, 2025',
  category: 'Systems',
  summary: 'A summary that becomes the dek.',
  image: SAMPLE_IMAGE,
  imageAlt: 'hero alt text',
  readingTime: '7 min',
  tags: ['Context', 'AI systems'],
  body: [
    { kind: 'paragraph', text: 'Lede paragraph opens the essay.' },
    { kind: 'paragraph', text: 'Second paragraph stays plain.' },
    {
      kind: 'heading',
      level: 2,
      text: 'The loop is the harness',
      emphasis: 'is',
    },
    { kind: 'heading', level: 2, text: 'Plain section heading' },
    { kind: 'pull', text: 'Pull quote text.' },
    {
      kind: 'code',
      language: 'python',
      caption: 'harness.py',
      source: 'def run(): pass',
    },
    {
      kind: 'figure',
      src: FIGURE_IMAGE,
      alt: 'inline figure',
      caption: 'inline caption',
    },
    { kind: 'figure', src: FIGURE_IMAGE, alt: 'uncaptioned figure' },
  ],
};

const HEADING_ONLY_ESSAY: Essay = {
  ...FULL_ESSAY,
  body: [
    {
      kind: 'heading',
      level: 2,
      text: 'No match here',
      emphasis: 'missing',
    },
  ],
};

const FIGURE_ONLY_ESSAY: Essay = {
  ...FULL_ESSAY,
  body: [{ kind: 'figure', src: FIGURE_IMAGE, alt: 'no caption figure' }],
};

// --- HELPERS --- //

/**
 * render the `Manuscript` variant for ssr-string assertions
 * @param essay essay payload passed to manuscript
 * @returns static html markup for the rendered tree
 */
function renderManuscript(essay: Essay): string {
  return renderToStaticMarkup(<Manuscript essay={essay} />);
}

// --- TEST SUITES --- //

describe('rc:Manuscript', () => {
  it('should render the kicker, italic title, dek and meta line in the header', () => {
    const html = renderManuscript(FULL_ESSAY);

    expect(html).toContain('<p class="codex-kicker">Systems — Field Note</p>');
    expect(html).toContain('<h1 class="codex-title">Codex Sample.</h1>');
    expect(html).toContain(
      '<p class="codex-dek">A summary that becomes the dek.</p>',
    );
    expect(html).toContain('<span>MAY 19, 2025</span>');
    expect(html).toContain('<span>7 MIN</span>');
    expect(html).toContain('<span>SYSTEMS</span>');
  });

  it('should render the first paragraph with a drop-cap span around the first character', () => {
    const html = renderManuscript(FULL_ESSAY);

    expect(html).toContain(
      '<p class="codex-lede"><span class="codex-lede-cap">L</span>ede paragraph opens the essay.</p>',
    );
  });

  it('should render subsequent paragraphs as plain <p> without a drop cap', () => {
    const html = renderManuscript(FULL_ESSAY);

    expect(html).toContain('<p>Second paragraph stays plain.</p>');
  });

  it('should italicise the first occurrence of emphasis within a heading', () => {
    const html = renderManuscript(FULL_ESSAY);

    expect(html).toContain(
      '<h2 class="codex-section-heading">The loop <em>is</em> the harness</h2>',
    );
  });

  it('should render a heading without emphasis as plain text', () => {
    const html = renderManuscript(FULL_ESSAY);

    expect(html).toContain(
      '<h2 class="codex-section-heading">Plain section heading</h2>',
    );
  });

  it('should render a heading verbatim when the emphasis substring is not found', () => {
    const html = renderManuscript(HEADING_ONLY_ESSAY);

    expect(html).toContain(
      '<h2 class="codex-section-heading">No match here</h2>',
    );
  });

  it('should render a pull block inside a blockquote with the codex-pull class', () => {
    const html = renderManuscript(FULL_ESSAY);

    expect(html).toContain(
      '<blockquote class="codex-pull">Pull quote text.</blockquote>',
    );
  });

  it('should render a code block as a codefigure with the source and caption', () => {
    const html = renderManuscript(FULL_ESSAY);

    expect(html).toContain('<figure class="codefigure">');
    expect(html).toContain('<pre data-language="python">def run(): pass</pre>');
    expect(html).toContain(
      '<figcaption class="code-caption">harness.py</figcaption>',
    );
  });

  it('should render a figure block with an image and the optional caption', () => {
    const html = renderManuscript(FULL_ESSAY);

    expect(html).toContain('alt="inline figure"');
    expect(html).toContain('src="/inline.png"');
    expect(html).toContain(
      '<figcaption class="codex-figcap">inline caption</figcaption>',
    );
  });

  it('should omit the body figcaption when a figure block has no caption', () => {
    const captionedHtml = renderManuscript(FULL_ESSAY);
    const uncaptionedHtml = renderManuscript(FIGURE_ONLY_ESSAY);

    // the manuscript shell always renders the essay-hero figcaption, so the
    // delta between captioned and uncaptioned bodies is the only reliable
    // signal that the body figure suppressed its own figcaption
    const captionedCount = captionedHtml.split('codex-figcap').length - 1;
    const uncaptionedCount = uncaptionedHtml.split('codex-figcap').length - 1;

    expect(uncaptionedHtml).toContain('alt="no caption figure"');
    expect(uncaptionedCount).toBe(1);
    expect(captionedCount).toBeGreaterThan(uncaptionedCount);
  });

  it('should list every essay tag in the themes row', () => {
    const html = renderManuscript(FULL_ESSAY);

    expect(html).toContain('<span>Context</span>');
    expect(html).toContain('<span>AI systems</span>');
    expect(html).toContain(
      '<strong class="codex-themes-label">Themes</strong>',
    );
  });

  it('should render a back-to-thinking link pointing at /thinking', () => {
    const html = renderManuscript(FULL_ESSAY);

    expect(html).toMatch(
      /<a[^>]+href="\/thinking"[^>]*>[\s\S]*?Back to thinking[\s\S]*?<\/a>/,
    );
  });
});

describe('rc:Manuscript source links', () => {
  it('should render optional source links after the themes row', () => {
    const html = renderManuscript({
      ...FULL_ESSAY,
      links: [
        { href: 'https://example.com/release', label: 'Read the release' },
      ],
    });

    expect(html).toContain('aria-label="Essay sources"');
    expect(html).toContain('href="https://example.com/release"');
    expect(html).toContain('Read the release');
  });
});
