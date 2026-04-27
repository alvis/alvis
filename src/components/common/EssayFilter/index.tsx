'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import type { FC } from 'react';

import type { Essay } from '#content';

interface EssayFilterProps {
  essays: Essay[];
}

/**
 * client-side essay filter with accessible buttons
 * @param props component props
 * @param props.essays essays to render
 */
export const EssayFilter: FC<EssayFilterProps> = ({ essays }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = useMemo(
    () => [
      'All',
      ...Array.from(new Set(essays.map((essay) => essay.category))),
    ],
    [essays],
  );
  const filteredEssays =
    activeCategory === 'All'
      ? essays
      : essays.filter((essay) => essay.category === activeCategory);

  return (
    <div>
      <div
        aria-label="Essay filters"
        className="mb-8 flex flex-wrap gap-2"
        role="list">
        {categories.map((category) => (
          <button
            aria-pressed={activeCategory === category}
            className={`min-h-11 border px-4 py-2 font-sans text-xs font-medium tracking-[0.08em] uppercase transition ${
              activeCategory === category
                ? 'border-[#a64b2a] bg-[#a64b2a] text-[#fff9ee]'
                : 'border-[#d8c9b4] bg-[#fff9ee]/72 text-[#162747] hover:border-[#a64b2a] hover:text-[#a64b2a]'
            }`}
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      <div className="divide-y divide-[#d8c9b4] border-y border-[#d8c9b4]">
        {filteredEssays.map((essay) => (
          <article
            className="group grid gap-5 py-7 md:grid-cols-[minmax(180px,0.34fr)_minmax(0,1fr)_auto] md:items-center"
            key={essay.slug}>
            <Link
              aria-label={`Read ${essay.title}`}
              className="relative h-36 overflow-hidden rounded-[4px] bg-[#eee5d4]/60 md:h-40"
              href={`/thinking/${essay.slug}`}>
              <Image
                fill
                alt={essay.imageAlt}
                className="h-full w-full object-cover opacity-90 mix-blend-multiply transition duration-300 group-hover:scale-[1.03]"
                placeholder="blur"
                sizes="(max-width: 768px) 92vw, 300px"
                src={essay.image}
              />
            </Link>

            <div>
              <p className="label-caps text-[#a64b2a]">
                {essay.date} / {essay.readingTime} / {essay.category}
              </p>
              <h2 className="mt-2 max-w-2xl text-3xl leading-[1.05] font-medium text-[#162747] text-balance sm:text-4xl">
                <Link
                  className="hover:text-[#a64b2a]"
                  href={`/thinking/${essay.slug}`}>
                  {essay.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-7 text-[#162747]">
                {essay.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                {essay.tags.map((tag) => (
                  <span className="label-caps text-[#506176]" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              aria-label={`Read ${essay.title}`}
              className="hidden text-4xl leading-none text-[#162747] transition duration-200 group-hover:translate-x-1 group-hover:text-[#a64b2a] md:block"
              href={`/thinking/${essay.slug}`}>
              -&gt;
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};
