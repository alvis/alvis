import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';

import type { BlogVariantProps } from './types';

/**
 * first paragraph index after which a diamond section break appears in the
 * longform layout (zero-based position in `essay.body`)
 */
const FIRST_BREAK_INDEX = 1;

/**
 * second paragraph index after which a diamond section break appears in the
 * longform layout (zero-based position in `essay.body`)
 */
const SECOND_BREAK_INDEX = 3;

/**
 * paragraph indices after which a diamond section break should appear in the
 * longform layout
 */
const SECTION_BREAK_INDICES: readonly number[] = [
  FIRST_BREAK_INDEX,
  SECOND_BREAK_INDEX,
];

/**
 * "Longform" blog variant: full-bleed hero image, wide-margined editorial
 * body with diamond section breaks and a single column of generous prose.
 * @param props variant props
 * @param props.essay essay to render
 * @returns longform-styled article element
 */
export const Longform: FC<BlogVariantProps> = ({ essay }) => {

  return (
    <article className="bg-[#fff9ee] text-[#162747]">
      <div
        aria-label={essay.imageAlt}
        className="relative h-[clamp(280px,56vh,540px)] w-full overflow-hidden border-b border-[#d8c9b4] bg-[#f7f1e6]"
        role="img">
        <Image
          fill
          priority
          alt=""
          className="object-cover opacity-95 mix-blend-multiply"
          placeholder="blur"
          sizes="100vw"
          src={essay.image}
        />
      </div>

      <header className="mx-auto max-w-[720px] px-6 pt-16 pb-10">
        <p className="mb-5 font-[var(--font-family-label)] text-[0.74rem] font-medium tracking-[0.18em] text-[#a64b2a] uppercase">
          {essay.category} · Field Note · {essay.readingTime} read
        </p>
        <h1 className="mb-5 max-w-[22ch] text-[clamp(2.4rem,5.4vw,3.8rem)] leading-[1.06] font-medium tracking-[-0.01em] text-[#162747]">
          {essay.title}
        </h1>
        <p className="mb-7 max-w-[52ch] text-[1.4rem] leading-[1.5] text-[#162747]/70 italic">
          {essay.summary}
        </p>
        <p className="flex items-center gap-3 font-[var(--font-family-label)] text-[0.78rem] tracking-[0.06em] text-[#162747]/70">
          <span
            aria-hidden="true"
            className="inline-flex size-7 items-center justify-center rounded-full bg-[#a64b2a] font-[var(--font-family-display)] text-[0.95rem] font-medium text-[#fff9ee]">
            A
          </span>
          <span>
            <strong className="font-bold text-[#162747]">Alvis Tang</strong> ·{' '}
            {essay.date}
          </span>
        </p>
      </header>

      <section className="longform-body mx-auto max-w-[680px] px-6 pb-20 text-[1.32rem] leading-[1.78]">
        {essay.body.map((paragraph, index) => (
          <div key={paragraph}>
            <p className="mb-8">{paragraph}</p>
            {SECTION_BREAK_INDICES.includes(index) &&
            index < essay.body.length - 1 ? (
              <hr
                aria-hidden="true"
                className="mx-auto my-12 h-px w-9 border-0 bg-transparent text-center before:tracking-[0.5em] before:text-[#d8c9b4] before:content-['◆_◆_◆']"
              />
            ) : null}
          </div>
        ))}
      </section>

      <footer className="mx-auto flex max-w-[680px] flex-wrap justify-between gap-3 border-t border-[#d8c9b4] px-6 pt-8 pb-16 font-[var(--font-family-label)] text-[0.78rem] text-[#162747]/70">
        <div className="flex flex-wrap">
          {essay.tags.map((tag) => (
            <span
              className="mr-3 tracking-[0.06em] text-[#a64b2a]"
              key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div>Field Notes · {essay.date}</div>
      </footer>

      <div className="mx-auto max-w-[680px] px-6 pb-16">
        <Link
          className="font-[var(--font-family-label)] text-sm tracking-[0.12em] text-[#162747] uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a64b2a]"
          href="/thinking">
          <span aria-hidden="true">&lt;-</span> Back to thinking
        </Link>
      </div>
    </article>
  );
};
