'use client';

import { createVariantContext } from '../common/Variant';

import { BLOG_VARIANT_IDS } from './variants/types';

import type { FC, ReactNode } from 'react';

import type { VariantContextValue } from '../common/Variant';

import type { BlogVariantId } from './variants/types';

const blogVariantContext = createVariantContext<BlogVariantId>({
  storageKey: 'blog-variant',
  defaultId: 'manuscript',
  validIds: BLOG_VARIANT_IDS,
  displayName: 'BlogVariant',
});

/**
 * provider component that supplies the blog variant context, persisted under
 * `localStorage['blog-variant']`
 */
export const BlogVariantProvider: FC<{ children: ReactNode }> =
  blogVariantContext.Provider;

/**
 * consumer hook returning the current blog variant value, setter, and
 * hydration flag from the matching provider
 */
export const useBlogVariant = blogVariantContext.useVariant satisfies () => VariantContextValue<BlogVariantId>;
