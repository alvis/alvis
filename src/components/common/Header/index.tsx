import Image from 'next/image';

import favicon from '#public/images/icons/favicon.png';

import { Navigation } from '../Navigation';

import type { FC } from 'react';

/**
 * header component with logo and navigation
 * @returns header component
 */
export const Header: FC = () => (
  <div className="mt-4 flex items-center justify-between">
    <div>
      <a
        className={`
          flex items-center text-gray-800
          hover:text-indigo-600
        `}
        href="#home">
        <Image
          priority
          alt="logo"
          className={`
            animate-[reveal_1.5s_ease-out_0.5s_both] grayscale transition-all
            duration-300
            hover:grayscale-0
          `}
          height={64}
          placeholder="blur"
          src={favicon}
          width={64}
        />
      </a>
    </div>
    <Navigation />
  </div>
);
