/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   Specify the configuration related to
 *            node generation.
 *
 *            See https://www.gatsbyjs.org/docs/node-apis
 *            for detailed usage
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

/* istanbul ignore file */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import type { GatsbyNode } from 'gatsby';

import type { CompilerOptions } from 'typescript';

// use babel to transpile typescript
export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = async ({
  actions,
}): Promise<void> => {
  // make Gatsby able to use tsx
  actions.setBabelPreset({
    name: '@babel/preset-typescript',
    options: {},
  });

  // make Gatsby able to transform jsx syntax in js files
  actions.setBabelPreset({
    name: '@babel/preset-react',
    options: {},
  });

  // make Gatsby able to use tsx without importing React
  actions.setBabelPreset({
    name: 'babel-preset-gatsby',
    options: {
      reactRuntime: 'automatic',
    },
  });

  // set the browser target
  actions.setBabelPreset({
    name: '@babel/preset-env',
    options: {
      loose: true,
      targets: '> 0.25%, not dead',
    },
  });

  // add module resolution configuration specified in tsconfig
  const path = getTSPathAlias();
  if (path) {
    actions.setBabelPlugin({
      name: 'babel-plugin-module-resolver',
      options: {
        extensions: ['.d.ts', '.ts', '.tsx', '.js', '.jsx'],
        ...path,
      },
    });
  }
};

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  actions,
}) => {
  switch (stage) {
    case 'build-javascript':
      actions.setWebpackConfig({
        plugins: [
          new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: resolve(
              __dirname,
              'webpack-bundle-analyzer-report.html',
            ),
          }),
        ],
      });

      break;
    default:
      break;
  }
};

/**
 * get the path setting for babel-plugin-module-resolver from tsconfig
 * @returns path alias if present
 */
function getTSPathAlias(): {
  root: string;
  alias: Record<string, string>;
} | null {
  const { baseUrl, paths } = getTSCompilerOptions();

  if (paths) {
    const alias = Object.fromEntries(
      Object.entries(paths)
        .filter(([key]) => key !== '*')
        .map(([key, [path]]) => {
          // must start with ./, not just dir
          const prefixedPath = path.startsWith('./') ? path : `./${path}`;

          // replace * as a regular expression replacement
          return convertTSPathToAlias(key, prefixedPath);
        }),
    );

    return { root: baseUrl ?? '.', alias };
  }

  return null;
}

/**
 * map a TS path to a module loader alias
 * @param key mapping key
 * @param path ts path
 * @returns pairs of module loader alias
 */
function convertTSPathToAlias(key: string, path: string): [string, string] {
  return key.endsWith('*')
    ? [`^${key.replace(/\*$/, '(.+)')}`, path.replace(/\*$/, '\\1')]
    : [key, path];
}

/**
 * get compiler options from tsconfig.json
 * @returns compiler options
 */
function getTSCompilerOptions(): CompilerOptions {
  const tsconfig = JSON.parse(
    readFileSync(resolve(__dirname, 'tsconfig.json')).toString(),
  ) as {
    /** the compilerOptions in tsconfig.json */
    compilerOptions?: CompilerOptions;
  };

  return tsconfig.compilerOptions ?? {};
}
