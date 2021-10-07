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

import env from 'dotenv';

import postcssConfig from './postcss.config';

import type { GatsbyConfig } from 'gatsby';

env.config({
  path: `.env.${process.env.NODE_ENV ?? 'development'}`,
});

export const siteMetadata: GatsbyConfig['siteMetadata'] = {
  title: `Hi! I'm Alvis`,
};

export const plugins: GatsbyConfig['plugins'] = [
  {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: "Hi! I'm Alvis",
      short_name: 'Alvis',
      icon: 'src/images/favicon.png',
    },
  },
  {
    // HACK:
    // As of 2021 September, postcss- loader doesn't support postcss.config.ts
    // as it uses cosmiconfig to load the config file. Therefore, we need to load
    // the plugin lists here.
    resolve: 'gatsby-plugin-postcss',
    options: {
      postCssPlugins: postcssConfig.plugins,
    },
  },
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
