/**
 *                            MIT LICENSE ***
 * -------------------------------------------------------------------------
 * This code may be modified and distributed under the MIT license.
 * See the LICENSE file for details.
 * -------------------------------------------------------------------------
 * @summary   A test for the landing page layout.
 * @author    Alvis HT Tang <alvis@hilbert.space>
 * @license   MIT
 * @copyright Copyright (c) 2021 - All Rights Reserved.
 * -------------------------------------------------------------------------
 */

import { render } from '@testing-library/react';
import React from 'react';

import { Landing } from '.';

describe('Layout component for landing', () => {
  it('should render correctly', () => {
    const { container } = render(<Landing />);

    // const tree = renderer.create(<Layout />).toJSON();
    expect(container).toMatchInlineSnapshot('<div />');
  });
});
