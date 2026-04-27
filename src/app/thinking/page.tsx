import { Header } from '#components';
import { essays } from '#content';

import { EssayFilter } from './components/EssayFilter';

import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = {
  title: 'Thinking and Writing - Alvis Tang',
  description:
    'Essays by Alvis Tang on context-aware AI, agents, provenance, meaningful work, complexity, and design.',
};

/** thinking page */
export default (function ThinkingPage() {
  return (
    <>
      <Header />
      <main
        className="relative isolate overflow-hidden"
        id="main-content"
        tabIndex={-1}>
        <div aria-hidden="true" className="section-wash section-wash-right" />
        <section className="site-shell py-12 md:py-18">
          <p className="eyebrow mb-6">Thinking / Writing</p>
          <h1 className="max-w-4xl text-[2.4rem] leading-[1.02] font-medium text-balance sm:text-6xl">
            Essays on context, agents, meaningful work, and systems that make
            people more capable.
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8">
            A small public notebook for the ideas behind the work: production
            AI, human-centered automation, provenance, complexity, design, and
            the future of careers.
          </p>
        </section>

        <section className="section-transition section-transition-raised site-shell relative overflow-visible bg-(--color-paper-raised)/40 pb-14 md:pb-20">
          <EssayFilter essays={essays} />
        </section>
      </main>
    </>
  );
} satisfies FC);
