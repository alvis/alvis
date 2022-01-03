/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The main landing page
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { graphql } from 'gatsby';
import React from 'react';
import { Helmet } from 'react-helmet';

import { Intro } from '#sections';
import { Landing } from '#layouts';

import type { PageProps } from 'gatsby';
import type { FC } from 'react';

import type { IndexPageQuery } from '~graphql';

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
    <Helmet
      bodyAttributes={{
        class: 'antialiased bg-body text-body font-body',
      }}>
      <title>{data.site?.siteMetadata?.title ?? 'Default Title'}</title>
    </Helmet>
    <Intro>a curious techy turned maths PhD turned entrepreneur</Intro>
  </Landing>
);

export default Entry;
