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

import { Landing } from '#layouts';
import { Intro } from '#sections';

import type { PageProps } from 'gatsby';
import type { FC, ReactNode } from 'react';

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

export const Head: FC<PageProps<Queries.IndexPageQuery>> = ({ data }) => (
  <title>{data.site?.siteMetadata?.title ?? 'Default Title'}</title>
);

/**
 * the main landing page
 * @inheritdoc
 * @returns a component holding the landing page
 */
const Entry: FC<{ children?: ReactNode }> = () => (
  <Landing>
    <Intro>a curious techy turned maths PhD turned entrepreneur</Intro>
  </Landing>
);

export default Entry;
