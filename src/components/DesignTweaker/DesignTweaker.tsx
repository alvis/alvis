'use client';

/* eslint-disable max-lines-per-function, max-params -- the temporary tweaker keeps its controls together */

import { useEffect, useState } from 'react';

import {
  DESIGN_TWEAKER_ASSET_SETS,
  DESIGN_TWEAKER_DEFAULT_ASSET_SET,
  DESIGN_TWEAKER_DEFAULT_FONTS,
  DESIGN_TWEAKER_DEFAULT_FINAL_VISUAL,
  DESIGN_TWEAKER_DEFAULT_FOOTER_SEPARATOR,
  DESIGN_TWEAKER_DEFAULT_SECTION_SEPARATOR,
  DESIGN_TWEAKER_DEFAULT_WORK_LAYOUT,
  DESIGN_TWEAKER_FINAL_VISUALS,
  DESIGN_TWEAKER_FOOTER_SEPARATORS,
  DESIGN_TWEAKER_FONT_ROLES,
  DESIGN_TWEAKER_FONTS,
  DESIGN_TWEAKER_SECTION_SEPARATORS,
  DESIGN_TWEAKER_WORK_LAYOUTS,
} from './fonts';

import type { FC } from 'react';

import type {
  AssetSetId,
  FinalVisualId,
  FontRoleId,
  FooterSeparatorId,
  SectionSeparatorId,
  WorkLayoutId,
} from './fonts';

export {
  DESIGN_TWEAKER_ASSET_SETS,
  DESIGN_TWEAKER_DEFAULT_ASSET_SET,
  DESIGN_TWEAKER_DEFAULT_FONTS,
  DESIGN_TWEAKER_DEFAULT_FINAL_VISUAL,
  DESIGN_TWEAKER_DEFAULT_FOOTER_SEPARATOR,
  DESIGN_TWEAKER_DEFAULT_SECTION_SEPARATOR,
  DESIGN_TWEAKER_FINAL_VISUALS,
  DESIGN_TWEAKER_FOOTER_SEPARATORS,
  DESIGN_TWEAKER_FONT_ROLES,
  DESIGN_TWEAKER_FONTS,
  DESIGN_TWEAKER_GOOGLE_FONTS_URL,
  DESIGN_TWEAKER_SECTION_SEPARATORS,
  DESIGN_TWEAKER_WORK_LAYOUTS,
} from './fonts';

type FontSelections = Record<FontRoleId, string>;

const INITIAL_SELECTIONS: FontSelections = {
  display: DESIGN_TWEAKER_DEFAULT_FONTS.display.stack,
  body: DESIGN_TWEAKER_DEFAULT_FONTS.body.stack,
  label: DESIGN_TWEAKER_DEFAULT_FONTS.label.stack,
  mono: DESIGN_TWEAKER_DEFAULT_FONTS.mono.stack,
};

const PRELOAD_FONTS = [
  ...new Map(
    Object.values(DESIGN_TWEAKER_FONTS)
      .flat()
      .map((option) => [option.name, option]),
  ).values(),
];

const applyAssetSetImages = (assetSet: AssetSetId): void => {
  const elements = document.querySelectorAll<HTMLElement>(
    '[data-asset-kind][data-asset-key], .portrait-plate',
  );

  for (const element of elements) {
    if (element.classList.contains('portrait-plate')) {
      element.dataset.assetKey = 'me-philosophical';
      element.dataset.assetKind = 'profile';
    }

    const { assetKey, assetKind } = element.dataset;

    if (assetSet === 'original' || !assetKey || !assetKind) {
      element.style.removeProperty('--asset-content-image');
      continue;
    }

    element.style.setProperty(
      '--asset-content-image',
      `url('/images/asset-sets/${assetSet}/${assetKind}/${assetKey}.webp')`,
    );
  }
};

const useDesignTweakerSelectionEffects = (
  selections: FontSelections,
  assetSet: AssetSetId,
  workLayout: WorkLayoutId,
  finalVisual: FinalVisualId,
  footerSeparator: FooterSeparatorId,
  sectionSeparator: SectionSeparatorId,
): void => {
  useEffect(() => {
    for (const role of DESIGN_TWEAKER_FONT_ROLES) {
      document.documentElement.style.setProperty(
        role.variable,
        selections[role.id],
      );
    }
  }, [selections]);

  useEffect(() => {
    document.documentElement.dataset.assetSet = assetSet;
    document.documentElement.dataset.workLayout = workLayout;
    document.documentElement.dataset.finalVisual = finalVisual;
    document.documentElement.dataset.footerSeparator = footerSeparator;
    document.documentElement.dataset.sectionSeparator = sectionSeparator;

    if (finalVisual === 'intent') {
      document.documentElement.style.setProperty(
        '--final-intent-image',
        "var(--asset-system-evidence, url('/images/sections/intent-field.webp'))",
      );
    } else {
      document.documentElement.style.removeProperty('--final-intent-image');
    }

    applyAssetSetImages(assetSet);
    const observer = new MutationObserver(() => {
      applyAssetSetImages(assetSet);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, [assetSet, finalVisual, footerSeparator, sectionSeparator, workLayout]);
};

/**
 * exposes temporary typography, work-layout, and final-section controls
 * @returns temporary font variable editor
 */
export const DesignTweaker: FC = () => {
  const [selections, setSelections] =
    useState<FontSelections>(INITIAL_SELECTIONS);
  const [assetSet, setAssetSet] = useState<AssetSetId>(
    DESIGN_TWEAKER_DEFAULT_ASSET_SET,
  );
  const [workLayout, setWorkLayout] = useState<WorkLayoutId>(
    DESIGN_TWEAKER_DEFAULT_WORK_LAYOUT,
  );
  const [finalVisual, setFinalVisual] = useState<FinalVisualId>(
    DESIGN_TWEAKER_DEFAULT_FINAL_VISUAL,
  );
  const [footerSeparator, setFooterSeparator] = useState<FooterSeparatorId>(
    DESIGN_TWEAKER_DEFAULT_FOOTER_SEPARATOR,
  );
  const [sectionSeparator, setSectionSeparator] = useState<SectionSeparatorId>(
    DESIGN_TWEAKER_DEFAULT_SECTION_SEPARATOR,
  );
  useDesignTweakerSelectionEffects(
    selections,
    assetSet,
    workLayout,
    finalVisual,
    footerSeparator,
    sectionSeparator,
  );

  return (
    <aside aria-label="Design controls" className="design-tweaker">
      <details className="design-tweaker-panel">
        <summary>Tweak</summary>
        <div className="design-tweaker-panel-body">
          <details>
            <summary>Type</summary>
            <div className="design-tweaker-fields">
              {DESIGN_TWEAKER_FONT_ROLES.map((role) => (
                <label className="design-tweaker-field" key={role.id}>
                  <span>{role.label}</span>
                  <select
                    aria-label={`${role.label} font`}
                    value={selections[role.id]}
                    onChange={(event) => {
                      setSelections((current) => ({
                        ...current,
                        [role.id]: event.target.value,
                      }));
                    }}>
                    {DESIGN_TWEAKER_FONTS[role.id].map((option) => (
                      <option key={option.name} value={option.stack}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <code>{role.variable}</code>
                </label>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setSelections(INITIAL_SELECTIONS);
              }}>
              Reset
            </button>
          </details>
          <details>
            <summary>Work</summary>
            <label className="design-tweaker-field">
              <span>Work layout</span>
              <select
                aria-label="Work layout"
                value={workLayout}
                onChange={(event) => {
                  setWorkLayout(event.target.value as WorkLayoutId);
                }}>
                {DESIGN_TWEAKER_WORK_LAYOUTS.map((layout) => (
                  <option key={layout.id} value={layout.id}>
                    {layout.label}
                  </option>
                ))}
              </select>
              <code>data-work-layout</code>
            </label>
          </details>
          <details>
            <summary>Visual</summary>
            <label className="design-tweaker-field">
              <span>Asset system</span>
              <select
                aria-label="Asset system"
                value={assetSet}
                onChange={(event) => {
                  setAssetSet(event.target.value as AssetSetId);
                }}>
                {DESIGN_TWEAKER_ASSET_SETS.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.label}
                  </option>
                ))}
              </select>
              <code>data-asset-set</code>
            </label>
            <label className="design-tweaker-field">
              <span>Final section</span>
              <select
                aria-label="Final section visual"
                value={finalVisual}
                onChange={(event) => {
                  setFinalVisual(event.target.value as FinalVisualId);
                }}>
                {DESIGN_TWEAKER_FINAL_VISUALS.map((visual) => (
                  <option key={visual.id} value={visual.id}>
                    {visual.label}
                  </option>
                ))}
              </select>
              <code>data-final-visual</code>
            </label>
            <label className="design-tweaker-field">
              <span>Section separator</span>
              <select
                aria-label="Section separator"
                value={sectionSeparator}
                onChange={(event) => {
                  setSectionSeparator(event.target.value as SectionSeparatorId);
                }}>
                {DESIGN_TWEAKER_SECTION_SEPARATORS.map((separator) => (
                  <option key={separator.id} value={separator.id}>
                    {separator.label}
                  </option>
                ))}
              </select>
              <code>data-section-separator</code>
            </label>
            <label className="design-tweaker-field">
              <span>Footer separator</span>
              <select
                aria-label="Footer separator"
                value={footerSeparator}
                onChange={(event) => {
                  setFooterSeparator(event.target.value as FooterSeparatorId);
                }}>
                {DESIGN_TWEAKER_FOOTER_SEPARATORS.map((separator) => (
                  <option key={separator.id} value={separator.id}>
                    {separator.label}
                  </option>
                ))}
              </select>
              <code>data-footer-separator</code>
            </label>
          </details>
        </div>
      </details>
      <div aria-hidden className="design-tweaker-preload">
        {PRELOAD_FONTS.map((option) => (
          <span
            data-font-preload={option.name}
            key={option.name}
            style={{ fontFamily: option.stack }}>
            Hamburgefonstiv 0123456789
          </span>
        ))}
      </div>
    </aside>
  );
};

/* eslint-enable max-lines-per-function, max-params */
