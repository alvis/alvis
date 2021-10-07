/*
 *                            *** MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 *
 * @summary   The header of the landing page
 *
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';

import type { FC } from 'react';

/**
 * the main landing page
 * @inheritdoc
 * @returns a component holding the landing page
 */
export const Intro: FC = ({ children }) => (
  <header className="container flex flex-col py-4 px-6 mx-auto min-h-screen">
    <div className="flex justify-between items-center mt-4">
      <div>
        <a
          className="flex items-center text-gray-800 hover:text-indigo-600"
          href="#122">
          <StaticImage
            alt="logo"
            height={64}
            imgClassName="filter grayscale hover:grayscale-0"
            layout="fixed"
            placeholder="tracedSVG"
            src="../../images/favicon.png"
            width={64}
          />
        </a>
      </div>
      <div className="flex items-center -mx-2">
        <a
          className=" flex items-center mx-2 text-gray-800 hover:text-indigo-600"
          href="#">
          Alvis Tang
        </a>

        <a
          className="flex items-center mx-2 text-gray-800 hover:text-indigo-600"
          href="https://github.com/alvis">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
      </div>
    </div>

    <div className="flex flex-col flex-grow justify-center my-8 md:my-0 mr-0 md:mr-72 align-start">
      <p className="max-w-2xl text-left">{children}</p>
    </div>
    <div className="md:absolute right-2 bottom-2 max-w-md">
      <StaticImage
        alt="me"
        imgClassName="filter grayscale-0 hover:sepia transition w-min"
        placeholder="tracedSVG"
        src="../../images/me-philosophical.png"
      />
    </div>
  </header>
);
