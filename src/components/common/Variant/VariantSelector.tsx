'use client';

import { useState } from 'react';

import type { ReactElement } from 'react';

import type { VariantContextValue, VariantMeta } from './types';

/**
 * props for the generic floating variant selector pill
 */
interface VariantSelectorProps<TId extends string> {
  useVariant: () => VariantContextValue<TId>;
  meta: ReadonlyArray<VariantMeta<TId>>;
  className?: string;
  defaultCollapsed?: boolean;
  ariaLabel?: string;
}

const DEFAULT_WRAPPER_CLASS = 'fixed right-4 bottom-4 z-[60]';

const PILL_CLASS =
  'rounded-full bg-[#fff9ee]/95 border border-[#d8c9b4] shadow-[0_8px_24px_rgba(22,39,71,0.12)] backdrop-blur flex items-center gap-1 p-1';

const CHIP_BASE =
  'size-7 rounded-full text-xs font-medium transition-colors flex items-center justify-center';

const TOGGLE_CLASS = `${CHIP_BASE} text-[#506176] hover:bg-[#162747]/5`;

const CHIP_ACTIVE_CLASS = `${CHIP_BASE} bg-[#162747] text-[#fff9ee]`;

const CHIP_INACTIVE_CLASS = `${CHIP_BASE} text-[#506176] hover:bg-[#162747]/5`;

/**
 * floating selector pill that switches the active variant via a hook-bound context
 * @param props selector props
 * @param props.useVariant hook returning the variant context value to drive state
 * @param props.meta ordered metadata entries rendered as numbered chips
 * @param props.className optional override for the outer wrapper class
 * @param props.defaultCollapsed when true, the selector renders collapsed until expanded
 * @param props.ariaLabel accessible label for the toolbar
 * @returns floating pill toolbar element
 */
export function VariantSelector<TId extends string>(
  props: Readonly<VariantSelectorProps<TId>>,
): ReactElement {
  const {
    useVariant,
    meta,
    className,
    defaultCollapsed = false,
    ariaLabel = 'Variant selector',
  } = props;

  const { variant, setVariant, isHydrated } = useVariant();
  const [expanded, setExpanded] = useState(!defaultCollapsed);

  const wrapperClass = `${className ?? DEFAULT_WRAPPER_CLASS} ${PILL_CLASS}`;

  if (!isHydrated) {
    return (
      <div aria-label={ariaLabel} className={wrapperClass} role="toolbar">
        <button
          disabled
          aria-label="Variant selector loading"
          className={TOGGLE_CLASS}
          type="button">
          <span aria-hidden="true">≡</span>
        </button>
      </div>
    );
  }

  const activeMeta = meta.find((entry) => entry.id === variant);

  return (
    <div aria-label={ariaLabel} className={wrapperClass} role="toolbar">
      <button
        aria-expanded={expanded}
        aria-label={
          expanded ? 'Collapse variant selector' : 'Expand variant selector'
        }
        className={TOGGLE_CLASS}
        type="button"
        onClick={() => setExpanded((prev) => !prev)}>
        <span aria-hidden="true">≡</span>
      </button>
      {expanded
        ? meta.map((entry) => (
            <button
              aria-label={entry.label}
              aria-pressed={entry.id === variant}
              className={
                entry.id === variant ? CHIP_ACTIVE_CLASS : CHIP_INACTIVE_CLASS
              }
              key={entry.id}
              type="button"
              onClick={() => setVariant(entry.id)}>
              {entry.badge}
            </button>
          ))
        : activeMeta && (
            <button
              aria-pressed
              aria-label={activeMeta.label}
              className={CHIP_ACTIVE_CLASS}
              type="button"
              onClick={() => setVariant(activeMeta.id)}>
              {activeMeta.badge}
            </button>
          )}
    </div>
  );
}
