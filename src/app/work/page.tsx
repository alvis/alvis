import { Header } from '#components';
import { projects } from '#content';

import { ProjectTabs } from './components/ProjectTabs';

import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = {
  title: 'Work and Projects - Alvis Tang',
  description:
    'Contexta, Amino.ai, Work for Future, and related experiments from Alvis Tang.',
};

const contextaBrief = [
  {
    label: 'Buyer',
    body: 'Product and operations teams putting agents into recurring, consequential workflows.',
  },
  {
    label: 'Broken workflow',
    body: 'Context is scattered across meetings, documents, and tools, so nobody can inspect why an agent believes or acts.',
  },
  {
    label: 'Product now',
    body: 'An inspectable layer for memory, source provenance, unresolved assumptions, and decision history before action.',
  },
  {
    label: 'Next milestone',
    body: 'A design-partner workflow carried from briefing to action with its evidence and human checkpoints intact.',
  },
];

const workingPrinciples = [
  'Write decisions down while the context is still warm.',
  'Expose uncertainty early; quiet ambiguity becomes expensive later.',
  'Ship narrow vertical slices that a real person can challenge.',
  'Keep human judgment visible at every delegation boundary.',
];

/**
 * explicit company wedge and current design-partner milestone
 * @returns primary Contexta company brief
 */
const ContextaBrief: FC = () => (
  <section className="section-transition section-transition-ink relative overflow-visible bg-(--color-ink) py-14 text-(--color-paper-raised) md:py-20">
    <div className="site-shell">
      <div className="grid gap-8 lg:grid-cols-[0.6fr_1fr] lg:items-end">
        <div>
          <p className="label-caps text-(--color-on-ink-accent)">
            Primary company / Contexta
          </p>
          <h2 className="mt-5 max-w-3xl text-5xl leading-[1] font-medium text-balance sm:text-7xl">
            Accountable context for agents doing consequential work.
          </h2>
        </div>
        <div>
          <p className="max-w-2xl text-xl leading-8 text-(--color-on-ink)">
            The wedge is not a better chat window. It is the moment a team needs
            to trust an agent across systems, over time, and still recover the
            evidence behind its next move.
          </p>
          <a
            className="mission-primary-link mission-primary-link-light mt-7"
            href="mailto:alvis@hilbert.space?subject=Contexta%20design%20partner">
            Bring one workflow <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>

      <dl className="mt-12 grid border-y border-white/20 md:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-white/20">
        {contextaBrief.map((item) => (
          <div
            className="border-b border-white/20 py-6 xl:border-b-0 xl:px-6 xl:first:pl-0"
            key={item.label}>
            <dt className="label-caps text-(--color-on-ink-accent)">
              {item.label}
            </dt>
            <dd className="mt-4 text-lg leading-7 text-(--color-on-ink)">
              {item.body}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  </section>
);

/**
 * concrete invitation and working culture for future collaborators
 * @returns collaboration brief and operating principles
 */
const ComeBuild: FC = () => (
  <section className="section-transition section-transition-raised relative overflow-visible border-y border-(--color-rule) bg-(--color-paper-raised)/70 py-14 md:py-20">
    <div className="site-shell grid gap-10 lg:grid-cols-[0.68fr_1fr] lg:gap-16">
      <div>
        <p className="label-caps text-(--color-accent)">Come build this</p>
        <h2 className="mt-5 text-4xl leading-[1.06] font-medium text-balance sm:text-6xl">
          A small, founder-led product problem—still close to code, users, and
          first principles.
        </h2>
        <p className="mt-6 text-xl leading-8">
          I want to meet product-minded engineers who care about agent
          reliability, knowledge systems, and interfaces that make trust
          inspectable. The immediate problem is to take one high-context
          workflow from memory capture through accountable action.
        </p>
        <p className="mt-5 text-lg leading-8 text-(--color-ink-soft)">
          Based in London. Start with the problem; then decide what the right
          collaboration should become.
        </p>
        <a
          className="mission-primary-link mt-8"
          href="mailto:alvis@hilbert.space?subject=Building%20Contexta">
          Talk about building Contexta <span aria-hidden="true">↗</span>
        </a>
      </div>
      <div>
        <p className="label-caps mb-5 text-(--color-accent)">How we work</p>
        <ol className="divide-y divide-(--color-rule) border-y border-(--color-rule)">
          {workingPrinciples.map((principle, index) => (
            <li
              className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 text-xl leading-8"
              key={principle}>
              <span className="font-mono text-xs text-(--color-accent)">
                0{index + 1}
              </span>
              {principle}
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

/** work page */
export default (function WorkPage() {
  return (
    <>
      <Header />
      <main
        className="relative isolate overflow-hidden"
        id="main-content"
        tabIndex={-1}>
        <div aria-hidden="true" className="section-wash section-wash-left" />
        <section className="site-shell py-12 md:py-18">
          <p className="eyebrow mb-6">Work / Projects</p>
          <h1 className="max-w-4xl text-[2.4rem] leading-[1.02] font-medium text-balance sm:text-6xl">
            Building at the intersection of context-aware AI, human purpose, and
            future-of-work systems.
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8">
            These projects are connected by one question: what would software
            look like if it helped people hold more context, make better
            decisions, and delegate work without losing authorship?
          </p>
        </section>

        <ContextaBrief />

        <section className="section-transition section-transition-paper site-shell relative overflow-visible pt-14 pb-14 md:pt-20 md:pb-20">
          <ProjectTabs projects={projects} />
        </section>

        <ComeBuild />

        <section className="section-transition section-transition-sunk relative overflow-visible border-y border-(--color-rule) bg-(--color-paper-sunk)/68 py-12 md:py-16">
          <div className="site-shell grid gap-8 lg:grid-cols-[0.65fr_1fr]">
            <h2 className="text-4xl leading-[1.08] font-medium sm:text-5xl">
              What I want the work to prove.
            </h2>
            <div className="grid gap-5 text-xl leading-8">
              <p>
                AI agents become useful when they understand the context of the
                work, not just the syntax of the request.
              </p>
              <p>
                Production trust requires provenance: people should be able to
                inspect sources, assumptions, decisions, and actions.
              </p>
              <p>
                The future of work should increase human agency. Automation is
                valuable when it gives people more room for judgment, craft, and
                direction.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} satisfies FC);
