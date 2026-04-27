'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { useCallback, useEffect, useId, useRef, useState } from 'react';

import { MenuIcon } from './MenuIcon';
import { Almanac } from './variants/Almanac';
import { EnvelopeIcon, navLinks, socialLinks } from './variants/types';

import type { FC } from 'react';

/**
 * navigation component with mobile disclosure and social links
 * @returns navigation component
 */
export const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const wasOpenRef = useRef(false);
  const reducedMotion = useReducedMotion();

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
      className="relative flex min-h-16 items-center gap-5 text-sm text-[#162747] md:gap-8">
      <div className="hidden items-center gap-5 md:flex lg:gap-6">
        {navLinks.map((link) => (
          <Link
            className="relative min-h-12 px-1 pt-4 transition-colors duration-200 after:absolute after:right-0 after:bottom-2 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-[#a64b2a] after:transition-transform after:content-[''] hover:text-[#a64b2a] hover:after:scale-x-100"
            href={link.href}
            key={link.href}>
            {link.label}
          </Link>
        ))}
      </div>

      <div className="hidden items-center gap-2 md:flex">
        {socialLinks.map((link) => (
          <a
            aria-label={link.label}
            className="flex size-11 items-center justify-center text-[#162747] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#a64b2a]"
            href={link.href}
            key={link.label}
            rel="noopener noreferrer"
            target="_blank">
            <FontAwesomeIcon icon={link.icon} />
          </a>
        ))}
        <a
          aria-label="Email Alvis Tang"
          className="flex size-11 items-center justify-center text-[#162747] transition-all duration-200 hover:-translate-y-0.5 hover:text-[#a64b2a] [&>svg]:size-5"
          href="mailto:alvis@hilbert.space">
          <EnvelopeIcon />
        </a>
      </div>

      <div className="md:hidden">
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="flex size-11 items-center justify-center text-[#162747] transition hover:text-[#a64b2a] [&>svg]:size-5"
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}>
          <MenuIcon open={isOpen} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <Almanac
            links={navLinks}
            open={isOpen}
            panelId={panelId}
            reducedMotion={Boolean(reducedMotion)}
            socials={socialLinks}
            onClose={handleClose}
          />
        ) : null}
      </AnimatePresence>
    </nav>
  );
};
