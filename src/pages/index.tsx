/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   A hello world example for the landing page.
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { Helmet } from 'react-helmet';
import React from 'react';

import { Landing } from '#layouts';

import type { FC } from 'react';

/**
 * the main landing page
 * @inheritdoc
 * @returns a component holding the landing page
 */
const Entry: FC = () => (
  <Landing>
    <Helmet>
      <title>My chaotic world</title>
    </Helmet>
    <p>Hi! I&apos;m Alvis</p>
  </Landing>
);

export default Entry;
