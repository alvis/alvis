import Link from 'next/link';

import type { FC } from 'react';

const FOOTER_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/now', label: 'Now' },
  { href: '/work', label: 'Work' },
  { href: '/thinking', label: 'Thinking' },
] as const;

/**
 * global close for every route
 * @returns site identity, navigation, and public profiles
 */
export const Footer: FC = () => (
  <footer
    className="
      site-footer section-transition section-transition-footer relative isolate
      overflow-visible text-(--color-paper-raised)
    ">
    <span aria-hidden="true" className="site-footer-separator-rear" />
    <span aria-hidden="true" className="site-footer-bloom" />
    <div
      className="
        site-shell grid gap-10 border-t border-white/15 py-14
        md:grid-cols-[minmax(0,0.8fr)_minmax(18rem,1fr)] md:items-end md:py-20
      ">
      <div>
        <Link className="site-footer-mark" href="/">
          Alvis Tang
        </Link>
        <p className="mt-3 max-w-md text-xl/8 text-pretty text-(--color-on-ink)">
          Context for AI. Purpose for humans.
        </p>
      </div>

      <p className="site-footer-signoff">
        Persistent enthusiast <em>by choice.</em>
      </p>
    </div>

    <div
      className="
        site-shell grid gap-6 border-t border-white/15 py-6 text-sm
        text-(--color-on-ink)
        md:grid-cols-[1fr_auto] md:items-center
      ">
      <nav aria-label="Footer navigation" className="site-footer-nav">
        {FOOTER_LINKS.map(({ href, label }) => (
          <Link href={href} key={href}>
            {label}
          </Link>
        ))}
      </nav>

      <div
        className="
          flex flex-col gap-3
          md:items-end
        ">
        <p>London · Building in public</p>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <a
            href="https://x.com/alvvst"
            rel="noopener noreferrer"
            target="_blank">
            X / @alvvst <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/alvis"
            rel="noopener noreferrer"
            target="_blank">
            GitHub / alvis <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  </footer>
);
