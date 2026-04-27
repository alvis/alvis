import { Header, ProjectTabs } from '#components';
import { projects } from '#content';

import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = {
  title: 'Work and Projects - Alvis Tang',
  description:
    'Contexta, Amino.ai, Work for Future, and related experiments from Alvis Tang.',
};

/**
 * work page
 */
export default (function WorkPage() {
  return (
    <>
      <Header />
      <main className="relative isolate overflow-hidden" id="main-content">
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

        <section className="site-shell pb-14 md:pb-20">
          <ProjectTabs projects={projects} />
        </section>

        <section className="border-y border-[#d8c9b4] bg-[#eee5d4]/68 py-12 md:py-16">
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
