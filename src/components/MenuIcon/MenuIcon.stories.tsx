import { MenuIcon } from './MenuIcon';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC, PropsWithChildren, ReactElement } from 'react';

// type Story is co-located with the meta below per Storybook idiom; the
// meta object is the canonical anchor and `StoryObj<typeof meta>` derives
// from it, so the type alias lives next to its source of truth.

const meta = {
  title: 'Layout/MenuIcon',
  component: MenuIcon,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description:
        'true when the drawer is open (renders the X glyph instead of the hamburger)',
    },
  },
} satisfies Meta<typeof MenuIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * wrap the icon in a sized button-like surface so the centered layout
 * renders the same way the navigation trigger does in the real header
 * @param root0 story frame input
 * @param root0.children icon placed on the navigation-sized surface
 * @returns children inside the centered trigger frame
 */
const IconFrame: FC<PropsWithChildren> = ({ children }): ReactElement => (
  <div className="flex size-12 items-center justify-center text-(--color-ink) [&>svg]:size-5">
    {children}
  </div>
);

/** Closed state — the three-bar hamburger glyph used when the drawer is collapsed. */
export const Closed: Story = {
  args: { open: false },
  render: (args) => (
    <IconFrame>
      <MenuIcon {...args} />
    </IconFrame>
  ),
};

/**
 * Open state — the bars converge into an X glyph used when the drawer is
 * visible. Matches `aria-expanded="true"` on the parent trigger.
 */
export const Open: Story = {
  args: { open: true },
  render: (args) => (
    <IconFrame>
      <MenuIcon {...args} />
    </IconFrame>
  ),
};

/**
 * Hover pseudo-state — used by the navigation trigger's hover treatment
 * (accent ink colour). The `storybook-addon-pseudo-states` addon paints
 * the `:hover` state on the wrapping button.
 */
export const Hover: Story = {
  args: { open: false },
  parameters: { pseudo: { hover: true } },
  render: (args) => (
    <button
      aria-label="Open navigation menu"
      className="flex size-12 items-center justify-center text-(--color-ink) transition hover:text-(--color-accent) [&>svg]:size-5"
      type="button">
      <MenuIcon {...args} />
    </button>
  ),
};

/** Active pseudo-state — pressed appearance for the trigger button. */
export const Active: Story = {
  args: { open: false },
  parameters: { pseudo: { active: true } },
  render: (args) => (
    <button
      aria-label="Open navigation menu"
      className="flex size-12 items-center justify-center text-(--color-ink) transition active:text-(--color-accent) [&>svg]:size-5"
      type="button">
      <MenuIcon {...args} />
    </button>
  ),
};

/**
 * Focus-visible pseudo-state — keyboard focus ring on the trigger
 * button. Important for WCAG 2.1 AA keyboard navigation compliance.
 */
export const Focus: Story = {
  args: { open: false },
  parameters: { pseudo: { focusVisible: true } },
  render: (args) => (
    <button
      aria-label="Open navigation menu"
      className="flex size-12 items-center justify-center text-(--color-ink) transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--color-accent) [&>svg]:size-5"
      type="button">
      <MenuIcon {...args} />
    </button>
  ),
};
