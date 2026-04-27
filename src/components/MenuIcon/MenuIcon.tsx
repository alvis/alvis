'use client';

import { motion, useReducedMotion } from 'motion/react';

import type { Transition, TargetAndTransition } from 'motion/react';
import type { FC, ReactElement } from 'react';

/** props for the animated menu icon */
export type MenuIconProps = {
  /** whether the drawer is currently open (determines the X vs hamburger state) */
  open: boolean;
};

/** shared stroke styling applied to every animated bar */
const SHARED_STROKE = {
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
} as const;

/** styling helper that pins the rotation origin to the icon center */
const CENTER_ORIGIN = { transformOrigin: '50% 50%' } as const;

const BAR_X1 = 5;
const BAR_X2 = 19;
const BAR_TOP_Y = 7;
const BAR_MID_Y = 12;
const BAR_BOTTOM_Y = 17;

/**
 * vertical translate applied to top/bottom bars so they meet at the center on open
 */
const X_CONVERGE_Y = 5;

/** rotation magnitude (degrees) used for the open-state X */
const X_ROTATION = 45;

/** shrink factor used during the pinch phase */
const PINCH_SCALE = 0.1;

/** mid-point of a normalised keyframe timeline */
const KEYFRAME_MID = 0.5;

/** three-stop keyframe timeline for two-phase animations */
const TWO_PHASE_TIMES: readonly number[] = [0, KEYFRAME_MID, 1];

/** default animation duration in seconds for the almanac drawer morph */
const DURATION_DEFAULT = 0.5;

/** duration applied when the user prefers reduced motion */
const DURATION_REDUCED = 0.01;

/**
 * build the motion transition descriptor honouring reduced-motion preference
 * @param reducedMotion true when the user prefers reduced motion
 * @returns motion transition descriptor
 */
function getTransition(reducedMotion: boolean): Transition {
  if (reducedMotion) {
    return { duration: DURATION_REDUCED };
  }

  return { duration: DURATION_DEFAULT, ease: 'easeInOut' };
}

/** shape of a single animated element within the icon */
type BarSpec = {
  key: string;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  closed: TargetAndTransition;
  open: TargetAndTransition;
};

type BarCoords = Pick<BarSpec, 'x1' | 'x2' | 'y1' | 'y2'>;

const TOP: BarCoords = {
  x1: BAR_X1,
  x2: BAR_X2,
  y1: BAR_TOP_Y,
  y2: BAR_TOP_Y,
};
const MID: BarCoords = {
  x1: BAR_X1,
  x2: BAR_X2,
  y1: BAR_MID_Y,
  y2: BAR_MID_Y,
};
const BOTTOM: BarCoords = {
  x1: BAR_X1,
  x2: BAR_X2,
  y1: BAR_BOTTOM_Y,
  y2: BAR_BOTTOM_Y,
};

/** almanac/irisbloom spec — bars pinch inward then re-expand into an X */
const ALMANAC_SPEC: readonly BarSpec[] = [
  {
    key: 'top',
    ...TOP,
    closed: { scaleX: 1, rotate: 0, y: 0 },
    open: {
      scaleX: [1, PINCH_SCALE, 1],
      rotate: [0, 0, X_ROTATION],
      y: [0, 0, X_CONVERGE_Y],
    },
  },
  {
    key: 'mid',
    ...MID,
    closed: { scaleX: 1, opacity: 1 },
    open: { scaleX: [1, 0, 0], opacity: [1, 0, 0] },
  },
  {
    key: 'bottom',
    ...BOTTOM,
    closed: { scaleX: 1, rotate: 0, y: 0 },
    open: {
      scaleX: [1, PINCH_SCALE, 1],
      rotate: [0, 0, -X_ROTATION],
      y: [0, 0, -X_CONVERGE_Y],
    },
  },
];

/**
 * render a single bar spec as a motion line
 * @param spec descriptor for the bar
 * @param open true when the drawer is open
 * @param transition base transition descriptor
 * @returns rendered motion element
 */
function renderBar(
  spec: BarSpec,
  open: boolean,
  transition: Transition,
): ReactElement {
  return (
    <motion.line
      animate={open ? spec.open : spec.closed}
      initial={spec.closed}
      key={spec.key}
      style={CENTER_ORIGIN}
      transition={{ ...transition, times: [...TWO_PHASE_TIMES] }}
      x1={spec.x1}
      x2={spec.x2}
      y1={spec.y1}
      y2={spec.y2}
      {...SHARED_STROKE}
    />
  );
}

/**
 * animated hamburger-to-X menu icon used by the navigation drawer trigger
 * @param root0 icon state input
 * @param root0.open whether the bars should resolve into a close glyph
 * @returns animated bars in the requested state
 */
export const MenuIcon: FC<MenuIconProps> = ({ open }) => {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const transition = getTransition(prefersReducedMotion);

  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      {ALMANAC_SPEC.map((bar) => renderBar(bar, open, transition))}
    </svg>
  );
};
