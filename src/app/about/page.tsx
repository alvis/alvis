import Image from 'next/image';

import { Header } from '#components';
import me from '#public/images/profile/me-philosophical.png';

import type { Metadata } from 'next';
import type { FC } from 'react';

export const metadata: Metadata = {
  title: 'About Alvis Tang - AI Founder, Mathematician, Product Thinker',
  description:
    'The personal story behind Alvis Tang: mathematics, complexity science, AI systems, product craft, and founder work.',
};

const chapters = [
  {
    label: 'Mathematics',
    title: 'I was trained to respect structure before certainty.',
    body: 'Mathematics shaped the way I work: define the object carefully, follow the constraints, and notice when a simple answer hides a more interesting system. That instinct still drives how I think about products, companies, and AI agents.',
  },
  {
    label: 'Complexity',
    title: 'The world I care about is made of feedback loops.',
    body: 'I am drawn to problems where behavior emerges from many small interactions: teams, tools, markets, careers, memory, culture. Complexity science gave me language for systems that cannot be understood by flattening them.',
  },
  {
    label: 'Product',
    title: 'Taste is a form of strategy.',
    body: 'A product is not only a bundle of features. It is a set of judgments about what should be easy, what should remain visible, and what kind of person the user gets to become while using it.',
  },
  {
    label: 'Founder',
    title: 'I build where rigorous systems meet human purpose.',
    body: 'My current work circles around context-aware AI, virtual employees, provenance, and the future of meaningful work. I want software that gives people leverage without making them feel less authored.',
  },
];

/**
 * about page
 */
export default (function AboutPage() {
  return (
    <>
      <Header />
      <main className="relative isolate overflow-hidden" id="main-content">
        <div aria-hidden="true" className="section-wash section-wash-left" />
        <section className="site-shell grid gap-10 py-12 md:py-18 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="eyebrow mb-6">About</p>
            <h1 className="max-w-3xl text-[2.4rem] leading-[1.02] font-medium text-balance sm:text-6xl">
              I am trying to build the human interface for a better future.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8">
              I am Alvis Tang: an AI founder, mathematician, and product thinker
              working on systems that help people remember what matters, act
              with clarity, and keep meaning inside increasingly automated work.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[340px]">
            <Image
              priority
              alt="Watercolor portrait of Alvis reading and thinking"
              className="h-auto w-full drop-shadow-[0_30px_50px_rgba(30,38,58,0.18)]"
              height={600}
              placeholder="blur"
              sizes="(max-width: 768px) 90vw, 360px"
              src={me}
              width={400}
            />
          </div>
        </section>

        <section className="border-y border-[#d8c9b4] bg-[#fff9ee]/64 py-12 md:py-16">
          <div className="site-shell grid gap-8 lg:grid-cols-[0.6fr_1fr]">
            <h2 className="text-4xl leading-[1.08] font-medium sm:text-5xl">
              The through-line is making complex systems usable without making
              them shallow.
            </h2>
            <div className="space-y-6 text-xl leading-8">
              <p>
                I like the territory between proof and prototype: the moment
                where an idea is precise enough to test but still alive enough
                to surprise you. That is where I find most of my energy as a
                founder.
              </p>
              <p>
                The work I keep returning to is context. Not context as a longer
                prompt, but as the living substrate of useful intelligence:
                memory, provenance, accountability, timing, taste, and the human
                reasons behind action.
              </p>
              <p>
                I care about AI because it can become a leverage layer for human
                purpose. I am cautious about it for the same reason. Tools that
                can act for us need to be designed with a deeper respect for
                authorship, trust, and the shape of meaningful work.
              </p>
            </div>
          </div>
        </section>

        <section className="site-shell py-12 md:py-18">
          <div className="divide-y divide-[#d8c9b4] border-y border-[#d8c9b4]">
            {chapters.map((chapter) => (
              <article
                className="grid gap-4 py-7 md:grid-cols-[10rem_minmax(0,1fr)]"
                key={chapter.label}>
                <p className="label-caps text-[#a64b2a]">{chapter.label}</p>
                <div>
                  <h2 className="max-w-3xl text-3xl leading-tight font-medium">
                    {chapter.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-lg leading-8">
                    {chapter.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-[#d8c9b4] bg-[#eee5d4]/68 py-12 md:py-16">
          <div className="site-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="max-w-3xl text-4xl leading-[1.08] font-medium sm:text-5xl">
              I am especially interested in people building patient, humane,
              technically ambitious systems.
            </h2>
            <a className="ink-link text-xl" href="mailto:alvis@hilbert.space">
              alvis@hilbert.space
            </a>
          </div>
        </section>
      </main>
    </>
  );
} satisfies FC);
