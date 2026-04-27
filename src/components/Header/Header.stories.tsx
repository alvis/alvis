import { Header } from './Header';

import type { Meta, StoryObj } from '@storybook/react-vite';

// type Story is co-located with the meta below per Storybook idiom; the
// meta object is the canonical anchor and `StoryObj<typeof meta>` derives
// from it, so the type alias lives next to its source of truth.

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description:
        'optional extra classes appended to the rendered header shell element',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default header — the canonical marketing-site header with the favicon
 * link, the serif wordmark, and the primary navigation.
 */
export const Default: Story = {};
