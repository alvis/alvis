import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';

import { getAssetKey } from '#content';

import { CodeBlock } from '../CodeBlock';

import type { FC, ReactNode } from 'react';

import type { ContentBlock, Essay } from '#content';

/** props accepted by `Manuscript` */
export type ManuscriptProps = {
  /** essay to render in the codex layout */
  readonly essay: Essay;
};

/**
 * "Manuscript" blog variant (Codex voice): editorial single-column reading
 * shell with italic serif kicker / title / dek, navy drop cap on the lede,
 * generous airy rhythm, centered pull quotes. the watercolor wash now lives on
 * the page-level hero header (`src/app/thinking/[slug]/page.tsx`) so it paints
 * across the viewport behind the nav rather than being confined to this
 * article box. semantic tokens (`--color-ink`, `--size-body`, …) are inherited
 * from `:root[data-theme="codex"]` in `src/styles/theme.css`; per-instance
 * typography is driven entirely by CSS tokens.
 * @param props variant props
 * @param props.essay essay to render
 * @returns codex-styled article element
 */
export const Manuscript: FC<ManuscriptProps> = memo(({ essay }) => (
  <article className="section-transition section-transition-paper relative isolate overflow-visible">
    <div className="codex-shell">
      <div className="codex-body">
        <header>
          <p className="codex-kicker">{essay.category} — Field Note</p>
          <h1 className="codex-title">{essay.title}.</h1>
          <p className="codex-dek">{essay.summary}</p>
          <p className="codex-meta">
            <span>{essay.date.toUpperCase()}</span>
            <span aria-hidden="true" className="codex-meta-sep">
              ·
            </span>
            <span>{essay.readingTime.toUpperCase()}</span>
            <span aria-hidden="true" className="codex-meta-sep">
              ·
            </span>
            <span>{essay.category.toUpperCase()}</span>
          </p>
        </header>

        <section className="codex-prose">
          {renderManuscriptBody(essay.body)}

          <figure aria-label={essay.imageAlt} className="codex-figure">
            <div
              className="codex-figure-frame"
              data-asset-key={getAssetKey(essay.image)}
              data-asset-kind="blog">
              <Image
                fill
                alt={essay.imageAlt}
                className="object-cover opacity-95 mix-blend-multiply"
                sizes="(max-width: 768px) 92vw, 38rem"
                src={essay.image}
              />
            </div>
            <figcaption className="codex-figcap">{essay.imageAlt}</figcaption>
          </figure>
        </section>

        <div className="codex-themes">
          <strong className="codex-themes-label">Themes</strong>
          {essay.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        {essay.links?.length ? (
          <nav aria-label="Essay sources" className="codex-related">
            {essay.links.map((link) => (
              <a
                href={link.href}
                key={link.href}
                rel="noopener noreferrer"
                target="_blank">
                {link.label} <span aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        ) : null}

        <Link className="codex-back" href="/thinking">
          <span aria-hidden="true">&lt;-</span> Back to thinking
        </Link>
      </div>
    </div>
  </article>
));

Manuscript.displayName = 'Manuscript';

/**
 * render the codex body. the first paragraph receives a manual navy drop cap;
 * subsequent blocks switch on their `kind`. headings, pull quotes, code, and
 * figures are rendered with their codex-scoped utility classes. images are
 * delegated to next/image with blur placeholders.
 * @param blocks ordered content blocks from `essay.body`
 * @returns rendered body fragment
 */
function renderManuscriptBody(blocks: readonly ContentBlock[]): ReactNode {
  const firstParagraphIndex = blocks.findIndex((b) => b.kind === 'paragraph');

  return blocks.map((block, index) => {
    if (block.kind === 'paragraph') {
      const isLede = index === firstParagraphIndex;
      if (isLede) {
        const characters: string[] = Array.from(block.text);
        const first = characters[0] ?? '';
        const rest = characters.slice(1).join('');

        return (
          <p className="codex-lede" key={index}>
            <span className="codex-lede-cap">{first}</span>
            {rest}
          </p>
        );
      }

      return <p key={index}>{block.text}</p>;
    }

    if (block.kind === 'heading') {
      return (
        <h2 className="codex-section-heading" key={index}>
          {renderHeadingText(block.text, block.emphasis)}
        </h2>
      );
    }

    if (block.kind === 'pull') {
      return (
        <blockquote className="codex-pull" key={index}>
          {block.text}
        </blockquote>
      );
    }

    if (block.kind === 'code') {
      return (
        <CodeBlock
          caption={block.caption}
          key={index}
          language={block.language}
          source={block.source}
        />
      );
    }

    return (
      <figure className="codex-figure" key={index}>
        <div
          className="codex-figure-frame"
          data-asset-key={getAssetKey(block.src)}
          data-asset-kind="blog">
          <Image
            fill
            alt={block.alt}
            className="object-cover opacity-95 mix-blend-multiply"
            placeholder="blur"
            sizes="(max-width: 768px) 92vw, 38rem"
            src={block.src}
          />
        </div>
        {block.caption ? (
          <figcaption className="codex-figcap">{block.caption}</figcaption>
        ) : null}
      </figure>
    );
  });
}

/**
 * wrap the first occurrence of `emphasis` inside `text` in an `<em>` element;
 * when no emphasis substring is given or the substring is not found, the raw
 * text is returned unchanged
 * @param text complete heading string
 * @param emphasis exact fragment to render with emphasis
 * @returns plain text or nodes containing the emphasized fragment
 */
function renderHeadingText(
  text: string,
  emphasis: string | undefined,
): ReactNode {
  if (!emphasis) {
    return text;
  }

  const matchIndex = text.indexOf(emphasis);
  if (matchIndex < 0) {
    return text;
  }

  return (
    <>
      {text.slice(0, matchIndex)}
      <em>{emphasis}</em>
      {text.slice(matchIndex + emphasis.length)}
    </>
  );
}
