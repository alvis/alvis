import Image from 'next/image';
import Link from 'next/link';

import type { FC } from 'react';

import type { BlogVariantProps } from './types';

/**
 * number of leading slug characters used to fabricate the field-note file
 * code shown in the logbook header (e.g. `why-` → `FN-WHY-`)
 */
const FILE_CODE_PREFIX_LENGTH = 4;

/**
 * checklist items rendered in the logbook aside; declared at module scope so
 * the main render function stays under the per-function line limit
 */
const OPERATIONAL_LAYERS: readonly string[] = [
  'Durable vs. ephemeral memory boundary',
  'Tools with explicit permissions + typed failures',
  'Operational guardrails (not just refusal policies)',
  'Feedback loops from real world to detect drift',
];

interface LogbookFileBarProps {
  readonly fileCode: string;
  readonly isoDate: string;
}

/**
 * monospaced banner above the logbook entry that mimics a field-note file
 * header with file id, date, observer, status, and version columns
 * @param props bar props
 * @param props.fileCode synthesized field-note file code (e.g. `FN-WHY-`)
 * @param props.isoDate iso-formatted essay date
 * @returns header bar element
 */
const LogbookFileBar: FC<LogbookFileBarProps> = ({ fileCode, isoDate }) => (
  <header className="flex flex-wrap items-center justify-between gap-4 border border-[#162747] bg-[#f7f1e6] px-4 py-3 font-mono text-[0.75rem] text-[#162747]">
    <div className="flex flex-wrap gap-x-5 gap-y-1">
      <span>
        FILE{' '}
        <strong className="font-medium text-[#a64b2a]">{fileCode}</strong>
      </span>
      <span>
        DATE <strong className="font-medium text-[#a64b2a]">{isoDate}</strong>
      </span>
      <span>
        OBSERVER{' '}
        <strong className="font-medium text-[#a64b2a]">A. Tang</strong>
      </span>
    </div>
    <div className="flex flex-wrap gap-x-5 gap-y-1">
      <span>
        STATUS{' '}
        <strong className="font-medium text-[#a64b2a]">PUBLISHED</strong>
      </span>
      <span>
        VER <strong className="font-medium text-[#a64b2a]">0.1.0</strong>
      </span>
    </div>
  </header>
);

/**
 * field-note checklist of operational reliability layers rendered alongside
 * the body of the logbook entry
 * @returns checklist aside element
 */
const OperationalChecklist: FC = () => (
  <aside
    aria-label="Operational checklist"
    className="my-8 border border-[#d8c9b4] bg-[#f7f1e6] px-5 py-4 font-mono text-[0.82rem] leading-relaxed text-[#162747]">
    <h2 className="mb-2 font-mono text-[0.74rem] font-medium tracking-[0.12em] text-[#a64b2a] uppercase">
      Operational layers — checklist
    </h2>
    <ul className="m-0 list-none p-0">
      {OPERATIONAL_LAYERS.map((item) => (
        <li
          className="before:text-[#a64b2a] before:content-['[_]_']"
          key={item}>
          {item}
        </li>
      ))}
    </ul>
  </aside>
);

/**
 * "Logbook" blog variant: grid-paper background, monospaced metadata bar and
 * field-note ledger with section markers (§ 01, § 02 …) on each paragraph.
 * @param props variant props
 * @param props.essay essay to render
 * @returns logbook-styled article element
 */
export const Logbook: FC<BlogVariantProps> = ({ essay }) => {
  const fileCode = `FN-${essay.slug.slice(0, FILE_CODE_PREFIX_LENGTH).toUpperCase()}`;
  const isoDate = formatIsoDate(essay.date);
  const paragraphCount = essay.body.length;

  return (
    <div className="logbook-paper">
      <div className="mx-auto max-w-[1100px] px-4 pt-10 pb-20 sm:px-8">
        <LogbookFileBar fileCode={fileCode} isoDate={isoDate} />

        <article
          aria-labelledby="logbook-title"
          className="relative mt-8 border border-[#d8c9b4] bg-[#fff9ee] p-6 sm:p-10">
          <span
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-6 w-px bg-[repeating-linear-gradient(to_bottom,#a64b2a_0_4px,transparent_4px_12px)] opacity-55"
          />

          <dl className="mb-7 grid grid-cols-1 gap-y-1 font-mono text-[0.75rem] leading-relaxed text-[#162747] sm:grid-cols-[7rem_1fr] sm:gap-x-5">
            <dt className="tracking-[0.06em] text-[#a64b2a] uppercase">
              Subject
            </dt>
            <dd className="m-0">{essay.category} — production reliability</dd>
            <dt className="tracking-[0.06em] text-[#a64b2a] uppercase">Type</dt>
            <dd className="m-0">Field note / essay</dd>
            <dt className="tracking-[0.06em] text-[#a64b2a] uppercase">
              Reading
            </dt>
            <dd className="m-0">
              {essay.readingTime} · {paragraphCount} paragraphs
            </dd>
            <dt className="tracking-[0.06em] text-[#a64b2a] uppercase">
              References
            </dt>
            <dd className="m-0">{essay.tags.join(' · ')}</dd>
          </dl>

          <h1
            className="mt-1 mb-3 max-w-[28ch] text-[clamp(2rem,4vw,3rem)] leading-[1.06] font-medium tracking-[-0.005em] text-[#162747]"
            id="logbook-title">
            {essay.title}
          </h1>
          <p className="m-0 mb-8 max-w-[56ch] border-l-2 border-[#a64b2a] pl-5 text-[1.18rem] leading-[1.55] text-[#162747]/72">
            {essay.summary}
          </p>

          <figure
            aria-label={essay.imageAlt}
            className="relative my-8 border border-dashed border-[#162747] bg-[#f7f1e6] p-1">
            <span
              aria-hidden="true"
              className="absolute -top-1 -right-1 size-8 border-t border-r border-[#a64b2a]"
            />
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#fff9ee]">
              <Image
                fill
                alt={essay.imageAlt}
                className="object-cover opacity-90 mix-blend-multiply"
                placeholder="blur"
                sizes="(max-width: 1100px) 92vw, 1100px"
                src={essay.image}
              />
            </div>
            <figcaption className="mt-2 px-1 font-mono text-[0.74rem] text-[#162747]/72">
              <b className="font-medium text-[#a64b2a]">FIG. 01.</b>{' '}
              {essay.imageAlt}
            </figcaption>
          </figure>

          <section className="logbook-body font-[var(--font-family-display)] text-[#162747]">
            {essay.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <OperationalChecklist />

          <footer className="mt-8 flex flex-wrap justify-between gap-4 border-t border-[#d8c9b4] pt-4 font-mono text-[0.74rem] text-[#162747]/72">
            <span className="flex flex-wrap gap-x-3">
              {essay.tags.map((tag) => (
                <span
                  className="text-[#a64b2a] before:opacity-70 before:content-['#']"
                  key={tag}>
                  {tag.toLowerCase().replace(/\s+/g, '-')}
                </span>
              ))}
            </span>
            <span>END OF ENTRY · {fileCode}</span>
          </footer>

          <div className="mt-8">
            <Link
              className="font-mono text-[0.78rem] tracking-[0.08em] text-[#162747] uppercase underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a64b2a]"
              href="/thinking">
              <span aria-hidden="true">&lt;-</span> Back to thinking
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

/**
 * convert a human date string like "May 02, 2025" into an ISO-formatted
 * yyyy-mm-dd string for the logbook header; falls back to the original
 * value when parsing fails
 * @param value human-readable essay date string
 * @returns iso-formatted date string or the original value if invalid
 */
function formatIsoDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toISOString().slice(0, 'yyyy-mm-dd'.length);
}
