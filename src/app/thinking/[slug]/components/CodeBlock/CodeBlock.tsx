import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

import type { FC } from 'react';

/** props accepted by `CodeBlock` */
export type CodeBlockProps = {
  /** programming language label; reserved for future syntax highlighting */
  readonly language: string;
  /** monospaced caption rendered beneath the source (e.g. "harness.py — …") */
  readonly caption: string;
  /** raw source code rendered verbatim inside a `<pre>` */
  readonly source: string;
};

/**
 * editorial code listing matching the codex variant: hairline rules top and
 * bottom, JetBrains Mono on the paper background, label-caps file caption
 * beneath the source. imports `@fontsource/jetbrains-mono/{400,500}.css` at
 * module scope. JetBrains Mono is also used by `.codex-meta`, `.codex-themes`,
 * `.codex-back`, and `.code-inline` (all of which list it first in their
 * `var(--font-family-mono)` chain in `src/global.css`), so it is effectively
 * loaded on every codex essay route regardless of whether a code block is
 * present; this is intentional — the editorial design pairs the mono meta-line
 * with the serif body.
 * @param root0 source-listing input
 * @param root0.language syntax classification reserved for highlighting
 * @param root0.caption editorial label printed beneath the source
 * @param root0.source verbatim program text
 * @returns accessible source listing with a visible caption
 */
export const CodeBlock: FC<CodeBlockProps> = ({
  language,
  caption,
  source,
}) => (
  <figure className="codefigure">
    <pre data-language={language}>{source}</pre>
    <figcaption className="code-caption">{caption}</figcaption>
  </figure>
);
