import { useCallback, useEffect, useRef } from 'react';

import type { RefCallback, RefObject } from 'react';

/** parameters accepted by `useDrawerControls` */
export type UseDrawerControlsParams = {
  /** whether the drawer is currently visible */
  open: boolean;
  /** handler invoked when the drawer should close */
  onClose: () => void;
};

/** return shape of `useDrawerControls` */
export type UseDrawerControlsResult = {
  /** ref attached to the panel container (used for focus trap scoping) */
  panelRef: RefObject<HTMLElement | null>;
  /** callback ref attached to the first link to autofocus on open */
  firstLinkRef: RefCallback<HTMLAnchorElement>;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])';

/**
 * lock page scroll while preserving the user's scroll position
 * @returns cleanup function that restores mutated styles and scroll position
 */
function lockBodyScroll(): () => void {
  const html = document.documentElement;
  const { body } = document;
  const scrollY = window.scrollY;
  const previousHtmlOverflow = html.style.overflow;
  const previousBodyOverflow = body.style.overflow;
  const previousBodyPosition = body.style.position;
  const previousBodyTop = body.style.top;
  const previousBodyWidth = body.style.width;

  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${scrollY}px`;
  body.style.width = '100%';

  return () => {
    html.style.overflow = previousHtmlOverflow;
    body.style.overflow = previousBodyOverflow;
    body.style.position = previousBodyPosition;
    body.style.top = previousBodyTop;
    body.style.width = previousBodyWidth;
    window.scrollTo(0, scrollY);
  };
}

/**
 * build a keydown handler that closes on Escape and traps Tab focus within the panel
 * @param onClose handler invoked on Escape
 * @param panelRef ref to the dialog panel containing focusable elements
 * @returns keydown event handler
 */
function createKeyHandler(
  onClose: () => void,
  panelRef: RefObject<HTMLElement | null>,
): (event: KeyboardEvent) => void {
  return (event) => {
    if (event.key === 'Escape') {
      onClose();

      return;
    }
    if (event.key !== 'Tab' || !panelRef.current) {
      return;
    }
    const panel = panelRef.current;
    const focusables = Array.from(
      panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((element) => !element.hasAttribute('disabled'));
    if (focusables.length === 0) {
      return;
    }
    const first = focusables[0]!;
    const last = focusables[focusables.length - 1]!;
    const active = document.activeElement;
    const activeInPanel = active instanceof Node && panel.contains(active);
    if (!activeInPanel) {
      event.preventDefault();
      first.focus();

      return;
    }
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };
}

/**
 * shared drawer behaviour: escape close, scroll lock, focus management, and tab trap
 * @param params drawer state and close handler
 * @param params.open whether the drawer is currently visible
 * @param params.onClose handler invoked when the drawer should close
 * @returns panel ref and a focus-on-mount callback ref for the first link
 */
export function useDrawerControls(
  params: UseDrawerControlsParams,
): UseDrawerControlsResult {
  const { open, onClose } = params;
  const panelRef = useRef<HTMLElement | null>(null);

  const firstLinkRef = useCallback<RefCallback<HTMLAnchorElement>>(
    (node) => {
      if (open && node) {
        node.focus();
      }
    },
    [open],
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const releaseScroll = lockBodyScroll();
    const handleKey = createKeyHandler(onClose, panelRef);
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('keydown', handleKey);
      releaseScroll();
    };
  }, [open, onClose]);

  return { panelRef, firstLinkRef };
}
