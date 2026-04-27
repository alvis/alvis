import Image from 'next/image';
import Link from 'next/link';

import { Header } from '#components';

import me from '#public/images/profile/me-philosophical.png';

import type { FC, PropsWithChildren } from 'react';

/**
 * landing page intro section with profile and bio
 * @param props component props
 * @param props.children bio content
 */
export const Intro: FC<PropsWithChildren> = ({ children }) => (
  <header
    className={`relative isolate overflow-visible bg-[#f7f1e6] text-[#162747]`}
    id="home">
    <div className="watercolor-paper absolute top-0 right-0 bottom-[-12rem] left-0 -z-30" />
    <div
      aria-hidden="true"
      className="math-lines absolute top-0 right-0 bottom-[-12rem] left-0 -z-10"
    />

    <a className="skip-link" href="#main-content">
      Skip to content
    </a>

    <div className="grid grid-rows-[auto_1fr] md:min-h-[min(680px,82dvh)]">
      <Header />

      <div className={`site-shell grid items-end py-8 md:py-12`}>
        <div
          className={`grid gap-6 pb-7 md:gap-8 md:pb-0 lg:grid-cols-[minmax(0,1fr)_minmax(300px,420px)] lg:items-end`}>
          <div className={`max-w-2xl pb-0 md:pb-12 lg:pb-18`}>
            <p className="eyebrow mb-6">
              AI founder / mathematician / product thinker
            </p>

            <h1 className="max-w-2xl text-[2.1rem] leading-[1.04] font-medium text-balance text-[#162747] sm:text-5xl lg:text-6xl">
              I build systems that help ideas become real.
            </h1>

            <p
              className={`mt-5 max-w-xl text-lg leading-7 text-[#162747] sm:text-xl sm:leading-8 lg:text-xl lg:leading-8`}>
              {children}
            </p>

            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-4">
              <Link className="ink-link text-lg" href="/work">
                <span aria-hidden="true">-&gt;</span>
                See what I am building
              </Link>
              <Link className="ink-link text-lg" href="/about">
                <span aria-hidden="true">-&gt;</span>
                More about me
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[310px] self-end sm:max-w-[380px] lg:max-w-none">
            <Image
              priority
              alt="Watercolor portrait of Alvis reading and thinking"
              className={`portrait-image reveal-image relative z-10 h-auto w-full drop-shadow-[0_30px_50px_rgba(30,38,58,0.18)] transition-all duration-300`}
              height={600}
              sizes="(max-width: 768px) 90vw, 440px"
              src={me}
              width={400}
            />
          </div>
        </div>
      </div>
    </div>
  </header>
);
