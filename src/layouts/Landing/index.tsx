/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 * @summary   The layout for the landing page
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { StrictMode } from 'react';

import type { FC, ReactNode } from 'react';

export const Landing: FC<{ children?: ReactNode }> = ({ children }) => (
  <StrictMode>{children}</StrictMode>
);
