import {
  faGithub,
  faLinkedinIn,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { FC } from 'react';

/**
 * shared shape for a primary navigation link
 */
export interface NavLink {
  href: string;
  label: string;
}

/**
 * shared shape for a social or contact link rendered with a fontawesome icon
 */
export interface SocialLink {
  href: string;
  icon: IconDefinition;
  label: string;
}

/**
 * shared props contract for the drawer component
 */
export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  socials: SocialLink[];
  reducedMotion: boolean;
  panelId: string;
}

export const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/now', label: 'Now' },
  { href: '/work', label: 'Work' },
  { href: '/thinking', label: 'Thinking' },
];

export const socialLinks: SocialLink[] = [
  {
    href: 'https://github.com/alvis',
    icon: faGithub,
    label: 'GitHub profile',
  },
  {
    href: 'https://www.linkedin.com/in/alvistang',
    icon: faLinkedinIn,
    label: 'LinkedIn profile',
  },
  {
    href: 'https://twitter.com/alvishttang',
    icon: faXTwitter,
    label: 'X profile',
  },
];

/**
 * outline envelope icon used in the email contact button
 * @returns svg envelope glyph
 */
export const EnvelopeIcon: FC = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <path
      d="M4.75 6.75h14.5v10.5H4.75z"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
    <path
      d="m5.25 7.25 6.75 5.5 6.75-5.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  </svg>
);
