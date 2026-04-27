import { StrictMode } from 'react';

import { DesignTweaker, Footer } from '#components';

import type { FC, PropsWithChildren } from 'react';

const SITE_GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&family=Caveat:wght@500;600&family=IBM+Plex+Mono:wght@400;500&family=Source+Sans+3:wght@400;500;600&display=swap';

export const Landing: FC<PropsWithChildren> = ({ children }) => (
  <StrictMode>
    <html
      data-asset-set="original"
      data-final-visual="signal"
      data-footer-separator="split-fold"
      data-scroll-behavior="smooth"
      data-section-separator="soft-ridge"
      data-theme="codex"
      lang="en">
      {/* eslint-disable-next-line @next/next/no-head-element -- this root layout owns the document shell */}
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link as="style" href={SITE_GOOGLE_FONTS_URL} rel="preload" />
        <link href={SITE_GOOGLE_FONTS_URL} rel="stylesheet" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <Footer />
        {process.env.NODE_ENV === 'development' && <DesignTweaker />}
      </body>
    </html>
  </StrictMode>
);
