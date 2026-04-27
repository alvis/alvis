import { expect, userEvent, within } from 'storybook/test';

import { essays } from '#content';

import { EssayFilter } from './EssayFilter';

import type { Meta, StoryObj } from '@storybook/react-vite';

// type Story is co-located with the meta below per Storybook idiom; the
// meta object is the canonical anchor and `StoryObj<typeof meta>` derives
// from it, so the type alias lives next to its source of truth.

const meta = {
  title: 'Filters/EssayFilter',
  component: EssayFilter,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    essays: {
      control: false,
      description: 'essays to render and filter by category',
    },
  },
} satisfies Meta<typeof EssayFilter>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default render — full essay list with the "All" category active. The
 * category chip row sits above a divided essay list with cover images,
 * dates, summaries, and tag rows.
 */
export const Default: Story = {
  args: { essays },
  render: (args) => (
    <div className="bg-(--color-paper) p-10">
      <EssayFilter {...args} />
    </div>
  ),
};

/**
 * With selection — passing a subset that documents what an active
 * category narrowing looks like at render time. The default selected
 * chip is "All", and category state lives in the component, so this
 * story documents the visual rhythm with fewer cards.
 */
export const WithSelection: Story = {
  args: {
    essays: essays.filter((essay) => essay.category === 'Systems'),
  },
  render: (args) => (
    <div className="bg-(--color-paper) p-10">
      <EssayFilter {...args} />
    </div>
  ),
};

/**
 * No results — an empty essay list. The category row collapses to just
 * "All" and the divider row paints two hairlines with no content
 * between them.
 */
export const NoResults: Story = {
  args: { essays: [] },
  render: (args) => (
    <div className="bg-(--color-paper) p-10">
      <EssayFilter {...args} />
    </div>
  ),
};

/**
 * Selecting a category chip narrows the essay list to entries matching
 * the chosen category. Verifies the toggle behaviour, the
 * `aria-pressed` state, and that the resulting articles count matches
 * the filtered data.
 */
export const NarrowsByCategory: Story = {
  args: { essays },
  render: (args) => (
    <div className="bg-(--color-paper) p-10">
      <EssayFilter {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // pick a category that actually narrows the list (i.e. has fewer
    // entries than the full set). Systems shows up multiple times so
    // this still exercises the rendering pipeline meaningfully.
    const category = 'Systems';
    const expected = essays.filter((essay) => essay.category === category);

    const chip = canvas.getByRole('button', { name: category });
    await expect(chip).toHaveAttribute('aria-pressed', 'false');

    await userEvent.click(chip);

    await expect(chip).toHaveAttribute('aria-pressed', 'true');

    // each rendered essay carries an h2 title — checking those gives us
    // a stable count that matches the filtered data length.
    const headings = canvas.getAllByRole('heading', { level: 2 });
    await expect(headings.length).toBe(expected.length);
  },
};
