import { Header } from '#components';
import { currentFocus } from '#content';

import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = {
  title: 'What I am doing now - Alvis Tang',
  description:
    'What Alvis Tang is currently building, studying, writing, and prioritizing.',
};

const operatingNotes = [
  'Build fewer things, with more memory inside each one.',
  'Prefer systems that create compounding leverage over demos that create temporary attention.',
  'Keep the human reason visible when designing automated work.',
  'Write in public when the idea becomes clearer by being made accountable.',
];

/** now page */
export default (function NowPage() {
  return (
    <>
      <Header />
      <main
        className="relative isolate overflow-hidden"
        id="main-content"
        tabIndex={-1}>
        <div aria-hidden="true" className="section-wash section-wash-right" />
        <section className="site-shell py-12 md:py-18">
          <p className="eyebrow mb-6">Now / June 2026</p>
          <h1 className="page-title max-w-4xl text-[2.4rem] leading-[1.02] font-medium text-balance sm:text-6xl">
            Current attention: context-aware AI, virtual employees, and the
            future of <em>purposeful work</em>.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8">
            This page is an operating note: what I am actively building,
            thinking about, learning, and protecting time for.
          </p>
        </section>

        <section className="section-transition section-transition-raised relative overflow-visible border-y border-(--color-rule) bg-(--color-paper-raised)/64 py-10">
          <div className="site-shell grid divide-y divide-(--color-rule) md:grid-cols-4 md:divide-x md:divide-y-0">
            {currentFocus.map((focus, index) => (
              <article className="min-h-56 px-0 py-6 md:px-5" key={focus.label}>
                <p className="label-caps text-(--color-mute-strong)">
                  <span className="text-(--color-accent)">0{index + 1}</span>
                  {' · '}
                  {focus.label}
                </p>
                <p className="mt-8 max-w-64 text-xl leading-8 font-medium">
                  {focus.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-transition section-transition-paper site-shell relative grid gap-10 overflow-visible py-12 md:py-18 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <p className="label-caps mb-4 text-(--color-accent)">Priority</p>
            <h2 className="text-4xl leading-[1.08] font-medium sm:text-5xl">
              I am optimizing for depth, proof, and useful public signal.
            </h2>
          </div>
          <div className="space-y-6 text-xl leading-8">
            <p>
              Contexta is the center of gravity: a way to make agent memory
              inspectable, accountable, and operationally useful. I am studying
              how context changes when it moves from static documents into
              workflows that can act.
            </p>
            <p>
              The near-term proof is deliberately narrow: one design-partner
              workflow carried from briefing to action with its sources,
              assumptions, and human checkpoints intact.
            </p>
            <p>
              Around that sits Amino.ai, where I am testing what a virtual
              employee should be allowed to own. The hard question is not
              whether an agent can complete a task. It is whether the system
              knows the boundaries of responsibility well enough to deserve
              delegation.
            </p>
            <p>
              Work for Future is the human thesis underneath the technical work.
              If AI makes execution cheaper, people need better tools for
              direction, meaning, and career agency. Otherwise automation wins
              the calendar and loses the soul.
            </p>
          </div>
        </section>

        <section className="section-transition section-transition-sunk relative overflow-visible border-t border-(--color-rule) bg-(--color-paper-sunk)/68 py-12 md:py-16">
          <div className="site-shell">
            <div className="mb-6 flex flex-wrap items-baseline gap-x-5">
              <p className="label-caps text-(--color-accent)">
                Operating notes
              </p>
              <span aria-hidden="true" className="project-plate-note m-0">
                taped above the desk
              </span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {operatingNotes.map((note) => (
                <p
                  className="now-note border border-(--color-rule) bg-(--color-paper-raised)/70 p-5 text-xl leading-8"
                  key={note}>
                  {note}
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
} satisfies FC);
