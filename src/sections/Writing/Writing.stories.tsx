import { expect, within } from 'storybook/test';

import { Writing } from './index';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Sections/Writing',
  component: Writing,
  parameters: { layout: 'fullscreen' },
  tags: ['autodocs'],
} satisfies Meta<typeof Writing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithoutRasterThumbnails: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.queryAllByRole('img')).toHaveLength(0);
    await expect(
      canvasElement.querySelectorAll('.essay-signal'),
    ).not.toHaveLength(0);
    await expect(canvasElement.querySelector('.writing-watermark')).toBeNull();
    await expect(canvasElement.querySelector('[class*="outline"]')).toBeNull();
  },
};
