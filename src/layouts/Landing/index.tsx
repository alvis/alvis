import { StrictMode } from 'react';

import type { FC, PropsWithChildren } from 'react';

export const Landing: FC<PropsWithChildren> = ({ children }) => (
  <StrictMode>
    <html lang="en">
      <body>{children}</body>
    </html>
  </StrictMode>
);
