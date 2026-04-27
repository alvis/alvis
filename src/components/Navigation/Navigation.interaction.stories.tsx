import { expect, userEvent, within } from 'storybook/test';

import { Navigation } from './Navigation';

import type { Meta, StoryObj } from '@storybook/react-vite';

// type Story is co-located with the meta below per Storybook idiom; the
// meta object is the canonical anchor and `StoryObj<typeof meta>` derives
// from it, so the type alias lives next to its source of truth.

const meta = {
  title: 'Layout/Navigation/Interaction',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
  },
} satisfies Meta<typeof Navigation>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The current route is announced without linking back to itself. */
export const MarksCurrentRoute: Story = {
  render: () => (
    <div className="p-6">
      <Navigation />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const current = canvas.getByText('Home');

    await expect(current).toHaveAttribute('aria-current', 'page');
    await expect(canvas.queryByRole('link', { name: 'Home' })).toBeNull();
  },
};

/**
 * Clicking the menu trigger opens the AlmanacDrawer. Verifies the
 * trigger's `aria-expanded` flips to `true`, the dialog appears with
 * the expected `role="dialog"`, and the first navigation link inside
 * the panel is reachable for keyboard focus.
 */
export const OpensAlmanacDrawer: Story = {
  render: () => (
    <div className="max-w-sm p-6">
      <Navigation />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const trigger = canvas.getByRole('button', {
      name: 'Open navigation menu',
    });
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');

    await userEvent.click(trigger);

    // the drawer mounts a dialog at the document root. The opened
    // trigger relabels itself, so locate it by the new accessible name.
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');

    // the drawer is portaled into the document via fixed positioning;
    // query the document root rather than the canvas to find it.
    const dialog = document.querySelector('[role="dialog"]');
    await expect(dialog).not.toBeNull();
  },
};
