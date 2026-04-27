import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';

import type { BlogVariantProps } from './types';

/**
 * "Broadsheet" blog variant: classical centered headline with a multi-column
 * justified body, hairline rules, and an image strip in the middle of the run.
 * @param props variant props
 * @param props.essay essay to render
 * @returns broadsheet-styled article element
 */
export const Broadsheet: FC<BlogVariantProps> = ({ essay }) => {
  return (
    <div className="mx-auto max-w-[1160px] bg-[#fff9ee] px-6 pt-12 pb-20 sm:px-8">
      <div className="flex items-baseline justify-between border-y border-t-4 border-t-[#162747] border-b-[#162747] py-2 font-[var(--font-family-label)] text-[0.72rem] tracking-[0.18em] text-[#162747] uppercase">
        <span>{essay.category}</span>
        <span className="font-[var(--font-family-display)] text-[1.4rem] tracking-[0.04em] normal-case italic">
          The Field Notes
        </span>
        <span>{essay.date}</span>
      </div>

      <article>
        <header className="mb-10 border-b border-[#d8c9b4] pt-12 pb-8 text-center">
          <p className="mb-6 font-[var(--font-family-label)] text-[0.78rem] font-medium tracking-[0.32em] text-[#a64b2a] uppercase">
            A Dispatch on {essay.category}
          </p>
          <h1 className="mx-auto mb-4 max-w-[18ch] text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[1.02] font-medium tracking-[-0.01em] text-[#162747]">
            {essay.title}
          </h1>
          <p className="mx-auto mb-6 max-w-[56ch] text-[1.25rem] leading-[1.45] text-[#162747]/72 italic">
            {essay.summary}
          </p>
          <p className="font-[var(--font-family-label)] text-[0.72rem] tracking-[0.18em] text-[#162747]/72 uppercase">
            <span>By Alvis Tang</span>
            <span className="mx-2 text-[#d8c9b4]">·</span>
            <span>{essay.category}</span>
            <span className="mx-2 text-[#d8c9b4]">·</span>
            <span>{essay.readingTime} read</span>
          </p>
        </header>

        <section className="broadsheet-columns text-[1.05rem] leading-[1.7] text-[#162747]">
          {essay.body.map((paragraph, index) => (
            <p key={paragraph} {...(index === 0 ? { 'data-lead': true } : {})}>
              {paragraph}
            </p>
          ))}
        </section>

        <figure
          aria-label={essay.imageAlt}
          className="mx-auto my-10 grid items-center gap-8 border-y border-[#d8c9b4] bg-[#f7f1e6] p-6 md:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-[16/10] w-full overflow-hidden border border-[#d8c9b4] bg-[#fff9ee]">
            <Image
              fill
              alt={essay.imageAlt}
              className="object-cover opacity-90 mix-blend-multiply"
              placeholder="blur"
              sizes="(max-width: 900px) 92vw, 60vw"
              src={essay.image}
            />
          </div>
          <figcaption className="font-[var(--font-family-display)] text-[1.02rem] leading-[1.5] text-[#162747]/72 italic">
            <strong className="mb-2 block font-[var(--font-family-label)] text-[0.72rem] font-medium tracking-[0.16em] text-[#a64b2a] not-italic uppercase">
              Plate I.
            </strong>
            {essay.imageAlt}
          </figcaption>
        </figure>

        <div className="mt-12 flex flex-wrap justify-between gap-4 border-t-2 border-[#162747] pt-5 font-[var(--font-family-label)] text-[0.72rem] tracking-[0.14em] text-[#162747] uppercase">
          <span>Filed under · {essay.category}</span>
          <span className="flex gap-4">
            {essay.tags.map((tag) => (
              <span className="relative pl-4 before:absolute before:left-0 before:text-[#a64b2a] before:content-['§']" key={tag}>
                {tag}
              </span>
            ))}
          </span>
          <span>End of dispatch</span>
        </div>

        <div className="mt-10">
          <Link
            className="font-[var(--font-family-label)] text-sm tracking-[0.12em] text-[#162747] uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a64b2a]"
            href="/thinking">
            <span aria-hidden="true">&lt;-</span> Back to thinking
          </Link>
        </div>
      </article>
    </div>
  );
};
