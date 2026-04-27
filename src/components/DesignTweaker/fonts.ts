export type FontRoleId = 'display' | 'body' | 'label' | 'mono';

export type FontOption = {
  readonly name: string;
  readonly stack: string;
};

export type WorkLayoutId = 'ledger' | 'constellation' | 'timeline' | 'briefing';

export type FinalVisualId = 'intent' | 'signal' | 'ink';

export type AssetSetId =
  | 'original'
  | 'stratified-memory'
  | 'provenance-thread'
  | 'human-measure'
  | 'calibrated-pause'
  | 'accountable-craft'
  | 'context-looming-human-future';

type FontRole = {
  readonly id: FontRoleId;
  readonly label: string;
  readonly variable: `--font-family-${string}`;
};

type WorkLayoutOption = {
  readonly id: WorkLayoutId;
  readonly label: string;
};

type FinalVisualOption = {
  readonly id: FinalVisualId;
  readonly label: string;
};

type AssetSetOption = {
  readonly id: AssetSetId;
  readonly label: string;
};

export const DESIGN_TWEAKER_GOOGLE_FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;1,400&family=Besley:ital,wght@0,400;0,500;1,400&family=Bitter:ital,wght@0,400;0,500;1,400&family=Bodoni+Moda:opsz,wght@6..96,400;6..96,500&family=Cardo:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Cousine:wght@400;700&family=Crimson+Pro:ital,wght@0,400;0,500;1,400&family=DM+Mono:wght@400;500&family=Domine:wght@400;500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Eczar:wght@400;500&family=Faustina:ital,wght@0,400;0,500;1,400&family=Fira+Code:wght@400;500&family=Frank+Ruhl+Libre:wght@400;500&family=Fraunces:opsz,wght@9..144,400;9..144,500&family=Gloock&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;600&family=Inconsolata:wght@400;500&family=Instrument+Serif:ital@0;1&family=Inter:opsz,wght@14..32,400;14..32,600&family=JetBrains+Mono:wght@400;500&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Literata:ital,opsz,wght@0,7..72,400;0,7..72,500;1,7..72,400&family=Lora:ital,wght@0,400;0,500;1,400&family=Manrope:wght@400;600&family=Marcellus&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@400;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Noto+Serif:ital,wght@0,400;0,500;1,400&family=Noto+Serif+Display:ital,wght@0,400;0,500;1,400&family=Nunito+Sans:wght@400;600&family=Petrona:ital,wght@0,400;0,500;1,400&family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Plus+Jakarta+Sans:wght@400;600&family=Prata&family=Public+Sans:wght@400;600&family=Raleway:wght@400;700&family=Roboto+Mono:wght@400;500&family=Rosarivo:ital@0;1&family=STIX+Two+Text:ital,wght@0,400;0,500;1,400&family=Shippori+Mincho:wght@400;500&family=Source+Code+Pro:wght@400;500&family=Source+Sans+3:wght@400;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,500;1,8..60,400&family=Space+Mono:wght@400;700&family=Spectral:ital,wght@0,400;0,500;1,400&family=Ubuntu+Mono:wght@400;700&family=Vollkorn:ital,wght@0,400;0,500;1,400&family=Work+Sans:wght@400;600&display=swap';

export const DESIGN_TWEAKER_FONT_ROLES = [
  {
    id: 'display',
    label: 'Display',
    variable: '--font-family-display',
  },
  {
    id: 'body',
    label: 'Body',
    variable: '--font-family-body',
  },
  {
    id: 'label',
    label: 'Label',
    variable: '--font-family-label',
  },
  {
    id: 'mono',
    label: 'Mono',
    variable: '--font-family-mono',
  },
] as const satisfies readonly FontRole[];

export const DESIGN_TWEAKER_FONTS = {
  display: [
    font('Cormorant Garamond', "'Cormorant Garamond', Georgia, serif"),
    font('EB Garamond', "'EB Garamond', Georgia, serif"),
    font('Newsreader', "'Newsreader', Georgia, serif"),
    font('Spectral', "'Spectral', Georgia, serif"),
    font('Instrument Serif', "'Instrument Serif', Georgia, serif"),
    font('Libre Baskerville', "'Libre Baskerville', Georgia, serif"),
    font('Playfair Display', "'Playfair Display', Georgia, serif"),
    font('Fraunces', "'Fraunces', Georgia, serif"),
    font('Crimson Pro', "'Crimson Pro', Georgia, serif"),
    font('Lora', "'Lora', Georgia, serif"),
    font('Noto Serif Display', "'Noto Serif Display', Georgia, serif"),
    font('Bodoni Moda', "'Bodoni Moda', Georgia, serif"),
    font('Gloock', "'Gloock', Georgia, serif"),
    font('Marcellus', "'Marcellus', Georgia, serif"),
    font('Prata', "'Prata', Georgia, serif"),
    font('STIX Two Text', "'STIX Two Text', Georgia, serif"),
    font('Shippori Mincho', "'Shippori Mincho', Georgia, serif"),
    font('Petrona', "'Petrona', Georgia, serif"),
    font('Rosarivo', "'Rosarivo', Georgia, serif"),
    font('Cardo', "'Cardo', Georgia, serif"),
  ],
  body: [
    font('Cormorant Garamond', "'Cormorant Garamond', Georgia, serif"),
    font('EB Garamond', "'EB Garamond', Georgia, serif"),
    font('Source Serif 4', "'Source Serif 4', Georgia, serif"),
    font('Lora', "'Lora', Georgia, serif"),
    font('Literata', "'Literata', Georgia, serif"),
    font('Newsreader', "'Newsreader', Georgia, serif"),
    font('Spectral', "'Spectral', Georgia, serif"),
    font('Crimson Pro', "'Crimson Pro', Georgia, serif"),
    font('Libre Baskerville', "'Libre Baskerville', Georgia, serif"),
    font('Merriweather', "'Merriweather', Georgia, serif"),
    font('Alegreya', "'Alegreya', Georgia, serif"),
    font('Vollkorn', "'Vollkorn', Georgia, serif"),
    font('Noto Serif', "'Noto Serif', Georgia, serif"),
    font('Bitter', "'Bitter', Georgia, serif"),
    font('Domine', "'Domine', Georgia, serif"),
    font('Faustina', "'Faustina', Georgia, serif"),
    font('Frank Ruhl Libre', "'Frank Ruhl Libre', Georgia, serif"),
    font('Eczar', "'Eczar', Georgia, serif"),
    font('Besley', "'Besley', Georgia, serif"),
    font('STIX Two Text', "'STIX Two Text', Georgia, serif"),
  ],
  label: [
    font('Raleway', "'Raleway', Arial, sans-serif"),
    font('Inter', "'Inter', Arial, sans-serif"),
    font('Source Sans 3', "'Source Sans 3', Arial, sans-serif"),
    font('IBM Plex Sans', "'IBM Plex Sans', Arial, sans-serif"),
    font('Work Sans', "'Work Sans', Arial, sans-serif"),
    font('Montserrat', "'Montserrat', Arial, sans-serif"),
    font('Nunito Sans', "'Nunito Sans', Arial, sans-serif"),
    font('Public Sans', "'Public Sans', Arial, sans-serif"),
    font('Manrope', "'Manrope', Arial, sans-serif"),
    font('Plus Jakarta Sans', "'Plus Jakarta Sans', Arial, sans-serif"),
  ],
  mono: [
    font(
      'JetBrains Mono',
      "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    ),
    font(
      'IBM Plex Mono',
      "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    ),
    font(
      'Source Code Pro',
      "'Source Code Pro', ui-monospace, SFMono-Regular, Menlo, monospace",
    ),
    font(
      'Fira Code',
      "'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace",
    ),
    font(
      'Roboto Mono',
      "'Roboto Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    ),
    font(
      'Space Mono',
      "'Space Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    ),
    font(
      'Inconsolata',
      "'Inconsolata', ui-monospace, SFMono-Regular, Menlo, monospace",
    ),
    font(
      'Ubuntu Mono',
      "'Ubuntu Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    ),
    font(
      'DM Mono',
      "'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
    ),
    font(
      'Cousine',
      "'Cousine', ui-monospace, SFMono-Regular, Menlo, monospace",
    ),
  ],
} as const satisfies Record<FontRoleId, readonly FontOption[]>;

export const DESIGN_TWEAKER_DEFAULT_FONTS = {
  display: findFont('display', 'Fraunces'),
  body: findFont('body', 'Source Serif 4'),
  label: findFont('label', 'Source Sans 3'),
  mono: findFont('mono', 'IBM Plex Mono'),
} as const satisfies Record<FontRoleId, FontOption>;

export const DESIGN_TWEAKER_WORK_LAYOUTS = [
  { id: 'ledger', label: 'Ledger' },
  { id: 'constellation', label: 'Constellation' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'briefing', label: 'Briefing' },
] as const satisfies readonly WorkLayoutOption[];

export const DESIGN_TWEAKER_DEFAULT_WORK_LAYOUT =
  'ledger' satisfies WorkLayoutId;

export const DESIGN_TWEAKER_FINAL_VISUALS = [
  { id: 'intent', label: 'Intent Field' },
  { id: 'signal', label: 'Signal Map' },
  { id: 'ink', label: 'Ink Field' },
] as const satisfies readonly FinalVisualOption[];

export const DESIGN_TWEAKER_DEFAULT_FINAL_VISUAL =
  'signal' satisfies FinalVisualId;

export const DESIGN_TWEAKER_ASSET_SETS = [
  { id: 'original', label: 'Original' },
  { id: 'stratified-memory', label: '16 · Stratified Memory' },
  { id: 'provenance-thread', label: '17 · Provenance Thread' },
  { id: 'human-measure', label: '18 · Human Measure' },
  { id: 'calibrated-pause', label: '20 · Calibrated Pause' },
  {
    id: 'accountable-craft',
    label: '16+17+18+20 · Accountable Craft',
  },
  {
    id: 'context-looming-human-future',
    label: '17+18 · Context Looming / Being Human for Future',
  },
] as const satisfies readonly AssetSetOption[];

export const DESIGN_TWEAKER_DEFAULT_ASSET_SET = 'original' satisfies AssetSetId;

export const DESIGN_TWEAKER_FOOTER_SEPARATORS = [
  { id: 'soft-ridge', label: 'Original Soft Ridge' },
  { id: 'torn-paper', label: 'Compact Torn Paper' },
  { id: 'layered-ridge', label: 'Layered Ridge' },
  { id: 'tidal-edge', label: 'Tidal Edge' },
  { id: 'faceted-horizon', label: 'Faceted Horizon' },
  { id: 'stepped-protocol', label: 'Stepped Protocol' },
  { id: 'offset-chevron', label: 'Offset Chevron' },
  { id: 'broken-datum', label: 'Broken Datum' },
  { id: 'singular-prism', label: 'Singular Prism' },
  { id: 'aperture', label: 'Aperture' },
  { id: 'converging-fold', label: 'Converging Fold' },
  { id: 'sparse-notches', label: 'Sparse Notches' },
  { id: 'left-fold', label: 'Left-weighted Fold' },
  { id: 'split-fold', label: 'Split Fold' },
  { id: 'compressed-fold', label: 'Compressed Fold' },
  { id: 'cantilever-fold', label: 'Cantilever Fold' },
] as const;

export type FooterSeparatorId =
  (typeof DESIGN_TWEAKER_FOOTER_SEPARATORS)[number]['id'];

export const DESIGN_TWEAKER_DEFAULT_FOOTER_SEPARATOR =
  'split-fold' satisfies FooterSeparatorId;

export const DESIGN_TWEAKER_SECTION_SEPARATORS = [
  DESIGN_TWEAKER_FOOTER_SEPARATORS[0],
  DESIGN_TWEAKER_FOOTER_SEPARATORS[1],
  DESIGN_TWEAKER_FOOTER_SEPARATORS[2],
  DESIGN_TWEAKER_FOOTER_SEPARATORS[3],
  DESIGN_TWEAKER_FOOTER_SEPARATORS[4],
  DESIGN_TWEAKER_FOOTER_SEPARATORS[13],
] as const;

export type SectionSeparatorId =
  (typeof DESIGN_TWEAKER_SECTION_SEPARATORS)[number]['id'];

export const DESIGN_TWEAKER_DEFAULT_SECTION_SEPARATOR =
  'soft-ridge' satisfies SectionSeparatorId;

/**
 * creates a font option for the temporary design control
 * @param name display name shown in the control
 * @param stack CSS font-family stack
 * @returns a selectable font option
 */
function font(name: string, stack: string): FontOption {
  return { name, stack };
}

/**
 * finds a configured font option by role and display name
 * @param role typography role to search
 * @param name display name to match
 * @returns the matching font option
 */
function findFont(role: FontRoleId, name: string): FontOption {
  const option = DESIGN_TWEAKER_FONTS[role].find((font) => font.name === name);

  if (!option) {
    throw new Error(`Missing ${role} font option: ${name}`);
  }

  return option;
}
