import type { Essay } from '#content';

import type { VariantMeta } from '../../common/Variant';

/**
 * ordered tuple of all supported blog variant identifiers
 */
export const BLOG_VARIANT_IDS = [
  'manuscript',
  'broadsheet',
  'logbook',
  'longform',
  'gallery',
] as const;

/**
 * union of blog variant ids derived from `BLOG_VARIANT_IDS`
 */
export type BlogVariantId = (typeof BLOG_VARIANT_IDS)[number];

/**
 * selector metadata for blog variants, in the canonical display order
 */
export const BLOG_VARIANT_META: ReadonlyArray<VariantMeta<BlogVariantId>> = [
  { id: 'manuscript', label: 'Manuscript', badge: 1 },
  { id: 'broadsheet', label: 'Broadsheet', badge: 2 },
  { id: 'logbook', label: 'Logbook', badge: 3 },
  { id: 'longform', label: 'Longform', badge: 4 },
  { id: 'gallery', label: 'Gallery', badge: 5 },
];

/**
 * props shared by every blog variant component
 */
export interface BlogVariantProps {
  readonly essay: Essay;
}
