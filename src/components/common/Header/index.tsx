import Image from 'next/image';

import favicon from '#public/images/icons/favicon.png';

import { Navigation } from '../Navigation';

import type { FC } from 'react';

interface HeaderProps {
  className?: string;
}

/**
 * header component with logo and navigation
 * @param props component props
 * @param props.className optional className for styling
 * @returns header component
 */
export const Header: FC<HeaderProps> = ({ className }) => (
  <div className={`
    flex items-center justify-between
    ${className ?? ''}
  `}>
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
