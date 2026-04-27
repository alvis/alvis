'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useId } from 'react';

import { useDrawerControls } from '#hooks';

import { isCurrentRoute } from './data';

import type { Variants } from 'motion/react';
import type { FC, RefCallback } from 'react';

import type { NavLink, SocialLink } from './data';

// --- CONSTANTS --- //

const SERIF_FONT_STACK =
  '"Cormorant Garamond", Georgia, "Times New Roman", serif';
const CAPS_FONT_STACK = '"Raleway", system-ui, sans-serif';

// clip-path bloom timing
const BLOOM_DURATION_SECONDS = 0.55;
const REDUCED_MOTION_DURATION_SECONDS = 0.01;

// ease-out expo cubic-bezier control points
const EASE_X1 = 0.22;
const EASE_Y1 = 1;
const EASE_X2 = 0.36;
const EASE_Y2 = 1;
const EASE_OUT_EXPO: [number, number, number, number] = [
  EASE_X1,
  EASE_Y1,
  EASE_X2,
  EASE_Y2,
];

// link stagger timing
const STAGGER_CHILDREN_SECONDS = 0.06;
const DELAY_CHILDREN_SECONDS = 0.28;
const ITEM_DURATION_SECONDS = 0.25;
const ITEM_INITIAL_SCALE = 0.92;

// section split — first N links live in the top section, rest in the bottom
const TOP_LINK_COUNT = 3;

const linkListVariants: Variants = {
  open: {
    transition: {
      staggerChildren: STAGGER_CHILDREN_SECONDS,
      delayChildren: DELAY_CHILDREN_SECONDS,
    },
  },
  closed: {},
};

const linkItemVariants: Variants = {
  closed: { opacity: 0, scale: ITEM_INITIAL_SCALE },
  open: { opacity: 1, scale: 1 },
};

// --- ICONS --- //

/**
 * outline envelope icon used in the email contact button
 * @returns svg envelope glyph
 */
const EnvelopeIcon: FC = () => (
  <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
    <path
      d="M4.75 6.75h14.5v10.5H4.75z"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
    <path
      d="m5.25 7.25 6.75 5.5 6.75-5.5"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
    />
  </svg>
);

// --- ITEM --- //

type AlmanacLinkItemProps = {
  current: boolean;
  link: NavLink;
  index: number;
  numberOffset: number;
  itemTransition: { duration: number };
  firstLinkRef?: RefCallback<HTMLAnchorElement>;
  onClose: () => void;
};

/**
 * single numbered link row for the almanac drawer
 * @param root0 numbered-row input
 * @param root0.current whether this destination matches the current route
 * @param root0.link destination and visible label
 * @param root0.index zero-based position within its group
 * @param root0.numberOffset count of links in the preceding group
 * @param root0.itemTransition motion timing for entrance and exit
 * @param root0.firstLinkRef optional focus target for the first destination
 * @param root0.onClose callback after navigation is selected
 * @returns focusable destination with printed numbering
 */
const AlmanacLinkItem: FC<AlmanacLinkItemProps> = ({
  current,
  link,
  index,
  numberOffset,
  itemTransition,
  firstLinkRef,
  onClose,
}) => {
  const content = (
    <>
      <span
        aria-hidden="true"
        className="text-xs uppercase tracking-widest text-(--color-accent)"
        style={{ fontFamily: CAPS_FONT_STACK }}>
        {String(numberOffset + index + 1).padStart(2, '0')}
      </span>
      <span
        className={`text-4xl transition-colors duration-200 ${current ? 'text-(--color-accent)' : 'text-(--color-ink) group-hover:text-(--color-accent)'}`}
        style={{ fontFamily: SERIF_FONT_STACK }}>
        {link.label}
      </span>
    </>
  );

  return (
    <motion.li
      animate="open"
      initial="closed"
      style={{ transformOrigin: 'top right' }}
      transition={itemTransition}
      variants={linkItemVariants}>
      {current ? (
        <span aria-current="page" className="flex items-baseline gap-4">
          {content}
        </span>
      ) : (
        <Link
          className="group flex min-h-11 items-baseline gap-4"
          href={link.href}
          ref={firstLinkRef}
          onClick={onClose}>
          {content}
        </Link>
      )}
    </motion.li>
  );
};

// --- SECTIONS --- //

type AlmanacSectionProps = {
  pathname: string;
  links: readonly NavLink[];
  numberOffset: number;
  itemTransition: { duration: number };
  firstLinkRef?: RefCallback<HTMLAnchorElement>;
  onClose: () => void;
};

/**
 * render a numbered link list inside one of the drawer's two sections
 * @param props section props
 * @param props.pathname current browser pathname
 * @param props.links navigation links rendered in this section
 * @param props.numberOffset added to each index to produce the printed prefix
 * @param props.itemTransition motion transition applied to each list item
 * @param props.firstLinkRef optional ref attached to the first link for focus
 * @param props.onClose handler invoked when a link is activated
 * @returns rendered motion list
 */
const AlmanacLinkList: FC<AlmanacSectionProps> = ({
  pathname,
  links,
  numberOffset,
  itemTransition,
  firstLinkRef,
  onClose,
}) => {
  const firstFocusableIndex = firstLinkRef
    ? links.findIndex((link) => !isCurrentRoute(pathname, link.href))
    : -1;

  return (
    <motion.ul
      animate="open"
      className="flex flex-col gap-4"
      exit="closed"
      initial="closed"
      variants={linkListVariants}>
      {links.map((link, index) => (
        <AlmanacLinkItem
          current={isCurrentRoute(pathname, link.href)}
          firstLinkRef={
            index === firstFocusableIndex ? firstLinkRef : undefined
          }
          index={index}
          itemTransition={itemTransition}
          key={link.href}
          link={link}
          numberOffset={numberOffset}
          onClose={onClose}
        />
      ))}
    </motion.ul>
  );
};

type SocialRowProps = {
  socials: readonly SocialLink[];
};

/**
 * footer row of social/contact icons for the almanac drawer
 * @param root0 social-row input
 * @param root0.socials external destinations rendered as icon controls
 * @returns accessible external-link controls
 */
const SocialRow: FC<SocialRowProps> = ({ socials }) => (
  <div className="flex items-center gap-2">
    {socials.map((social) => (
      <a
        aria-label={social.label}
        className="flex size-11 items-center justify-center text-(--color-ink) transition hover:-translate-y-0.5 hover:text-(--color-accent)"
        href={social.href}
        key={social.label}
        rel="noopener noreferrer"
        target="_blank">
        <FontAwesomeIcon icon={social.icon} />
      </a>
    ))}
    <a
      aria-label="Email Alvis Tang"
      className="flex size-11 items-center justify-center text-(--color-ink) transition hover:-translate-y-0.5 hover:text-(--color-accent) [&>svg]:size-5"
      href="mailto:alvis@hilbert.space">
      <EnvelopeIcon />
    </a>
  </div>
);

type CloseButtonProps = {
  onClose: () => void;
};

/**
 * close button rendered in the top-right corner of the drawer panel
 * @param root0 dismiss-control input
 * @param root0.onClose callback invoked by pointer or keyboard activation
 * @returns labelled button with a close glyph
 */
const CloseButton: FC<CloseButtonProps> = ({ onClose }) => (
  <button
    aria-label="Close navigation menu"
    className="absolute top-5 right-5 flex size-11 items-center justify-center text-(--color-ink) transition hover:text-(--color-accent) [&>svg]:size-5"
    type="button"
    onClick={onClose}>
    <svg aria-hidden="true" fill="none" viewBox="0 0 24 24">
      <path
        d="m7 7 10 10M17 7 7 17"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  </button>
);

// --- DRAWER --- //

/** props accepted by `AlmanacDrawer` */
export type AlmanacDrawerProps = {
  /** whether the drawer is currently visible */
  open: boolean;
  /**
   * handler invoked when the drawer should close.
   *
   * named with the `Action` suffix to satisfy Next.js 16's serializable-prop
   * check for `"use client"` entry components: any function prop crossing the
   * server/client boundary must either be a Server Action or be named to
   * indicate one (`action` / `*Action`). this prop is a plain client-side
   * callback — the suffix is a naming convention only.
   */
  onCloseAction: () => void;
  /** dom id used by aria-controls on the trigger button */
  panelId: string;
  /** current browser pathname */
  pathname: string;
  /** whether the user prefers reduced motion */
  reducedMotion: boolean;
  /** primary navigation links rendered inside the drawer */
  links: readonly NavLink[];
  /** social and contact links rendered in the drawer footer */
  socials: readonly SocialLink[];
};

/**
 * almanac drawer — iris-bloom clip reveal with Marginalia two-section layout
 * and FieldNote numbered Cormorant Garamond link decorators
 * @param root0 drawer state and content
 * @param root0.open whether the modal surface is visible
 * @param root0.onCloseAction callback used by every dismiss path
 * @param root0.panelId identifier paired with the trigger aria-controls
 * @param root0.pathname active route used to mark the current destination
 * @param root0.reducedMotion whether to replace the iris animation
 * @param root0.links primary site destinations
 * @param root0.socials external identity and contact destinations
 * @returns responsive modal navigation with grouped destinations
 */
export const AlmanacDrawer: FC<AlmanacDrawerProps> = ({
  open,
  onCloseAction: onClose,
  panelId,
  pathname,
  reducedMotion,
  links,
  socials,
}) => {
  const { panelRef, firstLinkRef } = useDrawerControls({ open, onClose });
  const titleId = useId();

  const bloomDuration = reducedMotion
    ? REDUCED_MOTION_DURATION_SECONDS
    : BLOOM_DURATION_SECONDS;
  const itemTransition = {
    duration: reducedMotion
      ? REDUCED_MOTION_DURATION_SECONDS
      : ITEM_DURATION_SECONDS,
  };

  const topLinks = links.slice(0, TOP_LINK_COUNT);
  const bottomLinks = links.slice(TOP_LINK_COUNT);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50"
      exit={{ opacity: 0 }}
      initial={{ opacity: 1 }}
      onClick={onClose}>
      <motion.aside
        animate={{ clipPath: 'circle(150% at 100% 0%)' }}
        aria-labelledby={titleId}
        aria-modal="true"
        className="fixed inset-0 z-50 flex flex-col bg-(--color-paper)"
        exit={{ clipPath: 'circle(0% at 100% 0%)' }}
        id={panelId}
        initial={{ clipPath: 'circle(0% at 100% 0%)' }}
        ref={panelRef}
        role="dialog"
        transition={{ duration: bloomDuration, ease: EASE_OUT_EXPO }}
        onClick={(event) => event.stopPropagation()}>
        <CloseButton onClose={onClose} />
        <section className="flex flex-1 flex-col justify-center bg-(--color-paper-raised) px-8 pt-16 pb-6">
          <h2 className="sr-only" id={titleId}>
            Navigation
          </h2>
          <AlmanacLinkList
            firstLinkRef={firstLinkRef}
            itemTransition={itemTransition}
            links={topLinks}
            numberOffset={0}
            pathname={pathname}
            onClose={onClose}
          />
        </section>
        <div aria-hidden="true" className="mx-6 h-px bg-(--color-rule)" />
        <section className="flex flex-1 flex-col justify-between bg-(--color-paper) px-8 pt-6 pb-10">
          <AlmanacLinkList
            itemTransition={itemTransition}
            links={bottomLinks}
            numberOffset={TOP_LINK_COUNT}
            pathname={pathname}
            onClose={onClose}
          />
          <SocialRow socials={socials} />
        </section>
      </motion.aside>
    </motion.div>
  );
};

export { EnvelopeIcon };
