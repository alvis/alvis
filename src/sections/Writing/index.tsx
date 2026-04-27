/* eslint-disable max-lines-per-function -- repeated essay markup is clearer inline */

import Image from 'next/image';
import Link from 'next/link';

import { essays, getAssetKey } from '#content';

import type { FC } from 'react';

const FEATURED_ESSAY_COUNT = 3;

/** pre-sized field-note webp per featured essay (source art is 2MB+ full-size) */
const thumbBySlug: Record<string, string> = {
  'presetter-v9-configuration-with-a-memory':
    '/images/blog/thumbs/presetter-memory-thumb.webp',
  'on-the-context-harness': '/images/blog/thumbs/context-harness-thumb.webp',
  'a-harness-in-eighty-lines':
    '/images/blog/thumbs/harness-eighty-lines-thumb.webp',
};

const BookIcon: FC = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 28 28">
    <path
      d="M5.5 6.5c3.1-.6 5.6.1 8.5 2.1v14.2c-2.9-2-5.4-2.7-8.5-2.1zM22.5 6.5c-3.1-.6-5.6.1-8.5 2.1v14.2c2.9-2 5.4-2.7 8.5-2.1z"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M8 10.5c1.4 0 2.4.3 3.7 1M20 10.5c-1.4 0-2.4.3-3.7 1M8 14c1.4 0 2.4.3 3.7 1M20 14c-1.4 0-2.4.3-3.7 1"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.2"
    />
  </svg>
);

/**
 * writing/blog preview cards
 * @returns section with article previews
 */
export const Writing: FC = () => (
  <section
    className="
      section-transition section-transition-paper relative isolate
      overflow-visible bg-(--color-paper) py-20 text-(--color-ink)
      sm:py-28
    "
    id="writing">
    <div className="site-shell">
      <div
        className="
          mb-8 grid gap-5 border-b border-(--color-rule) pb-8
          md:grid-cols-[0.75fr_1fr] md:items-end
        ">
        <div>
          <p className="label-caps mb-3 text-(--color-accent)">
            Thinking in public
          </p>
          <h2
            className="
              text-5xl leading-none font-medium
              sm:text-7xl
            ">
            Ideas are part of the work.
          </h2>
        </div>
        <p
          className="
            max-w-lg text-xl/8 text-pretty text-(--color-ink-soft)
            md:justify-self-end
          ">
          Notes on agents, context, tools, and the human judgment that makes any
          of them worth building.
        </p>
        <Link
          aria-label="View all writing"
          className="
            flex min-h-11 items-center text-(--color-ink) transition-colors
            hover:text-(--color-accent)
            sm:hidden
            [&>svg]:size-8
          "
          href="/thinking">
          <BookIcon />
        </Link>
      </div>

      <div>
        {essays.slice(0, FEATURED_ESSAY_COUNT).map((post, index) => (
          <article
            className="
              group grid gap-5 border-b border-(--color-rule) py-8
              md:grid-cols-[4rem_12rem_minmax(0,1fr)_auto] md:items-center
            "
            key={post.title}>
            <p
              className="
                label-caps hidden text-(--color-accent)
                md:block
              ">
              0{index + 1}
            </p>
            <Link
              aria-label={`Read ${post.title}`}
              className="field-note-thumb group/thumb"
              data-asset-key={getAssetKey(thumbBySlug[post.slug] ?? post.image)}
              data-asset-kind="blog/thumbs"
              href={`/thinking/${post.slug}`}>
              <Image
                fill
                alt=""
                className="
                  object-cover
                  motion-safe:transition-transform motion-safe:duration-300
                  motion-safe:group-hover/thumb:scale-[1.03]
                "
                sizes="(max-width: 768px) 92vw, 200px"
                src={thumbBySlug[post.slug] ?? post.image}
              />
              <span aria-hidden="true" className="field-note-cap">
                Field note
              </span>
            </Link>

            <div className="max-w-2xl">
              <time className="label-caps text-(--color-accent)">
                {post.date} / {post.readingTime}
              </time>
              <h3
                className="
                  mt-2 max-w-xl text-3xl leading-[1.05] font-medium text-balance
                  text-(--color-ink)
                  sm:text-4xl
                ">
                <Link
                  className="
                    inline-flex min-h-11 items-center transition-colors
                    hover:text-(--color-accent)
                  "
                  href={`/thinking/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p
                className="
                  mt-3 max-w-2xl text-lg/7 text-pretty text-(--color-ink-soft)
                ">
                {post.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                {post.tags.map((category) => (
                  <span
                    className="label-caps text-(--color-mute-strong)"
                    key={category}>
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <Link
              aria-label={`Read ${post.title}`}
              className="
                hidden size-11 items-center justify-center text-4xl leading-none
                text-(--color-ink) transition-[color,transform] duration-200
                group-hover:translate-x-1 group-hover:text-(--color-accent)
                md:flex
              "
              href={`/thinking/${post.slug}`}>
              →
            </Link>
          </article>
        ))}
      </div>

      <Link className="ink-link mt-8 text-lg" href="/thinking">
        <span aria-hidden="true">→</span>
        Open the full notebook
      </Link>
    </div>
  </section>
);

/* eslint-enable max-lines-per-function */
