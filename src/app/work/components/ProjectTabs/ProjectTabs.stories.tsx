import { projects } from '#content';

import { ProjectTabs } from './ProjectTabs';

import type { Meta, StoryObj } from '@storybook/react-vite';

import type { Project } from '#content';

// type Story is co-located with the meta below per Storybook idiom; the
// meta object is the canonical anchor and `StoryObj<typeof meta>` derives
// from it, so the type alias lives next to its source of truth.

const meta = {
  title: 'Filters/ProjectTabs',
  component: ProjectTabs,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    projects: {
      control: false,
      description:
        'non-empty list of projects to render; the first project anchors the page',
    },
  },
} satisfies Meta<typeof ProjectTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default render — full project list from `#content`, two-column shell
 * with the sticky selector sidebar and stacked detail articles.
 */
export const Default: Story = {
  args: { projects },
  render: (args) => (
    <div className="bg-(--color-paper) p-10">
      <ProjectTabs {...args} />
    </div>
  ),
};

/**
 * Filter applied — a curated subset that mimics a `kind` filter (only
 * "Building"/"Exploring" status projects). Useful to verify the layout
 * does not collapse when only a couple of items remain.
 */
export const FilterApplied: Story = {
  args: {
    projects: projects.filter(
      (project) =>
        project.status === 'Building' || project.status === 'Exploring',
    ) as [Project, ...Project[]],
  },
  render: (args) => (
    <div className="bg-(--color-paper) p-10">
      <ProjectTabs {...args} />
    </div>
  ),
};

/**
 * Empty-ish state — a single placeholder project. The component's
 * `projects` prop is a non-empty tuple by design, so the leanest renderable
 * state is one entry. This documents that boundary.
 */
export const Empty: Story = {
  args: {
    projects: [
      {
        slug: 'placeholder',
        name: 'No projects to show',
        status: 'Idle',
        kind: 'Placeholder',
        summary:
          'A placeholder used when an upstream filter would otherwise produce an empty list.',
        thesis: 'The empty state still earns its presence on the page.',
        details: ['Add projects to `#content` to populate this view.'],
        proof: [
          {
            label: 'What exists now',
            value: 'No active project is selected.',
          },
        ],
        links: [],
      },
    ],
  },
  render: (args) => (
    <div className="bg-(--color-paper) p-10">
      <ProjectTabs {...args} />
    </div>
  ),
};
