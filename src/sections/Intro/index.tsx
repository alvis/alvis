import Image from 'next/image';

import { Header } from '#components';

import me from '#public/images/profile/me-philosophical.webp';

import type { FC } from 'react';

/** landing page intro section with profile and bio */
export const Intro: FC = () => (
  <header
    className="
      mission-hero relative isolate overflow-hidden bg-(--color-paper)
      text-(--color-ink)
    "
    id="home">
    <div aria-hidden="true" className="mission-grain" />
    <div aria-hidden="true" className="mission-watercolor" />

    <div className="grid min-h-[min(940px,100dvh)] grid-rows-[auto_1fr]">
      <Header />

      <div
        className="
          site-shell grid items-center py-8
          md:py-12
        ">
        <div
          className="
            grid gap-10
            lg:grid-cols-[minmax(0,1.08fr)_minmax(21rem,0.72fr)] lg:items-center
            lg:gap-6
          ">
          <div
            className="
              relative z-10 max-w-196 pb-2
              lg:py-12
            ">
            <p className="eyebrow mb-7">Alvis Tang · AI founder · London</p>

            <h1 className="mission-title text-balance">
              Context for AI.
              <span>Purpose for humans.</span>
            </h1>

            <p
              className="
                mt-7 max-w-156 text-xl/8 text-pretty text-(--color-ink-soft)
                sm:text-2xl/9
              ">
              I build systems where agents remember what matters, tools explain
              themselves, and people recover the purpose automation too often
              forgets.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a
                className="
                  mission-primary-link w-full
                  sm:w-auto
                "
                href="https://x.com/alvvst"
                rel="noopener noreferrer"
                target="_blank">
                Follow the build <span aria-hidden="true">↗</span>
              </a>
              <a
                className="
                  mission-secondary-link w-full
                  sm:w-auto
                "
                href="https://github.com/alvis"
                rel="noopener noreferrer"
                target="_blank">
                Explore the code <span aria-hidden="true">↗</span>
              </a>
            </div>

            <p className="mission-proof mt-10">
              Math PhD by chance <span aria-hidden="true">·</span> persistent
              enthusiast by choice
            </p>
          </div>

          <figure
            className="
              context-portrait relative mx-auto w-full max-w-124 self-end
            ">
            <div className="portrait-plate">
              <Image
                priority
                alt="Watercolor portrait of Alvis reading and thinking"
                className="
                  portrait-image reveal-image relative z-10 h-auto w-full
                  drop-shadow-[0_35px_55px_rgba(22,39,71,0.22)]
                "
                sizes="(max-width: 768px) 92vw, 500px"
                src={me}
              />
              <span aria-hidden="true" className="portrait-frame" />
              <span
                aria-hidden="true"
                className="portrait-reg portrait-reg--tl"
              />
              <span
                aria-hidden="true"
                className="portrait-reg portrait-reg--tr"
              />
              <span
                aria-hidden="true"
                className="portrait-reg portrait-reg--bl"
              />
              <span
                aria-hidden="true"
                className="portrait-reg portrait-reg--br"
              />
            </div>
            <figcaption className="mission-caption">
              <q>
                The Analytical Engine has no pretensions whatever to originate
                anything.
              </q>
              <cite>Ada Lovelace, 1843</cite>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </header>
);
