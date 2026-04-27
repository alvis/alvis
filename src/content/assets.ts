type AssetSource = string | { readonly src: string };

/**
 * returns the stable filename stem used by the tweakable asset-set directories
 * @param source public image path or Next.js static image descriptor
 * @returns filename without its extension
 */
export const getAssetKey = (source: AssetSource): string => {
  const path = typeof source === 'string' ? source : source.src;
  const filename = path.split('/').at(-1) ?? '';
  const stem = filename.replace(/\.[^.]+$/, '');

  return stem.replace(/\.[a-z0-9]{8,}$/i, '');
};
