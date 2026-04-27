import Image from 'next/image';
import Link from 'next/link';

import favicon from '#public/images/icons/favicon.png';

import { Navigation } from '../Navigation';

import type { ComponentPropsWithoutRef, FC } from 'react';

/**
 * props accepted by `Header`
 *
 * extends the native `<div>` element props so callers can pass any
 * div-compatible attribute (id, data-*, aria-*, role, etc.) without us
 * having to enumerate them here
 */
export type HeaderProps = ComponentPropsWithoutRef<'div'>;

/**
 * centered masthead header: emblem + wordmark at true center, primary
 * navigation split either side on desktop, drawer trigger on smaller screens
 * @param props component props
 * @param props.className optional extra classes appended to the rendered shell element
 * @returns rendered masthead row
 */
export const Header: FC<HeaderProps> = ({ className, ...rest }) => (
  <div
    className={`
      site-shell flex min-h-22 items-center
      ${className ?? ''}
    `}
    {...rest}>
    <Navigation
      brand={
        <Link
          aria-label="Alvis Tang home"
          className="
            flex min-h-11 items-center gap-3 text-(--color-ink)
            transition-colors
            hover:text-(--color-accent)
          "
          href="/">
          <Image
            priority
            alt="Alvis Tang logo"
            className="
              drop-shadow-[0_10px_18px_rgba(33,63,134,0.16)]
              transition-transform duration-300
              hover:scale-105 hover:rotate-[-4deg]
            "
            height={44}
            src={favicon}
            width={44}
          />
          <span
            className="
              hidden font-serif text-3xl tracking-[0.18em]
              sm:inline
            ">
            ALVIS
          </span>
        </Link>
      }
    />
  </div>
);
