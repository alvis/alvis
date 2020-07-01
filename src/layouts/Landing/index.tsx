/**
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 * @summary   The layout for the landing page
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2020 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import React from 'react';

import type { FC } from 'react';

export const Landing: FC = (props) => (
  <React.StrictMode>{props.children}</React.StrictMode>
);

Landing.displayName = 'Layout';
