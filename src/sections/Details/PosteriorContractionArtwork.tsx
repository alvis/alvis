import type { FC } from 'react';

/**
 * Animated uncertainty field converging around an authored trajectory.
 * @returns decorative posterior-contraction artwork
 */
export const PosteriorContractionArtwork: FC = () => (
  <svg
    aria-hidden="true"
    className="posterior-contraction-artwork"
    fill="none"
    focusable="false"
    preserveAspectRatio="none"
    viewBox="0 0 1000 560">
    <defs>
      <linearGradient id="posterior-band" x1="0" x2="1" y1="0" y2="0">
        <stop
          offset="0"
          stopColor="var(--diagram-signal, #9eb9d7)"
          stopOpacity="0.04"
        />
        <stop
          offset="0.58"
          stopColor="var(--diagram-signal, #9eb9d7)"
          stopOpacity="0.2"
        />
        <stop
          offset="1"
          stopColor="var(--diagram-accent, #df8960)"
          stopOpacity="0.38"
        />
      </linearGradient>
    </defs>
    <path
      className="posterior-prior"
      d="M-40 490C180 270 350 470 520 276S790 95 1040 70"
    />
    <path
      className="posterior-prior"
      d="M-40 390C190 520 330 225 540 335S800 120 1040 70"
    />
    <path
      className="posterior-prior"
      d="M-40 235C160 110 365 425 535 250S805 86 1040 70"
    />
    <path
      className="posterior-prior"
      d="M-40 530C120 320 310 170 525 305S810 110 1040 70"
    />
    <path
      className="posterior-prior"
      d="M-40 120C200 345 330 100 520 285S810 128 1040 70"
    />
    <path
      className="posterior-prior"
      d="M-40 315C210 140 360 520 530 295S800 100 1040 70"
    />
    <path
      className="posterior-credible-band"
      d="M-40 520C180 460 350 360 520 290S800 125 1040 52L1040 88C805 145 650 255 520 320S190 535-40 555Z"
      fill="url(#posterior-band)"
    />
  </svg>
);
