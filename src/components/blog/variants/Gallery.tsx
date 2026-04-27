import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';

import type { BlogVariantProps } from './types';

/**
 * zero-based paragraph index after which the rust callout blockquote is
 * injected in the gallery body
 */
const CALLOUT_AFTER_INDEX = 2;

/**
 * minimum number of paragraphs the body must have before the rust callout
 * is shown; avoids dangling pull-quotes on very short essays
 */
const MIN_BODY_FOR_CALLOUT = 3;

/**
 * maximum length, in characters, of a TOC entry before it is truncated
 */
const TOC_MAX_LENGTH = 60;

/**
 * length of the truncated TOC entry; intentionally shorter than
 * `TOC_MAX_LENGTH` to leave room for the ellipsis character
 */
const TOC_TRUNCATE_LENGTH = 57;

interface GalleryTocProps {
  readonly date: string;
  readonly readingTime: string;
  readonly category: string;
  readonly items: readonly string[];
}

/**
 * sticky gallery sidebar listing scannable TOC entries plus date/read/filed
 * metadata; the entries are derived from the essay body to avoid hard-coding
 * @param props sidebar props
 * @param props.date essay publication date label
 * @param props.readingTime estimated reading time label
 * @param props.category essay category label
 * @param props.items table-of-contents entries in display order
 * @returns sidebar aside element
 */
const GalleryToc: FC<GalleryTocProps> = ({
  date,
  readingTime,
  category,
  items,
}) => (
  <aside
    aria-label="Article contents"
    className="self-start font-[var(--font-family-label)] lg:sticky lg:top-8">
    <p className="mb-4 border-b border-[#a64b2a] pb-2 text-[0.7rem] font-medium tracking-[0.2em] text-[#a64b2a] uppercase">
      In this essay
    </p>
    <ol className="m-0 list-none p-0">
      {items.map((item, index) => (
        <li
          className="relative mb-4 pl-9 font-[var(--font-family-display)] text-[1.02rem] leading-snug text-[#162747]"
          key={item}>
          <span
            aria-hidden="true"
            className="absolute top-0.5 left-0 font-[var(--font-family-label)] text-[0.74rem] font-medium tracking-[0.08em] text-[#a64b2a]">
            {String(index + 1).padStart('00'.length, '0')}
          </span>
          {item}
        </li>
      ))}
    </ol>
    <div className="mt-10 border-t border-[#d8c9b4] pt-5 text-[0.74rem] leading-[1.8] tracking-[0.08em] text-[#162747]/72">
      <strong className="mt-2 block text-[0.7rem] font-bold tracking-[0.18em] text-[#162747] uppercase">
        Date
      </strong>
      {date}
      <strong className="mt-2 block text-[0.7rem] font-bold tracking-[0.18em] text-[#162747] uppercase">
        Read
      </strong>
      {readingTime}
      <strong className="mt-2 block text-[0.7rem] font-bold tracking-[0.18em] text-[#162747] uppercase">
        Filed
      </strong>
      {category}
    </div>
  </aside>
);

/**
 * "Gallery" blog variant: sticky sidebar table of contents, captioned feature
 * figure, a rust callout, and pill-shaped theme tags arranged like a curated
 * gallery wall.
 * @param props variant props
 * @param props.essay essay to render
 * @returns gallery-styled article element
 */
export const Gallery: FC<BlogVariantProps> = ({ essay }) => {
  const tocItems = deriveTocItems(essay.body);
  const titleParts = splitTitleAccent(essay.title);

  return (
    <div className="relative bg-[#f7f1e6] text-[#162747]">
      <span
        aria-hidden="true"
        className="pointer-events-none fixed inset-y-0 left-0 z-30 w-1.5 bg-[#a64b2a]"
      />

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-6 py-12 pl-10 lg:grid-cols-[240px_minmax(0,1fr)]">
        <GalleryToc
          category={essay.category}
          date={essay.date}
          items={tocItems}
          readingTime={essay.readingTime}
        />

        <article className="min-w-0">
          <span className="mb-5 inline-block rounded-sm bg-[#a64b2a]/10 px-3 py-1 font-[var(--font-family-label)] text-[0.74rem] font-medium tracking-[0.2em] text-[#a64b2a] uppercase">
            Field Note · {essay.category}
          </span>
          <h1 className="mb-5 max-w-[22ch] text-[clamp(2.4rem,5vw,4rem)] leading-[1.05] font-medium tracking-[-0.01em] text-[#162747]">
            {titleParts.head}
            {titleParts.accent ? (
              <>
                {' '}
                <span className="text-[#a64b2a] italic">
                  {titleParts.accent}
                </span>
              </>
            ) : null}
          </h1>
          <p className="mb-10 max-w-[52ch] text-[1.35rem] leading-[1.5] text-[#162747]/72">
            {essay.summary}
          </p>

          <figure aria-label={essay.imageAlt} className="mb-10">
            <div className="relative aspect-[3/2] w-full overflow-hidden rounded-sm border border-[#d8c9b4] bg-[#fff9ee]">
              <Image
                fill
                alt={essay.imageAlt}
                className="object-cover opacity-95 mix-blend-multiply"
                placeholder="blur"
                sizes="(max-width: 900px) 92vw, 60vw"
                src={essay.image}
              />
              <span
                aria-hidden="true"
                className="absolute bottom-4 left-4 rounded-sm bg-[#a64b2a] px-3 py-1.5 font-[var(--font-family-label)] text-[0.68rem] tracking-[0.16em] text-[#fff9ee] uppercase">
                Plate I · Watercolor study
              </span>
            </div>
            <figcaption className="mt-3 grid grid-cols-[56px_1fr] gap-4 border-t-2 border-[#a64b2a] pt-3 font-[var(--font-family-display)] text-[1.02rem] leading-[1.5] text-[#162747]/72 italic">
              <span className="font-[var(--font-family-label)] text-[0.7rem] font-bold tracking-[0.16em] text-[#a64b2a] uppercase not-italic">
                Fig. 01
              </span>
              <span>{essay.imageAlt}</span>
            </figcaption>
          </figure>

          <section className="gallery-body max-w-[60ch] text-[1.18rem] leading-[1.75]">
            {essay.body.map((paragraph, index) => (
              <div key={paragraph}>
                <p className="mb-6">{paragraph}</p>
                {index === CALLOUT_AFTER_INDEX &&
                essay.body.length >= MIN_BODY_FOR_CALLOUT ? (
                  <blockquote className="my-9 rounded-sm bg-[#a64b2a] px-7 py-6 font-[var(--font-family-display)] text-[1.18rem] leading-[1.5] text-[#fff9ee] italic">
                    Autonomy without calibrated hesitation is just a faster way
                    to create cleanup work.
                  </blockquote>
                ) : null}
              </div>
            ))}
          </section>

          <footer
            aria-label="Themes"
            className="mt-10 flex flex-wrap gap-2 border-t border-[#d8c9b4] pt-5">
            {essay.tags.map((tag) => (
              <span
                className="rounded-full border border-[#a64b2a] px-3 py-1.5 font-[var(--font-family-label)] text-[0.72rem] tracking-[0.14em] text-[#a64b2a] uppercase"
                key={tag}>
                {tag}
              </span>
            ))}
          </footer>

          <div className="mt-10">
            <Link
              className="font-[var(--font-family-label)] text-sm tracking-[0.12em] text-[#162747] uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a64b2a]"
              href="/thinking">
              <span aria-hidden="true">&lt;-</span> Back to thinking
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

/**
 * derive a short, scannable table-of-contents entry from each body paragraph
 * by trimming to roughly the first clause; falls back to a paragraph index
 * label when no natural break exists in the first chunk
 * @param paragraphs essay body paragraphs in display order
 * @returns ordered list of toc labels, one per paragraph
 */
function deriveTocItems(paragraphs: readonly string[]): readonly string[] {
  return paragraphs.map((paragraph, index) => {
    const trimmed = paragraph.trim();
    const stopIndex = findFirstStop(trimmed);
    const candidate = stopIndex > 0 ? trimmed.slice(0, stopIndex) : trimmed;

    if (candidate.length === 0) {
      return `Section ${String(index + 1)}`;
    }

    return candidate.length > TOC_MAX_LENGTH
      ? `${candidate.slice(0, TOC_TRUNCATE_LENGTH)}…`
      : candidate;
  });
}

/**
 * locate the index of the first sentence-ending punctuation in a paragraph
 * (period, semicolon, colon) so we can clip a tidy TOC label
 * @param value source paragraph text
 * @returns index of the first stop character, or -1 when none is found
 */
function findFirstStop(value: string): number {
  for (let index = 0; index < value.length; index += 1) {
    const char = value.charAt(index);
    if (char === '.' || char === ';' || char === ':') {
      return index;
    }
  }

  return -1;
}

/**
 * split a title into a leading phrase and an accented final word so the
 * gallery layout can italicize the last word in rust
 * @param title essay title
 * @returns head + accent decomposition (accent may be empty)
 */
function splitTitleAccent(title: string): { head: string; accent: string } {
  const trimmed = title.trim();
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace <= 0) {
    return { head: trimmed, accent: '' };
  }

  return {
    head: trimmed.slice(0, lastSpace),
    accent: trimmed.slice(lastSpace + 1),
  };
}
