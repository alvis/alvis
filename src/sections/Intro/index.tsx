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
  <header className="container mx-auto flex min-safe-h-screen flex-col px-6">
    <Header />

    <div
      className={`
        my-8 mr-0 flex grow flex-col justify-center
        md:my-0 md:mr-72
      `}>
      <h1 className="my-4 max-w-2xl text-left text-3xl">
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
        mr-16 text-lg
        lg:text-xl
      `}>{children}</p>
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
