import { expect, userEvent, within } from 'storybook/test';

import { projects } from '#content';

import { ProjectTabs } from './ProjectTabs';

import type { Meta, StoryObj } from '@storybook/react-vite';

// type Story is co-located with the meta below per Storybook idiom; the
// meta object is the canonical anchor and `StoryObj<typeof meta>` derives
// from it, so the type alias lives next to its source of truth.

const meta = {
  title: 'Filters/ProjectTabs/Interaction',
  component: ProjectTabs,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof ProjectTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Clicking a project tab in the sidebar navigates the in-page anchor
 * to the corresponding detail article. This verifies the selector nav
 * exposes accessible links and that each renders an article with the
 * matching slug-derived id.
 */
export const FiltersByTab: Story = {
  args: { projects },
  render: (args) => (
    <div className="bg-(--color-paper) p-10">
      <ProjectTabs {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const target = projects[1]!;
    const selector = canvas.getByRole('navigation', {
      name: 'Project selector',
    });

    await expect(selector).toBeInTheDocument();

    const tab = within(selector).getByRole('link', {
      name: new RegExp(target.name),
    });
    await expect(tab).toHaveAttribute('href', `#project-${target.slug}`);

    await userEvent.click(tab);

    const article = canvasElement.querySelector(`#project-${target.slug}`);
    await expect(article).not.toBeNull();
    await expect(article?.tagName.toLowerCase()).toBe('article');
  },
};
