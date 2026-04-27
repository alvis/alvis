import Image from 'next/image';

import { Header } from '#components';
import me from '#public/images/profile/me-philosophical.webp';

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
 * founder evidence without turning the story into a credential list
 * @returns compact research, shipping, and company proof
 */
const FounderProof: FC = () => (
  <section className="section-transition section-transition-raised relative overflow-visible border-y border-(--color-rule) bg-(--color-paper-raised)/64 py-12 md:py-16">
    <div className="site-shell grid gap-8 lg:grid-cols-[0.55fr_1fr]">
      <div>
        <p className="label-caps text-(--color-accent)">
          A few receipts, not a résumé
        </p>
        <h2 className="mt-4 text-4xl leading-[1.08] font-medium sm:text-5xl">
          The ideas have to survive contact with real systems.
        </h2>
      </div>
      <dl className="divide-y divide-(--color-rule) border-y border-(--color-rule)">
        <div className="grid gap-2 py-5 md:grid-cols-[9rem_1fr]">
          <dt className="label-caps text-(--color-accent)">Research</dt>
          <dd className="text-lg leading-8">
            A Mathematics PhD from Imperial College London left me with a
            durable respect for uncertainty and proof.
          </dd>
        </div>
        <div className="grid gap-2 py-5 md:grid-cols-[9rem_1fr]">
          <dt className="label-caps text-(--color-accent)">Shipped</dt>
          <dd className="text-lg leading-8">
            Presetter v9 is public infrastructure: code, documentation,
            migration path, and a release system other engineers can inspect.
          </dd>
        </div>
        <div className="grid gap-2 py-5 md:grid-cols-[9rem_1fr]">
          <dt className="label-caps text-(--color-accent)">Now</dt>
          <dd className="text-lg leading-8">
            Contexta turns the same instinct toward agents: keep memory,
            provenance, assumptions, and human checkpoints visible before
            action.
          </dd>
        </div>
      </dl>
    </div>
  </section>
);

/**
 * direct invitation for aligned collaborators
 * @returns closing contact section
 */
const AboutInvitation: FC = () => (
  <section className="section-transition section-transition-sunk relative overflow-visible border-t border-(--color-rule) bg-(--color-paper-sunk)/68 py-12 md:py-16">
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
);

/** about page */
export default (function AboutPage() {
  return (
    <>
      <Header />
      <main
        className="relative isolate overflow-hidden"
        id="main-content"
        tabIndex={-1}>
        <div aria-hidden="true" className="section-wash section-wash-left" />
        <section className="site-shell grid gap-10 py-12 md:py-18 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div>
            <p className="eyebrow mb-6">About</p>
            <h1 className="page-title max-w-3xl text-[2.4rem] leading-[1.02] font-medium text-balance sm:text-6xl">
              I am trying to build the <em>human interface</em> for a better
              future.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8">
              I am Alvis Tang: an AI founder, mathematician, and product thinker
              working on systems that help people remember what matters, act
              with clarity, and keep meaning inside increasingly automated work.
            </p>
          </div>
          <div className="relative mx-auto w-full max-w-[340px]">
            <div className="portrait-plate">
              <Image
                priority
                alt="Watercolor portrait of Alvis reading and thinking"
                className="relative z-10 h-auto w-full drop-shadow-[0_30px_50px_rgba(30,38,58,0.18)]"
                height={600}
                placeholder="blur"
                sizes="(max-width: 768px) 90vw, 360px"
                src={me}
                width={400}
              />
              <span aria-hidden="true" className="portrait-frame" />
              <span aria-hidden="true" className="portrait-reg portrait-reg--tl" />
              <span aria-hidden="true" className="portrait-reg portrait-reg--tr" />
              <span aria-hidden="true" className="portrait-reg portrait-reg--bl" />
              <span aria-hidden="true" className="portrait-reg portrait-reg--br" />
            </div>
            <span aria-hidden="true" className="project-plate-note ml-[6%]">
              sketched from life
            </span>
          </div>
        </section>

        <section className="section-transition section-transition-raised relative overflow-visible border-y border-(--color-rule) bg-(--color-paper-raised)/64 py-12 md:py-16">
          <div className="site-shell grid gap-8 lg:grid-cols-[0.6fr_1fr]">
            <div>
              <h2 className="text-4xl leading-[1.08] font-medium sm:text-5xl">
                The through-line is making complex systems usable without
                making them shallow.
              </h2>
              <span aria-hidden="true" className="project-plate-note mt-4">
                context, again.
              </span>
            </div>
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

        <section className="section-transition section-transition-paper site-shell relative overflow-visible py-12 md:py-18">
          <div className="divide-y divide-(--color-rule) border-y border-(--color-rule)">
            {chapters.map((chapter, index) => (
              <article
                className="grid gap-4 py-7 md:grid-cols-[10rem_minmax(0,1fr)]"
                key={chapter.label}>
                <p className="label-caps text-(--color-mute-strong)">
                  <span className="text-(--color-accent)">0{index + 1}</span>
                  {' · '}
                  {chapter.label}
                </p>
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

        <FounderProof />
        <AboutInvitation />
      </main>
    </>
  );
} satisfies FC);
