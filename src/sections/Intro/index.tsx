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

import type { FC, ReactNode } from 'react';

/**
 * the main landing page
 * @inheritdoc
 * @returns a component holding the landing page
 */
export const Intro: FC<{ children?: ReactNode }> = ({ children }) => (
  <header className="min-safe-h-screen container mx-auto flex flex-col px-6">
    <div className="mt-4 flex items-center justify-between">
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
      <div className="-mx-2 flex items-center">
        <a
          className=" mx-2 flex items-center text-gray-800 hover:text-indigo-600"
          href="#">
          Alvis Tang
        </a>

        <a
          className="mx-2 flex items-center text-gray-800 hover:text-indigo-600"
          href="https://github.com/alvis">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
      </div>
    </div>

    <div className="my-8 mr-0 flex grow flex-col justify-center md:my-0 md:mr-72">
      <h1 className="my-4 max-w-2xl text-left text-3xl">
        <span>👋 Hi, I’m </span>
        <span className="font-black underline decoration-indigo-600 decoration-wavy decoration-2 underline-offset-4">
          Alvis
        </span>
      </h1>
      <p className="mr-16 text-lg lg:text-xl">{children}</p>
    </div>
    <div className="right-2 bottom-2 mb-2 max-w-md md:absolute">
      <StaticImage
        alt="me"
        imgClassName="filter grayscale-0 hover:sepia transition w-min"
        placeholder="tracedSVG"
        src="../../images/me-philosophical.png"
      />
    </div>
  </header>
);
