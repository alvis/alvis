'use client';

import { VariantSelector } from '../common/Variant';

import { useBlogVariant } from './BlogVariantContext';
import { BLOG_VARIANT_META } from './variants/types';

import type { FC } from 'react';

/**
 * client-side wrapper around the generic `VariantSelector` bound to the blog
 * variant context; rendered inside `BlogVariantProvider` so the floating pill
 * can switch between layouts
 * @returns floating selector element
 */
export const BlogVariantSelector: FC = () => (
  <VariantSelector
    ariaLabel="Blog presentation variant"
    meta={BLOG_VARIANT_META}
    useVariant={useBlogVariant}
  />
);
