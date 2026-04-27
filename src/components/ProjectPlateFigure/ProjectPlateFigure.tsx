import type { FC, ReactElement, ReactNode } from 'react';

/** project display configuration with visual plate and annotations */
export interface ProjectPlate {
  /** figure caption engraved under the sketch */
  caption: string;
  /** word in the summary that carries the circled annotation */
  keyword: string;
  /** handwritten margin note beside the plate */
  note: string;
  /** hand-drawn artifact sketch mounted in the plate frame */
  sketch: ReactElement;
}

/** props accepted by `ProjectPlateFigure` */
export interface ProjectPlateFigureProps {
  /** plate to mount */
  plate: ProjectPlate;
}

/** hand-drawn figure plates keyed by project slug */
export const projectPlateBySlug: Record<string, ProjectPlate> = {
  'contexta': {
    caption: 'Fig. 1 — memory & provenance layers',
    keyword: 'context',
    note: 'the core bet',
    sketch: (
      <svg fill="none" viewBox="0 0 200 150">
        <circle className="plate-ink" cx="100" cy="75" r="62" />
        <circle className="plate-signal" cx="100" cy="75" r="42" />
        <circle className="plate-accent" cx="100" cy="75" r="23" />
        <circle className="plate-node" cx="100" cy="75" r="4" />
        <circle className="plate-node" cx="145" cy="44" r="2.5" />
        <circle className="plate-node" cx="48" cy="102" r="2.5" />
        <circle className="plate-node" cx="146" cy="110" r="2.5" />
      </svg>
    ),
  },
  'amino-ai': {
    caption: 'Fig. 2 — the delegation loop',
    keyword: 'judgment',
    note: 'who owns the work?',
    sketch: (
      <svg fill="none" viewBox="0 0 200 150">
        <path
          className="plate-accent"
          d="M64,112 C34,88 44,40 100,34 C150,29 172,62 162,96"
        />
        <path className="plate-accent" d="M168,84 L162,96 L151,90" />
        <circle className="plate-signal" cx="100" cy="76" r="30" />
        <circle className="plate-node" cx="64" cy="112" r="4" />
        <circle className="plate-node" cx="100" cy="34" r="2.5" />
      </svg>
    ),
  },
  'work-for-future': {
    caption: 'Fig. 3 — paths a person can steer',
    keyword: 'agency',
    note: 'the human half',
    sketch: (
      <svg fill="none" viewBox="0 0 200 150">
        <path className="plate-ink" d="M24,75 C56,75 68,75 92,72" />
        <path className="plate-accent" d="M92,72 C128,60 148,42 174,30" />
        <path className="plate-signal" d="M92,72 C128,74 150,76 176,74" />
        <path className="plate-olive" d="M92,72 C124,86 144,104 168,118" />
        <circle className="plate-node" cx="24" cy="75" r="4" />
        <circle className="plate-node" cx="174" cy="30" r="2.5" />
        <circle className="plate-node" cx="176" cy="74" r="2.5" />
        <circle className="plate-node" cx="168" cy="118" r="2.5" />
      </svg>
    ),
  },
  'presetter': {
    caption: 'Fig. 4 — decisions that ship',
    keyword: 'decisions',
    note: 'write it once',
    sketch: (
      <svg fill="none" viewBox="0 0 200 150">
        <rect
          className="plate-ink"
          height="46"
          rx="3"
          width="78"
          x="44"
          y="72"
        />
        <rect
          className="plate-ink"
          height="46"
          rx="3"
          width="78"
          x="56"
          y="56"
        />
        <rect
          className="plate-accent"
          height="46"
          rx="3"
          width="78"
          x="68"
          y="40"
        />
        <path className="plate-signal" d="M146,86 C168,92 176,108 178,126" />
        <path className="plate-signal" d="M122,118 C124,130 120,138 112,142" />
        <path className="plate-signal" d="M44,104 C34,114 26,124 22,134" />
        <circle className="plate-node" cx="107" cy="63" r="4" />
        <circle className="plate-node" cx="178" cy="126" r="2.5" />
        <circle className="plate-node" cx="112" cy="142" r="2.5" />
        <circle className="plate-node" cx="22" cy="134" r="2.5" />
      </svg>
    ),
  },
  'field-notes': {
    caption: 'Fig. 5 — the public notebook',
    keyword: 'notebook',
    note: 'thinking in public',
    sketch: (
      <svg fill="none" viewBox="0 0 200 150">
        <path
          className="plate-ink"
          d="M100,32 C76,24 48,24 30,30 L30,118 C48,112 76,112 100,120 C124,112 152,112 170,118 L170,30 C152,24 124,24 100,32 Z"
        />
        <path className="plate-ink" d="M100,32 L100,120" />
        <path className="plate-signal" d="M42,52 C60,48 78,48 90,52" />
        <path className="plate-signal" d="M42,68 C60,64 78,64 90,68" />
        <path className="plate-signal" d="M42,84 C60,80 74,80 84,84" />
        <circle className="plate-accent" cx="134" cy="66" r="16" />
        <path className="plate-olive" d="M118,96 C130,90 142,92 154,98" />
        <circle className="plate-node" cx="134" cy="66" r="2.5" />
      </svg>
    ),
  },
};

/**
 * wraps the first occurrence of a keyword so it carries the circled annotation
 * @param summary project summary copy
 * @param keyword word to circle
 * @returns summary with the keyword wrapped for styling
 */
export const circleKeyword = (summary: string, keyword: string): ReactNode => {
  const keywordIndex = summary.indexOf(keyword);

  return keywordIndex === -1 ? (
    summary
  ) : (
    <>
      {summary.slice(0, keywordIndex)}
      <span className="project-keyword">{keyword}</span>
      {summary.slice(keywordIndex + keyword.length)}
    </>
  );
};

/**
 * renders a project figure mounted in a hairline plate frame with
 * registration marks, an engraved caption, and a handwritten margin note
 * @param props component props
 * @param props.plate plate to mount
 * @returns decorative mounted figure plate
 */
export const ProjectPlateFigure: FC<ProjectPlateFigureProps> = ({ plate }) => (
  <div aria-hidden="true" className="project-plate-mount">
    <figure className="project-plate" data-asset-diagram={plate.keyword}>
      <span className="plate-reg plate-reg-tl" />
      <span className="plate-reg plate-reg-tr" />
      <span className="plate-reg plate-reg-bl" />
      <span className="plate-reg plate-reg-br" />
      {plate.sketch}
      <figcaption>{plate.caption}</figcaption>
    </figure>
    <span className="project-plate-note">{plate.note}</span>
  </div>
);
