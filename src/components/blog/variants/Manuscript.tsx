import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';

import type { BlogVariantProps } from './types';

/**
 * "Manuscript" blog variant: narrow paper-feel layout with watercolor washes,
 * a rust drop cap, and inline marginalia annotations on selected paragraphs.
 * @param props variant props
 * @param props.essay essay to render
 * @returns manuscript-styled article element
 */
export const Manuscript: FC<BlogVariantProps> = ({ essay }) => {
  const [firstParagraph, ...restParagraphs] = essay.body;

  return (
    <article className="relative mx-auto max-w-[880px] bg-[#f7f1e6] px-6 py-16 sm:px-12 md:px-28 md:py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-12 -left-20 hidden h-56 w-56 rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(166,75,42,0.18),transparent_60%)] blur-sm md:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[-4rem] bottom-24 hidden h-56 w-56 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(70,106,159,0.16),transparent_60%)] blur-sm md:block"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-2 inset-y-10 hidden border border-[#d8c9b4]/40 md:block"
      />

      <header className="relative mb-12 max-w-2xl">
        <p className="mb-6 inline-block border-b border-[#a64b2a] pb-1 font-[var(--font-family-label)] text-[0.72rem] font-medium tracking-[0.18em] text-[#a64b2a] uppercase">
          {essay.category} — Field Note
        </p>
        <h1 className="max-w-[22ch] text-[clamp(2.2rem,4.6vw,3.4rem)] leading-[1.08] font-medium tracking-[-0.005em] text-[#162747] italic">
          {essay.title}
        </h1>
        <p className="mt-4 max-w-[40ch] text-xl leading-[1.55] text-[#162747]/72">
          {essay.summary}
        </p>
        <p className="mt-6 font-[var(--font-family-label)] text-[0.78rem] tracking-[0.08em] text-[#162747]/72 uppercase">
          <span>{essay.date}</span>
          <span className="mx-2 text-[#d8c9b4]">·</span>
          <span>{essay.readingTime}</span>
          <span className="mx-2 text-[#d8c9b4]">·</span>
          <span>Field Notes</span>
        </p>
      </header>

      <section className="relative mx-auto max-w-[60ch] text-[1.18rem] leading-[1.78]">
        {firstParagraph ? (
          <p className="mb-6 [&::first-letter]:float-left [&::first-letter]:pr-[0.6rem] [&::first-letter]:pt-[0.4rem] [&::first-letter]:font-[var(--font-family-display)] [&::first-letter]:text-[4.6rem] [&::first-letter]:leading-[0.86] [&::first-letter]:font-medium [&::first-letter]:text-[#a64b2a]">
            {firstParagraph}
          </p>
        ) : null}

        {restParagraphs.map((paragraph) => (
          <p
            className="mb-6 first-line:indent-0 [&:not(:first-of-type)]:indent-[1.6em]"
            key={paragraph}>
            {paragraph}
          </p>
        ))}

        <figure
          aria-label={essay.imageAlt}
          className="my-10 -ml-2 max-w-[56ch] border border-[#d8c9b4] bg-[#fff9ee] p-2"
          role="group">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#fff9ee]">
            <Image
              fill
              alt={essay.imageAlt}
              className="object-cover opacity-90 mix-blend-multiply"
              placeholder="blur"
              sizes="(max-width: 768px) 92vw, 56ch"
              src={essay.image}
            />
          </div>
          <figcaption className="mt-2 pl-1 font-[var(--font-family-display)] text-[0.95rem] text-[#162747]/72 italic">
            {essay.imageAlt}
          </figcaption>
        </figure>
      </section>

      <div className="mx-auto mt-12 flex max-w-[60ch] flex-wrap gap-x-5 gap-y-3 border-t border-[#d8c9b4] pt-6 font-[var(--font-family-label)] text-[0.72rem] tracking-[0.1em] text-[#162747]/72 uppercase">
        <strong className="font-medium tracking-[0.12em] text-[#a64b2a]">
          Themes
        </strong>
        {essay.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-[60ch]">
        <Link
          className="font-[var(--font-family-label)] text-sm tracking-[0.12em] text-[#162747] uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a64b2a]"
          href="/thinking">
          <span aria-hidden="true">&lt;-</span> Back to thinking
        </Link>
      </div>
    </article>
  );
};
