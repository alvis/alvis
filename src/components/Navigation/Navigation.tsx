'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { MenuIcon } from '../MenuIcon';

import { AlmanacDrawer, EnvelopeIcon } from './AlmanacDrawer';
import { isCurrentRoute, navLinks, socialLinks } from './data';

import type { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

/**
 * props accepted by `Navigation`
 *
 * extends the native `<nav>` element props so callers can pass any
 * nav-compatible attribute (id, data-*, role override, …) without us
 * having to enumerate them here
 */
export type NavigationProps = ComponentPropsWithoutRef<'nav'> & {
  /** brand mark rendered at the true center of the masthead */
  brand?: ReactNode;
};

const NAV_ITEM_CLASS =
  "relative inline-flex min-h-12 min-w-10 items-center justify-center px-1 pt-1 transition-colors duration-200 after:absolute after:right-0 after:bottom-2 after:left-0 after:h-px after:origin-left after:bg-(--color-accent) after:transition-transform after:content-['']";

/** number of nav links seated left of the centered brand */
const LEFT_LINK_COUNT = 2;

/**
 * renders one masthead nav link with current-route state
 * @param pathname current browser pathname
 * @param link navigation destination
 * @returns nav link element
 */
const renderNavLink = (
  pathname: string,
  link: (typeof navLinks)[number],
): ReactNode =>
  isCurrentRoute(pathname, link.href) ? (
    <span
      aria-current="page"
      className={`${NAV_ITEM_CLASS} text-(--color-accent) after:scale-x-100`}
      key={link.href}>
      {link.label}
    </span>
  ) : (
    <Link
      className={`${NAV_ITEM_CLASS} after:origin-left after:scale-x-0 hover:text-(--color-accent) hover:after:scale-x-100`}
      href={link.href}
      key={link.href}>
      {link.label}
    </Link>
  );

/**
 * primary site navigation as a centered masthead: brand at true center,
 * nav links split either side on desktop, an almanac drawer (iris-bloom
 * reveal) on smaller screens triggered by an animated hamburger button
 * @param props component props
 * @param props.brand brand mark rendered at the center of the masthead
 * @param props.className optional extra classes appended to the rendered nav element
 * @returns navigation element with mobile disclosure and social links
 */
export const Navigation: FC<NavigationProps> = ({
  brand,
  className,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const pathname = usePathname();

  const handleClose = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      triggerRef.current?.focus();
    }
    wasOpenRef.current = isOpen;
  }, [isOpen]);

  return (
    <nav
      aria-label="Primary navigation"
      className={`relative grid min-h-16 w-full grid-cols-[1fr_auto_1fr] items-center gap-4 text-sm text-(--color-ink) ${className ?? ''}`.trimEnd()}
      {...rest}>
      <div className="col-start-1 hidden items-center justify-end gap-4 lg:flex xl:gap-6">
        {navLinks
          .slice(0, LEFT_LINK_COUNT)
          .map((link) => renderNavLink(pathname, link))}
      </div>

      <div className="col-start-2 flex items-center justify-center">
        {brand}
      </div>

      <div className="col-start-3 flex items-center justify-between">
        <div className="hidden items-center gap-4 lg:flex xl:gap-6">
          {navLinks
            .slice(LEFT_LINK_COUNT)
            .map((link) => renderNavLink(pathname, link))}
        </div>

        <div className="ml-5 hidden items-center gap-0.5 lg:flex">
          {socialLinks.map((link) => (
            <a
              aria-label={link.label}
              className="flex size-9 items-center justify-center text-(--color-ink) transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-(--color-accent) [&>svg]:size-4"
              href={link.href}
              key={link.label}
              rel="noopener noreferrer"
              target="_blank">
              <FontAwesomeIcon icon={link.icon} />
            </a>
          ))}
          <a
            aria-label="Email Alvis Tang"
            className="flex size-9 items-center justify-center text-(--color-ink) transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-(--color-accent) [&>svg]:size-4"
            href="mailto:alvis@hilbert.space">
            <EnvelopeIcon />
          </a>
        </div>

        <div className="ml-auto lg:hidden">
          <button
            aria-controls={panelId}
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="flex size-11 items-center justify-center text-(--color-ink) transition hover:text-(--color-accent) [&>svg]:size-5"
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}>
            <MenuIcon open={isOpen} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <AlmanacDrawer
            links={navLinks}
            open={isOpen}
            panelId={panelId}
            pathname={pathname}
            reducedMotion={Boolean(reducedMotion)}
            socials={socialLinks}
            onCloseAction={handleClose}
          />
        ) : null}
      </AnimatePresence>
    </nav>
  );
};
