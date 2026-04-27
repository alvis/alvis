import { Navigation } from './Navigation';

import type { Meta, StoryObj } from '@storybook/react-vite';

// type Story is co-located with the meta below per Storybook idiom; the
// meta object is the canonical anchor and `StoryObj<typeof meta>` derives
// from it, so the type alias lives next to its source of truth.

const meta = {
  title: 'Layout/Navigation',
  component: Navigation,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'optional extra classes appended to the rendered nav',
    },
  },
} satisfies Meta<typeof Navigation>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * default navigation — desktop layout shows split masthead links and social
 * icons (the mobile drawer trigger is hidden above the `lg` breakpoint)
 */
export const Default: Story = {
  render: (args) => (
    <div className="p-6">
      <Navigation {...args} />
    </div>
  ),
};

/**
 * mobile drawer trigger — render inside a narrow shell so the hamburger
 * trigger appears in place of the inline desktop links. Toggle the drawer
 * via the menu button
 */
export const DrawerOpen: Story = {
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
  render: (args) => (
    <div className="max-w-sm p-6">
      <Navigation {...args} />
    </div>
  ),
};
