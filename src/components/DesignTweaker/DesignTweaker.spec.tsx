import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import {
  DesignTweaker,
  DESIGN_TWEAKER_ASSET_SETS,
  DESIGN_TWEAKER_DEFAULT_FONTS,
  DESIGN_TWEAKER_FONTS,
  DESIGN_TWEAKER_GOOGLE_FONTS_URL,
  DESIGN_TWEAKER_SECTION_SEPARATORS,
  DESIGN_TWEAKER_WORK_LAYOUTS,
} from './DesignTweaker';

const DISPLAY_FONT_COUNT = 20;
const BODY_FONT_COUNT = 20;
const LABEL_FONT_COUNT = 10;
const MONO_FONT_COUNT = 10;
const WORK_LAYOUT_COUNT = 4;
const FOOTER_SEPARATOR_COUNT = 16;
const SECTION_SEPARATOR_COUNT = 6;
const ASSET_SET_COUNT = 7;

describe('DesignTweaker', () => {
  it('offers expanded choices for display and body while keeping label and mono focused', () => {
    expect(DESIGN_TWEAKER_FONTS.display).toHaveLength(DISPLAY_FONT_COUNT);
    expect(DESIGN_TWEAKER_FONTS.body).toHaveLength(BODY_FONT_COUNT);
    expect(DESIGN_TWEAKER_FONTS.label).toHaveLength(LABEL_FONT_COUNT);
    expect(DESIGN_TWEAKER_FONTS.mono).toHaveLength(MONO_FONT_COUNT);
  });

  it('includes EB Garamond in the display and body choices', () => {
    expect(DESIGN_TWEAKER_FONTS.display.map((font) => font.name)).toContain(
      'EB Garamond',
    );
    expect(DESIGN_TWEAKER_FONTS.body.map((font) => font.name)).toContain(
      'EB Garamond',
    );
  });

  it('uses the settled font choices as the live tweaker defaults', () => {
    expect(DESIGN_TWEAKER_DEFAULT_FONTS.display.name).toBe('Fraunces');
    expect(DESIGN_TWEAKER_DEFAULT_FONTS.body.name).toBe('Source Serif 4');
    expect(DESIGN_TWEAKER_DEFAULT_FONTS.label.name).toBe('Source Sans 3');
    expect(DESIGN_TWEAKER_DEFAULT_FONTS.mono.name).toBe('IBM Plex Mono');
  });

  it('includes the modern philosophical display and body candidates', () => {
    expect(DESIGN_TWEAKER_FONTS.display.map((font) => font.name)).toEqual(
      expect.arrayContaining([
        'Noto Serif Display',
        'Bodoni Moda',
        'Gloock',
        'Marcellus',
        'STIX Two Text',
      ]),
    );
    expect(DESIGN_TWEAKER_FONTS.body.map((font) => font.name)).toEqual(
      expect.arrayContaining([
        'Alegreya',
        'Vollkorn',
        'Noto Serif',
        'Faustina',
        'STIX Two Text',
      ]),
    );
  });

  it('preloads the added Google font families', () => {
    expect(DESIGN_TWEAKER_GOOGLE_FONTS_URL).toContain('Noto+Serif+Display');
    expect(DESIGN_TWEAKER_GOOGLE_FONTS_URL).toContain('Bodoni+Moda');
    expect(DESIGN_TWEAKER_GOOGLE_FONTS_URL).toContain('Gloock');
    expect(DESIGN_TWEAKER_GOOGLE_FONTS_URL).toContain('Alegreya');
    expect(DESIGN_TWEAKER_GOOGLE_FONTS_URL).toContain('Vollkorn');
  });

  it('renders controls for all editable CSS font variables', () => {
    const html = renderToStaticMarkup(<DesignTweaker />);

    expect(html).toContain('--font-family-display');
    expect(html).toContain('--font-family-body');
    expect(html).toContain('--font-family-label');
    expect(html).toContain('--font-family-mono');
  });

  it('renders selectable work layout options', () => {
    const html = renderToStaticMarkup(<DesignTweaker />);

    expect(DESIGN_TWEAKER_WORK_LAYOUTS).toHaveLength(WORK_LAYOUT_COUNT);
    expect(html).toContain('Work layout');
    expect(html).toContain('Ledger');
    expect(html).toContain('Constellation');
    expect(html).toContain('Timeline');
    expect(html).toContain('Briefing');
  });

  it('should offer final-section image, SVG, and CSS treatments', () => {
    const html = renderToStaticMarkup(<DesignTweaker />);

    expect(html).toContain('Final section visual');
    expect(html).toContain('Intent Field');
    expect(html).toContain('Signal Map');
    expect(html).toContain('Ink Field');
  });

  it('offers every preserved footer separator in the existing visual controls', () => {
    const html = renderToStaticMarkup(<DesignTweaker />);
    const options =
      /<select aria-label="Footer separator">([\s\S]*?)<\/select>/.exec(
        html,
      )?.[1];

    expect(options).toBeDefined();
    expect(options?.match(/<option/g)).toHaveLength(FOOTER_SEPARATOR_COUNT);
    expect(options).toContain('Original Soft Ridge');
    expect(options).toContain('Split Fold');
    expect(options).toContain('Cantilever Fold');
  });

  it('renders the existing controls on the public page', () => {
    const html = renderToStaticMarkup(<DesignTweaker />);

    expect(html).not.toContain('hidden=""');
  });

  it('renders a preload specimen for every unique offered font', () => {
    const html = renderToStaticMarkup(<DesignTweaker />);
    const uniqueFonts = new Set(
      Object.values(DESIGN_TWEAKER_FONTS)
        .flat()
        .map((font) => font.name),
    );

    for (const font of uniqueFonts) {
      expect(html).toContain(`data-font-preload="${font}"`);
    }
  });
});

describe('asset system controls', () => {
  it('offers the original assets and six reimagined asset systems', () => {
    const html = renderToStaticMarkup(<DesignTweaker />);
    const options =
      /<select aria-label="Asset system">([\s\S]*?)<\/select>/.exec(html)?.[1];

    expect(DESIGN_TWEAKER_ASSET_SETS).toHaveLength(ASSET_SET_COUNT);
    expect(options?.match(/<option/g)).toHaveLength(ASSET_SET_COUNT);
    expect(options).toContain('16 · Stratified Memory');
    expect(options).toContain('17 · Provenance Thread');
    expect(options).toContain('18 · Human Measure');
    expect(options).toContain('20 · Calibrated Pause');
    expect(options).toContain('Accountable Craft');
    expect(options).toContain('Context Looming / Being Human for Future');
  });
});

describe('section separator controls', () => {
  it('offers curated separators for every non-footer section', () => {
    const html = renderToStaticMarkup(<DesignTweaker />);
    const options =
      /<select aria-label="Section separator">([\s\S]*?)<\/select>/.exec(
        html,
      )?.[1];

    expect(DESIGN_TWEAKER_SECTION_SEPARATORS).toHaveLength(
      SECTION_SEPARATOR_COUNT,
    );
    expect(options?.match(/<option/g)).toHaveLength(SECTION_SEPARATOR_COUNT);
    expect(options).toContain('Original Soft Ridge');
    expect(options).toContain('Tidal Edge');
    expect(options).toContain('Split Fold');
  });
});
