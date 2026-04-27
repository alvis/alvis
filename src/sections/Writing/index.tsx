import Image from 'next/image';
import Link from 'next/link';

import { essays } from '#content';

import type { FC } from 'react';

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
    className="relative isolate overflow-visible bg-transparent py-10 text-[#162747] sm:py-14"
    id="writing">
    <div className="site-shell">
      <div className="mb-4 flex items-end justify-between gap-5 pb-4">
        <h2 className="text-4xl leading-none font-medium text-[#162747] sm:text-5xl">
          Writing
        </h2>
        <p className="hidden max-w-52 text-right text-base leading-6 text-[#162747] sm:block">
          Notes on ideas and investigation.
        </p>
        <Link
          aria-label="View all writing"
          className="text-[#162747] transition hover:text-[#a64b2a] sm:hidden [&>svg]:size-8"
          href="/thinking">
          <BookIcon />
        </Link>
      </div>

      <div>
        {essays.map((post) => (
          <article
            className="group grid gap-5 py-7 transition duration-200 md:grid-cols-[minmax(190px,0.42fr)_minmax(0,1fr)_auto] md:items-center"
            key={post.title}>
            <Link
              aria-label={`Read ${post.title}`}
              className="relative h-36 overflow-hidden rounded-[4px] bg-[#eee5d4]/60 md:h-40"
              href={`/thinking/${post.slug}`}>
              <Image
                fill
                alt={post.imageAlt}
                className="h-full w-full object-cover opacity-90 mix-blend-multiply transition duration-300 group-hover:scale-[1.03]"
                placeholder="blur"
                sizes="(max-width: 768px) 92vw, 300px"
                src={post.image}
              />
            </Link>

            <div className="max-w-2xl">
              <time className="label-caps text-[#a64b2a]">
                {post.date} / {post.readingTime}
              </time>
              <h3 className="mt-2 max-w-xl text-3xl leading-[1.05] font-medium text-[#162747] text-balance sm:text-4xl">
                <Link
                  className="hover:text-[#a64b2a]"
                  href={`/thinking/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-2xl text-lg leading-7 text-[#162747]">
                {post.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
                {post.tags.map((category) => (
                  <span className="label-caps text-[#506176]" key={category}>
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <Link
              aria-label={`Read ${post.title}`}
              className="hidden text-4xl leading-none text-[#162747] transition duration-200 group-hover:translate-x-1 group-hover:text-[#a64b2a] md:block"
              href={`/thinking/${post.slug}`}>
              -&gt;
            </Link>
          </article>
        ))}
      </div>

      <Link className="ink-link mt-8 text-lg" href="/thinking">
        <span aria-hidden="true">-&gt;</span>
        Open the full notebook
      </Link>
    </div>
  </section>
);
