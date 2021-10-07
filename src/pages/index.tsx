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
    <Intro>
      There are many ways of finding your vocation in life. Some people go
      through a series of jobs, feeling completely lost and directionless until
      one day they have an epiphany and know what their destiny is. Other people
      follow their family into the same profession; if they're lucky it's their
      passion too, but sometimes it's just a means for survival or stability.
      And then there are those who get so stuck on one thing that they can't see
      any other lights at the end of the tunnel - these clients we call
      'life-long learners'. But when you really want something for yourself, to
      be able to do whatever you feel like doing without limitations or
      obligations, how do you know which way to turn?
    </Intro>
  </Landing>
);

export default Entry;
