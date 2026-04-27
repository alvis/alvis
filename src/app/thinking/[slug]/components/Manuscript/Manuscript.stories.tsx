import { essays } from '#content';

import { Manuscript } from './Manuscript';

import type { Meta, StoryObj } from '@storybook/react-vite';

import type { Essay } from '#content';

// type Story is co-located with the meta below per Storybook idiom; the
// meta object is the canonical anchor and `StoryObj<typeof meta>` derives
// from it, so the type alias lives next to its source of truth.

/**
 * locate an essay by slug from the published content set. throws when
 * the slug is missing so stories fail loudly during local dev instead
 * of silently rendering an empty manuscript.
 * @param slug route identifier from the published content set
 * @returns resolved record used to exercise the manuscript
 */
function essayBySlug(slug: string): Essay {
  const match = essays.find((essay) => essay.slug === slug);
  if (!match) {
    throw new Error(`story fixture: no essay found for slug "${slug}"`);
  }

  return match;
}

const meta = {
  title: 'Reader/Manuscript',
  component: Manuscript,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    essay: {
      control: false,
      description: 'essay to render in the codex layout',
    },
  },
} satisfies Meta<typeof Manuscript>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Default render — a short editorial essay with a kicker, drop-cap
 * lede, body paragraphs, themes row, and back link.
 */
export const Default: Story = {
  args: { essay: essayBySlug('context-layer-is-the-product') },
  render: (args) => (
    <div className="bg-(--color-paper)" data-theme="codex">
      <Manuscript {...args} />
    </div>
  ),
};

/**
 * Long-form essay — the longest published essay verifies the
 * single-column rhythm holds across many paragraphs and a pull quote.
 */
export const LongForm: Story = {
  args: { essay: essayBySlug('on-the-context-harness') },
  render: (args) => (
    <div className="bg-(--color-paper)" data-theme="codex">
      <Manuscript {...args} />
    </div>
  ),
};

/**
 * With code — an essay carrying `code` content blocks. Verifies the
 * `CodeBlock` figure renders inline within the codex prose flow.
 */
export const WithCode: Story = {
  args: { essay: essayBySlug('a-harness-in-eighty-lines') },
  render: (args) => (
    <div className="bg-(--color-paper)" data-theme="codex">
      <Manuscript {...args} />
    </div>
  ),
};

/**
 * With figure — an essay carrying an inline `figure` block (image with
 * caption) rendered in the middle of the prose.
 */
export const WithFigure: Story = {
  args: { essay: essayBySlug('the-polite-agent') },
  render: (args) => (
    <div className="bg-(--color-paper)" data-theme="codex">
      <Manuscript {...args} />
    </div>
  ),
};
