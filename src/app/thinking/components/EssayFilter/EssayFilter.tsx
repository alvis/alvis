/* eslint-disable max-lines-per-function -- repeated essay markup is clearer inline */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { getAssetKey } from '#content';

import type { FC } from 'react';

import type { Essay } from '#content';

/**
 * derives the thumbnail path for a pre-sized field-note webp (source art is 100K–2.2MB)
 * @param image lead-art path from the essay entry
 * @returns path of the matching 600px thumb
 */
const getThumbPath = (image: string): string =>
  image.replace(
    /^\/images\/blog\/(.+)\.\w+$/,
    '/images/blog/thumbs/$1-thumb.webp',
  );

/** props accepted by `EssayFilter` */
export type EssayFilterProps = {
  /** essays to render and filter */
  essays: readonly Essay[];
};

/**
 * filters essays on the client side with accessible category buttons
 * @param props component props
 * @param props.essays essays to render
 * @returns filterable essay list
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
        role="group">
        {categories.map((category) => (
          <button
            aria-pressed={activeCategory === category}
            className={`
              label-caps min-h-11 border px-4 py-2 transition
              ${
                activeCategory === category
                  ? `
                    border-(--color-accent) bg-(--color-accent)
                    text-(--color-paper-raised)
                  `
                  : `
                    border-(--color-rule) bg-(--color-paper-raised)/72
                    text-(--color-ink)
                    hover:border-(--color-accent) hover:text-(--color-accent)
                  `
              }
            `}
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}>
            {category}
          </button>
        ))}
      </div>

      <div
        className="
          divide-y divide-(--color-rule) border-y border-(--color-rule)
        ">
        {filteredEssays.map((essay) => (
          <article
            className="
              group grid gap-5 py-7
              md:grid-cols-[minmax(180px,0.34fr)_minmax(0,1fr)_auto]
              md:items-center
            "
            key={essay.slug}>
            <Link
              aria-label={`Read ${essay.title}`}
              className="field-note-thumb group/thumb"
              data-asset-key={getAssetKey(getThumbPath(essay.image))}
              data-asset-kind="blog/thumbs"
              href={`/thinking/${essay.slug}`}>
              <Image
                fill
                alt=""
                className="
                  object-cover
                  motion-safe:transition-transform motion-safe:duration-300
                  motion-safe:group-hover/thumb:scale-[1.03]
                "
                sizes="(max-width: 768px) 92vw, 300px"
                src={getThumbPath(essay.image)}
              />
              <span aria-hidden="true" className="field-note-cap">
                Field note
              </span>
            </Link>

            <div>
              <p className="label-caps text-(--color-accent)">
                {essay.date} / {essay.readingTime} / {essay.category}
              </p>
              <h2
                className="
                  mt-2 max-w-2xl text-3xl leading-[1.05] font-medium
                  text-balance text-(--color-ink)
                  sm:text-4xl
                ">
                <Link
                  className="
                    inline-flex min-h-11 items-center
                    hover:text-(--color-accent)
                  "
                  href={`/thinking/${essay.slug}`}>
                  {essay.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-3xl text-lg/7 text-(--color-ink)">
                {essay.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                {essay.tags.map((tag) => (
                  <span
                    className="label-caps text-(--color-mute-strong)"
                    key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <Link
              aria-label={`Read ${essay.title}`}
              className="
                hidden text-4xl leading-none text-(--color-ink) transition
                duration-200
                group-hover:translate-x-1 group-hover:text-(--color-accent)
                md:block
              "
              href={`/thinking/${essay.slug}`}>
              →
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};

/* eslint-enable max-lines-per-function */
