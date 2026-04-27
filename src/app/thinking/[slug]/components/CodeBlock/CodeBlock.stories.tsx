import { CodeBlock } from './CodeBlock';

import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FC, PropsWithChildren, ReactElement } from 'react';

// type Story is co-located with the meta below per Storybook idiom; the
// meta object is the canonical anchor and `StoryObj<typeof meta>` derives
// from it, so the type alias lives next to its source of truth.

const meta = {
  title: 'Reader/CodeBlock',
  component: CodeBlock,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
  argTypes: {
    language: {
      control: 'text',
      description:
        'programming language label; reserved for future syntax highlighting',
    },
    caption: {
      control: 'text',
      description: 'monospaced caption rendered beneath the source',
    },
    source: {
      control: 'text',
      description: 'raw source code rendered verbatim inside a `<pre>`',
    },
  },
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * decorator wrapping the codex paper background and the `data-theme`
 * attribute so codex tokens resolve when the story is viewed in isolation
 * @param root0 story frame input
 * @param root0.children story content placed on the paper surface
 * @returns children inside the isolated codex theme
 */
const CodexFrame: FC<PropsWithChildren> = ({ children }): ReactElement => (
  <div className="bg-(--color-paper) p-10" data-theme="codex">
    <div className="mx-auto max-w-2xl">{children}</div>
  </div>
);

/**
 * JavaScript listing — short async fetch helper. Verifies the
 * JetBrains Mono stack and the hairline rules render around an ES
 * module source.
 */
export const JavaScript: Story = {
  args: {
    language: 'javascript',
    caption: 'fetch-json.js — read JSON over the wire',
    source: `export async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`);
  }
  return response.json();
}`,
  },
  render: (args) => (
    <CodexFrame>
      <CodeBlock {...args} />
    </CodexFrame>
  ),
};

/**
 * TypeScript listing — a typed module with an exported interface and a
 * generic function. Documents how type signatures render in the
 * editorial code surface.
 */
export const TypeScript: Story = {
  args: {
    language: 'typescript',
    caption: 'memory.ts — a curatorial store interface',
    source: `export interface Memory<T> {
  observe(event: T): void;
  surface(): readonly T[];
  commit(note: string): void;
}

export function createMemory<T>(budget = 4000): Memory<T> {
  const events: T[] = [];
  return {
    observe: (event) => events.push(event),
    surface: () => events.slice(-budget),
    commit: () => undefined,
  };
}`,
  },
  render: (args) => (
    <CodexFrame>
      <CodeBlock {...args} />
    </CodexFrame>
  ),
};

/**
 * Bash listing — a multi-line shell session showing prompts and
 * commands. Documents how the monospace rhythm holds against shorter
 * lines and inline punctuation.
 */
export const Bash: Story = {
  args: {
    language: 'bash',
    caption: 'session.sh — install dependencies and start the dev server',
    source: `$ pnpm install
$ pnpm exec storybook dev --port 6006
$ open http://localhost:6006`,
  },
  render: (args) => (
    <CodexFrame>
      <CodeBlock {...args} />
    </CodexFrame>
  ),
};

/**
 * Long line — single overflowing line that must not break the column
 * width. Documents the horizontal scroll behaviour of the `<pre>`.
 */
export const LongLine: Story = {
  args: {
    language: 'typescript',
    caption: 'over-long.ts — one very long line that should scroll, not wrap',
    source: `export const overlyLongIdentifierForTestingHorizontalOverflow = ({ first, second, third, fourth, fifth, sixth, seventh, eighth, ninth, tenth }: { first: number; second: number; third: number; fourth: number; fifth: number; sixth: number; seventh: number; eighth: number; ninth: number; tenth: number; }) => first + second + third + fourth + fifth + sixth + seventh + eighth + ninth + tenth;`,
  },
  render: (args) => (
    <CodexFrame>
      <CodeBlock {...args} />
    </CodexFrame>
  ),
};
