/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Specify the configuration for Gatsby.
 *
 *            See https://www.gatsbyjs.org/docs/gatsby-config
 *            for detailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

/* istanbul ignore file */

import type { GatsbyConfig } from 'gatsby';

export const plugins: GatsbyConfig['plugins'] = ['gatsby-plugin-react-helmet'];

export const siteMetadata: GatsbyConfig['siteMetadata'] = {
  title: `Hi! I'm Alvis`,
};

export const plugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-plugin-graphql-codegen',
    options: {
      fileName: './types/~graphql.ts',
      documentPaths: ['./src/**/*.{ts,tsx}'],
    },
  },
];

export default {
  siteMetadata,
  plugins,
};
