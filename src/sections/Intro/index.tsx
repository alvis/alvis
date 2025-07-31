import Image from 'next/image';

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
    className={`container mx-auto grid min-h-dvh grid-rows-[auto_1fr] px-6`}>
    <Header className="pt-4" />

    <div className={`
      grid content-center py-8
      md:py-0
    `}>
      <div className={`
        max-w-2xl
        md:mr-72
      `}>
        <h1 className="mb-4 text-3xl">
          <span>👋 Hi, I&apos;m </span>
          <span
            className={`
              font-black underline decoration-indigo-600 decoration-wavy
              decoration-2 underline-offset-4
            `}>
            Alvis
          </span>
        </h1>
        <p className={`
          text-lg
          lg:text-xl
        `}>{children}</p>
      </div>
    </div>

    <div className={`
      right-2 bottom-2 mb-2 max-w-md
      md:absolute
    `}>
      <Image
        alt="Alvis Tang - curious techy turned maths PhD turned entrepreneur"
        className={`
          reveal-image h-auto w-full grayscale-0 transition-all duration-300
        `}
        height={600}
        placeholder="blur"
        sizes="(max-width: 768px) 100vw, 400px"
        src={me}
        width={400}
      />
    </div>
  </header>
);
