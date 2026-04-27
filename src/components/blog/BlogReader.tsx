'use client';

import { useBlogVariant } from './BlogVariantContext';
import { Broadsheet } from './variants/Broadsheet';
import { Gallery } from './variants/Gallery';
import { Logbook } from './variants/Logbook';
import { Longform } from './variants/Longform';
import { Manuscript } from './variants/Manuscript';

import type { FC } from 'react';

import type { Essay } from '#content';

import type { BlogVariantId, BlogVariantProps } from './variants/types';

/**
 * props accepted by `BlogReader`
 */
interface BlogReaderProps {
  readonly essay: Essay;
}

const VARIANT_COMPONENTS: Readonly<Record<BlogVariantId, FC<BlogVariantProps>>> = {
  manuscript: Manuscript,
  broadsheet: Broadsheet,
  logbook: Logbook,
  longform: Longform,
  gallery: Gallery,
};

const DEFAULT_VARIANT: BlogVariantId = 'manuscript';

/**
 * client wrapper that reads the active blog variant from context and renders
 * the matching presentation component; until hydration completes it renders
 * the default variant so server output stays stable
 * @param props reader props
 * @param props.essay essay to render in the active variant
 * @returns active variant element
 */
export const BlogReader: FC<BlogReaderProps> = ({ essay }) => {
  const { variant, isHydrated } = useBlogVariant();
  const activeId: BlogVariantId = isHydrated ? variant : DEFAULT_VARIANT;
  const VariantComponent = VARIANT_COMPONENTS[activeId];

  return <VariantComponent essay={essay} />;
};
