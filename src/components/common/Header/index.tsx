import Image from 'next/image';
import Link from 'next/link';

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
  <div
    className={`site-shell flex min-h-22 items-center justify-between gap-5 ${className ?? ''} `}>
    <div className="flex items-center gap-3">
      <Link
        aria-label="Alvis Tang home"
        className={`flex size-12 items-center justify-center text-[#162747] transition-transform duration-200 hover:scale-105 hover:text-[#466a9f]`}
        href="/">
        <Image
          priority
          alt="Alvis Tang logo"
          className={`drop-shadow-[0_10px_18px_rgba(33,63,134,0.16)] transition-all duration-300 hover:rotate-[-4deg]`}
          height={48}
          src={favicon}
          width={48}
        />
      </Link>
      <Link
        aria-label="Alvis Tang home"
        className="hidden font-serif text-3xl tracking-[0.18em] text-[#162747] transition-colors hover:text-[#a64b2a] sm:block"
        href="/">
        ALVIS
      </Link>
    </div>
    <Navigation />
  </div>
);
