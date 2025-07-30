import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import type { FC } from 'react';

/**
 * navigation component with name and social links
 * @returns navigation component
 */
export const Navigation: FC = () => (
  <div className="-mx-2 flex items-center">
    <a
      className={`
        mx-2 flex items-center text-gray-800 transition-colors duration-200
        hover:text-indigo-600
      `}
      href="#home">
      Alvis Tang
    </a>

    <a
      className={`
        mx-2 flex items-center text-gray-800 transition-colors duration-200
        hover:text-indigo-600
      `}
      href="https://github.com/alvis"
      rel="noopener noreferrer"
      target="_blank">
      <FontAwesomeIcon icon={faGithub} size="lg" />
    </a>
  </div>
);
