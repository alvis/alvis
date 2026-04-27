import { AlmanacDrawer } from './AlmanacDrawer';
import { navLinks, socialLinks } from './data';

import type { Meta, StoryObj } from '@storybook/react-vite';

// type Story is co-located with the meta below per Storybook idiom; the
// meta object is the canonical anchor and `StoryObj<typeof meta>` derives
// from it, so the type alias lives next to its source of truth.

const meta = {
  title: 'Layout/AlmanacDrawer',
  component: AlmanacDrawer,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'whether the drawer is currently visible',
    },
    reducedMotion: {
      control: 'boolean',
      description: 'whether the user prefers reduced motion',
    },
    panelId: {
      control: 'text',
      description: 'dom id used by aria-controls on the trigger button',
    },
    pathname: {
      control: 'text',
      description: 'current browser pathname',
    },
    onCloseAction: {
      control: false,
      description: 'handler invoked when the drawer should close',
    },
    links: {
      control: false,
      description: 'primary navigation links rendered inside the drawer',
    },
    socials: {
      control: false,
      description: 'social and contact links rendered in the drawer footer',
    },
  },
  args: {
    panelId: 'almanac-drawer-story',
    pathname: '/',
    reducedMotion: false,
    links: navLinks,
    socials: socialLinks,
    onCloseAction: () => undefined,
  },
} satisfies Meta<typeof AlmanacDrawer>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Closed state — when `open` is false the drawer renders nothing. This
 * story documents that "closed" is a no-paint state owned by the parent
 * navigation component via `<AnimatePresence>`.
 */
export const Closed: Story = {
  args: { open: false },
  render: (args) => (
    <div className="min-h-screen bg-(--color-paper) p-10">
      <p className="font-serif text-2xl text-(--color-ink)">
        Drawer is closed — no overlay painted.
      </p>
      {args.open ? <AlmanacDrawer {...args} /> : null}
    </div>
  ),
};

/**
 * Open state — iris-bloom clip reveal with two stacked sections,
 * numbered links, and a footer row of social icons.
 */
export const Open: Story = {
  args: { open: true },
};
