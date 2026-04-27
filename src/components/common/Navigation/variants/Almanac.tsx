'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'motion/react';
import Link from 'next/link';
import { useId } from 'react';

import { useDrawerControls } from '../useDrawerControls';

import { EnvelopeIcon } from './types';

import type { Variants } from 'motion/react';
import type { FC, RefCallback } from 'react';

import type { DrawerProps } from './types';

const SERIF_FONT_STACK =
  '"Cormorant Garamond", Georgia, "Times New Roman", serif';
const CAPS_FONT_STACK = '"Raleway", system-ui, sans-serif';

// clip-path bloom timing
const BLOOM_DURATION_SECONDS = 0.55;
const REDUCED_MOTION_DURATION_SECONDS = 0.01;
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

// section split
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

interface AlmanacLinkItemProps {
  link: DrawerProps['links'][number];
  index: number;
  numberOffset: number;
  itemTransition: { duration: number };
  firstLinkRef?: RefCallback<HTMLAnchorElement>;
  onClose: () => void;
}

/**
 * single numbered link row for the almanac drawer
 * @param props almanac link item props
 * @param props.link nav link data (href and label)
 * @param props.index zero-based position within its section
 * @param props.numberOffset added to index to produce the printed prefix (e.g. 3 for bottom section)
 * @param props.itemTransition motion transition applied to the list item
 * @param props.firstLinkRef optional ref attached when this is the first link overall
 * @param props.onClose handler invoked when the link is activated
 * @returns rendered motion list item
 */
const AlmanacLinkItem: FC<AlmanacLinkItemProps> = ({
  link,
  index,
  numberOffset,
  itemTransition,
  firstLinkRef,
  onClose,
}) => (
  <motion.li
    style={{ transformOrigin: 'top right' }}
    transition={itemTransition}
    variants={linkItemVariants}>
    <Link
      className="group flex items-baseline gap-4"
      href={link.href}
      ref={firstLinkRef}
      onClick={onClose}>
      <span
        aria-hidden="true"
        className="text-xs uppercase tracking-widest text-[#A64B2A]"
        style={{ fontFamily: CAPS_FONT_STACK }}>
        {String(numberOffset + index + 1).padStart(2, '0')}
      </span>
      <span
        className="text-4xl text-[#162747] transition-colors duration-200 group-hover:text-[#A64B2A]"
        style={{ fontFamily: SERIF_FONT_STACK }}>
        {link.label}
      </span>
    </Link>
  </motion.li>
);

interface TopSectionProps {
  links: DrawerProps['links'];
  titleId: string;
  itemTransition: { duration: number };
  firstLinkRef: RefCallback<HTMLAnchorElement>;
  onClose: () => void;
}

/**
 * upper amber-wash section with page title and first link group (Home, About, Now)
 * @param props top section props
 * @param props.links navigation links for the top section
 * @param props.titleId id used by the parent dialog's aria-labelledby
 * @param props.itemTransition motion transition applied to each list item
 * @param props.firstLinkRef ref attached to the first link for focus management
 * @param props.onClose handler invoked when a link is activated
 * @returns rendered top section
 */
const TopSection: FC<TopSectionProps> = ({
  links,
  titleId,
  itemTransition,
  firstLinkRef,
  onClose,
}) => (
  <section className="flex flex-1 flex-col justify-center bg-[#fff9ee] px-8 pt-16 pb-6">
    <h2 className="sr-only" id={titleId}>
      Navigation
    </h2>
    <motion.ul
      animate="open"
      className="flex flex-col gap-4"
      exit="closed"
      initial="closed"
      variants={linkListVariants}>
      {links.map((link, index) => (
        <AlmanacLinkItem
          firstLinkRef={index === 0 ? firstLinkRef : undefined}
          index={index}
          itemTransition={itemTransition}
          key={link.href}
          link={link}
          numberOffset={0}
          onClose={onClose}
        />
      ))}
    </motion.ul>
  </section>
);

interface BottomSectionProps {
  links: DrawerProps['links'];
  socials: DrawerProps['socials'];
  itemTransition: { duration: number };
  onClose: () => void;
}

/**
 * lower neutral-paper section with remaining links (Work, Thinking) and social row
 * @param props bottom section props
 * @param props.links navigation links for the bottom section
 * @param props.socials social and contact links
 * @param props.itemTransition motion transition applied to each list item
 * @param props.onClose handler invoked when a link is activated
 * @returns rendered bottom section
 */
const BottomSection: FC<BottomSectionProps> = ({
  links,
  socials,
  itemTransition,
  onClose,
}) => (
  <section className="flex flex-1 flex-col justify-between bg-[#f7f1e6] px-8 pt-6 pb-10">
    <motion.ul
      animate="open"
      className="flex flex-col gap-4"
      exit="closed"
      initial="closed"
      variants={linkListVariants}>
      {links.map((link, index) => (
        <AlmanacLinkItem
          index={index}
          itemTransition={itemTransition}
          key={link.href}
          link={link}
          numberOffset={TOP_LINK_COUNT}
          onClose={onClose}
        />
      ))}
    </motion.ul>

    <div className="flex items-center gap-2">
      {socials.map((social) => (
        <a
          aria-label={social.label}
          className="flex size-11 items-center justify-center text-[#162747] transition hover:-translate-y-0.5 hover:text-[#A64B2A]"
          href={social.href}
          key={social.label}
          rel="noopener noreferrer"
          target="_blank">
          <FontAwesomeIcon icon={social.icon} />
        </a>
      ))}
      <a
        aria-label="Email Alvis Tang"
        className="flex size-11 items-center justify-center text-[#162747] transition hover:-translate-y-0.5 hover:text-[#A64B2A] [&>svg]:size-5"
        href="mailto:alvis@hilbert.space">
        <EnvelopeIcon />
      </a>
    </div>
  </section>
);

/**
 * almanac drawer variant — iris-bloom clip reveal with Marginalia two-section
 * layout and FieldNote numbered Cormorant Garamond link decorators
 * @param props drawer props
 * @param props.open whether the drawer is currently visible
 * @param props.onClose handler invoked when the drawer should close
 * @param props.links primary navigation links rendered in the panel
 * @param props.socials social and contact links rendered in the footer row
 * @param props.reducedMotion whether reduced motion preference is active
 * @param props.panelId dom id used by aria-controls on the trigger button
 * @returns almanac drawer panel element
 */
export const Almanac: FC<DrawerProps> = ({
  open,
  onClose,
  links,
  socials,
  reducedMotion,
  panelId,
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
        className="fixed inset-0 z-50 flex flex-col bg-[#f7f1e6]"
        exit={{ clipPath: 'circle(0% at 100% 0%)' }}
        id={panelId}
        initial={{ clipPath: 'circle(0% at 100% 0%)' }}
        ref={panelRef}
        role="dialog"
        transition={{ duration: bloomDuration, ease: EASE_OUT_EXPO }}
        onClick={(event) => event.stopPropagation()}>
        <button
          aria-label="Close navigation menu"
          className="absolute top-5 right-5 flex size-11 items-center justify-center text-[#162747] transition hover:text-[#A64B2A] [&>svg]:size-5"
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
        <TopSection
          firstLinkRef={firstLinkRef}
          itemTransition={itemTransition}
          links={topLinks}
          titleId={titleId}
          onClose={onClose}
        />
        <div aria-hidden="true" className="mx-6 h-px bg-[#D8C9B4]" />
        <BottomSection
          itemTransition={itemTransition}
          links={bottomLinks}
          socials={socials}
          onClose={onClose}
        />
      </motion.aside>
    </motion.div>
  );
};
