import type { FC, PropsWithChildren } from 'react';

/**
 * Route template that replays the lightweight page-entry transition on navigation.
 * @param props template props
 * @param props.children active route content
 * @returns animated route wrapper
 */
export default (function Template({ children }) {
  return <div className="page-transition">{children}</div>;
} satisfies FC<PropsWithChildren>);
