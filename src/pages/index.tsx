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

import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React from 'react';

import { IndexPageQuery } from '~graphql';
import { Landing } from '#layouts';

import type { PageProps } from 'gatsby';
import type { FC } from 'react';

// page query
export const query = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

/**
 * the main landing page
 * @inheritdoc
 * @returns a component holding the landing page
 */
const Entry: FC<PageProps<IndexPageQuery>> = ({ data }) => (
  <Landing>
    <Helmet>
      <title>{data.site?.siteMetadata?.title ?? 'Default Title'}</title>
    </Helmet>
    <p>Hi! I&apos;m Alvis</p>
  </Landing>
);

export default Entry;
