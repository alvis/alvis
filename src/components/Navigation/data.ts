import {
  faGithub,
  faLinkedinIn,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/** shape for a primary navigation link */
export type NavLink = {
  href: string;
  label: string;
};

/** shape for a social or contact link rendered with a fontawesome icon */
export type SocialLink = {
  href: string;
  icon: IconDefinition;
  label: string;
};

/**
 * Checks whether a navigation destination owns the current route.
 * @param pathname current browser pathname
 * @param href navigation destination
 * @returns whether the destination represents the current page
 */
export const isCurrentRoute = (pathname: string, href: string): boolean =>
  pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

export const navLinks: readonly NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/now', label: 'Now' },
  { href: '/work', label: 'Work' },
  { href: '/thinking', label: 'Thinking' },
];

export const socialLinks: readonly SocialLink[] = [
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
    href: 'https://x.com/alvvst',
    icon: faXTwitter,
    label: 'Follow @alvvst on X',
  },
];
