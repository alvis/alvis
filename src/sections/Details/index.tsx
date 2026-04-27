/* eslint-disable max-lines -- the homepage narrative stays readable as one ordered composition */

import Link from 'next/link';

import { circleKeyword, projectPlateBySlug, ProjectPlateFigure } from '#components';
import { projects } from '#content';

import { PosteriorContractionArtwork } from './PosteriorContractionArtwork';

import type { FC } from 'react';

const FEATURED_PROJECT_COUNT = 3;
const SHIPPED_LINK_COUNT = 3;
const shippedProject = projects.find(({ slug }) => slug === 'presetter');

/**
 * landing mission statement
 * @returns mission statement section
 */
const MissionStatement: FC = () => (
  <section
    className="
      mission-manifesto section-transition section-transition-ink relative
      isolate overflow-visible bg-(--color-ink) py-20
      text-(--color-paper-raised)
      sm:py-28
    "
    id="mission">
    <div aria-hidden="true" className="manifesto-art">
      <div className="manifesto-wash" />
    </div>
    <PosteriorContractionArtwork />
    <div aria-hidden="true" className="manifesto-grain" />
    <div className="site-shell relative z-10">
      <p className="label-caps manifesto-folio">— The premise · 01 —</p>
      <h2 className="manifesto-statement text-balance">
        Execution is getting cheap. <em>Direction is becoming sacred.</em>
      </h2>
      <div
        className="
          mt-12 grid max-w-232 gap-7 border-t border-white/20 pt-8 text-xl/8
          text-(--color-on-ink)
          md:grid-cols-2
        ">
        <p className="text-pretty">
          The world already has enough output. I am interested in AI that
          understands the situation around the task: memory, provenance,
          boundaries, uncertainty, and taste.
        </p>
        <p className="text-pretty">
          Because once machines become good at execution, the question is no
          longer “can we do more?” It is “what is still worth doing—and who
          gets to choose?”
        </p>
      </div>
    </div>
    <div aria-hidden="true" className="manifesto-note">
      the turn.
      <svg fill="none" height="52" viewBox="0 0 112 52" width="112">
        <circle cx="6" cy="6" fill="currentColor" opacity="0.85" r="2.4" />
        <path
          d="M8,7 C 26,4 46,42 70,30 C 84,23 88,14 104,18"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.6"
        />
        <path
          d="M95,12 L104,18 L94,24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.6"
        />
      </svg>
    </div>
  </section>
);

/**
 * two connected halves of the mission
 * @returns paired machine-context and human-purpose thesis cards
 */
const MissionPillars: FC = () => (
  <section
    className="
      section-transition section-transition-paper relative overflow-visible
      bg-(--color-paper) py-20 text-(--color-ink)
      sm:py-28
    "
    id="thesis">
    <div className="site-shell">
      <p className="label-caps mb-10 text-(--color-accent)">
        One mission / two halves
      </p>
      <div className="mission-pillars">
        <article className="mission-pillar">
          <p className="mission-pillar-number">01</p>
          <h2>Give machines context.</h2>
          <p>
            Agents need more than prompts. They need durable memory, visible
            provenance, recovery paths, and the good sense to ask before they
            act.
          </p>
          <ul aria-label="Context for machines">
            <li>memory</li>
            <li>provenance</li>
            <li>judgment</li>
          </ul>
        </article>
        <div aria-hidden="true" className="mission-bridge">
          <span>so that</span>
          <svg fill="none" preserveAspectRatio="none" viewBox="0 0 74 220">
            <path
              d="M8,20 C60,60 14,150 66,200"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="1.7"
            />
            <path
              d="M56,190 L66,200 L54,205"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
          </svg>
        </div>
        <article className="mission-pillar mission-pillar-human">
          <p className="mission-pillar-number">02</p>
          <h2>Return humans to purpose.</h2>
          <p>
            When execution becomes abundant, authorship becomes precious. I
            build for work that protects agency, meaning, and the part only a
            person can choose.
          </p>
          <ul aria-label="Purpose for humans">
            <li>agency</li>
            <li>meaning</li>
            <li>authorship</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
);

/**
 * landing work preview section
 * @returns selected current projects and their shared question
 */
const WorkPreview: FC = () => (
  <section
    className="
      section-transition section-transition-raised relative isolate
      overflow-visible bg-(--color-paper-raised) py-20 text-(--color-ink)
      sm:py-28
    "
    id="work">
    <div className="site-shell">
      <div
        className="
          grid gap-8 pb-10
          md:grid-cols-[0.55fr_1fr] md:items-end
        ">
        <p className="label-caps text-(--color-accent)">In the arena / 02</p>
        <h2
          className="
            text-5xl leading-none font-medium text-balance
            sm:text-7xl
          ">
          One company. Two connected questions.
        </h2>
      </div>

      <div className="border-t border-(--color-rule)">
        {projects.slice(0, FEATURED_PROJECT_COUNT).map((project, index) => {
          const plate = projectPlateBySlug[project.slug];

          return (
            <article className="project-entry" key={project.slug}>
              <div>
                <p className="label-caps mb-3 text-(--color-mute-strong)">
                  <span className="text-(--color-accent)">0{index + 1}</span>
                  {' · '}
                  {project.status} · {project.kind}
                </p>
                <h3>{project.name}</h3>
                <p className="project-entry-summary">
                  {plate
                    ? circleKeyword(project.summary, plate.keyword)
                    : project.summary}
                </p>
                <Link
                  aria-label={`Explore ${project.name}`}
                  className="project-entry-more"
                  href="/work">
                  ↗
                </Link>
              </div>
              {plate && <ProjectPlateFigure plate={plate} />}
            </article>
          );
        })}
      </div>
      <Link className="ink-link mt-7 text-lg" href="/work">
        <span aria-hidden="true">→</span>
        Explore the project map
      </Link>
    </div>
  </section>
);

/**
 * shipped open-source evidence behind the founder thesis
 * @returns compact proof strip
 */
const ShippedProof: FC = () => {
  if (!shippedProject) {
    return null;
  }

  return (
    <section
      className="
        section-transition section-transition-paper relative overflow-visible
        bg-(--color-paper) py-12 text-(--color-ink)
        sm:py-16
      ">
      <div
        className="
          site-shell grid gap-8
          md:grid-cols-[0.5fr_1fr] md:items-center
        ">
        <div>
          <p className="label-caps text-(--color-accent)">Shipped proof</p>
          <h2
            className="
              mt-4 text-4xl leading-[1.04] font-medium
              sm:text-5xl
            ">
            Presetter v9
          </h2>
        </div>
        <div>
          <p className="max-w-3xl text-xl/8">
            {shippedProject.summary} The public release, migration guide, and
            repository show how I turn a thesis about memory into infrastructure
            other engineers can inspect.
          </p>
          <div className="mt-6 flex flex-wrap gap-5">
            {shippedProject.links.slice(0, SHIPPED_LINK_COUNT).map((link) => (
              <a
                className="ink-link text-lg"
                href={link.href}
                key={link.href}
                rel={
                  link.href.startsWith('http')
                    ? 'noopener noreferrer'
                    : undefined
                }
                target={link.href.startsWith('http') ? '_blank' : undefined}>
                <span aria-hidden="true">→</span>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * origin story preview
 * @returns origin story section
 */
const OriginPreview: FC = () => (
  <section
    className="
      section-transition section-transition-sunk relative overflow-visible
      bg-(--color-paper-sunk) py-20 text-(--color-ink)
      sm:py-28
    ">
    <div aria-hidden="true" className="origin-mark" />
    <div
      className="
        site-shell grid gap-10
        lg:grid-cols-[0.62fr_1fr] lg:gap-20
      ">
      <p className="label-caps text-(--color-accent)">The throughline / 03</p>
      <div>
        <h2
          className="
            max-w-208 text-5xl leading-[1.08] font-medium text-balance
            sm:text-7xl
          ">
          Math PhD by chance. Builder by choice.
        </h2>
        <div
          className="
            mt-9 grid gap-6 text-xl/8 text-(--color-ink-soft)
            md:grid-cols-2
          ">
          <p className="text-pretty">
            Probability taught me to respect uncertainty, hidden structure, and
            answers that arrive a little too cleanly.
          </p>
          <p className="text-pretty">
            Building taught me that rigor only counts when a real person can
            hold it, use it, and trust it. That is the work I keep choosing.
          </p>
        </div>
        <Link className="ink-link mt-9 text-lg" href="/about">
          <span aria-hidden="true">→</span>
          Read the longer story
        </Link>
      </div>
    </div>
  </section>
);

/**
 * final invitation to follow the work
 * @returns final call to action
 */
export const FinalInvitation: FC = () => (
  <section
    className="
      final-invitation section-transition section-transition-ink relative
      isolate overflow-visible bg-(--color-ink) py-20
      text-(--color-paper-raised)
      sm:py-28
    "
    id="follow">
    <div aria-hidden="true" className="writing-follow-transition-rear" />
    <div aria-hidden="true" className="final-intent-field" />
    <svg
      aria-hidden="true"
      className="final-signal-map"
      fill="none"
      viewBox="0 0 800 700">
      <path d="M30 548C160 296 250 636 390 352S625 110 772 232" />
      <path d="M42 218C212 384 278 86 438 270S627 612 782 438" />
      <path d="M124 670C282 492 500 650 704 54" />
      <circle cx="190" cy="418" r="8" />
      <circle cx="438" cy="270" r="10" />
      <circle cx="650" cy="410" r="7" />
    </svg>
    <div aria-hidden="true" className="final-ink-field" />
    <div className="site-shell relative z-10">
      <p className="label-caps mb-6 text-(--color-on-ink-accent)">
        The work stays public
      </p>
      <h2
        className="
          max-w-240 text-5xl leading-[0.98] font-medium text-balance
          sm:text-7xl
          lg:text-8xl
        ">
        The machine may execute. The human must still mean it.
      </h2>
      <div className="mt-10 flex flex-wrap gap-4">
        <a
          className="mission-primary-link mission-primary-link-light"
          href="https://x.com/alvvst"
          rel="noopener noreferrer"
          target="_blank">
          Follow @alvvst <span aria-hidden="true">↗</span>
        </a>
        <a
          className="mission-secondary-link mission-secondary-link-light"
          href="https://github.com/alvis"
          rel="noopener noreferrer"
          target="_blank">
          Build with me on GitHub <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p
        className="
          mt-14 max-w-xl border-t border-white/20 pt-6 text-lg/7
          text-(--color-on-ink)
        ">
        AI founder · open-source builder · Math PhD, Imperial College London ·
        persistent enthusiast
      </p>
    </div>
  </section>
);

/**
 * supporting mission and work sections
 * @returns mission, work, and origin sections
 */
export const Details: FC = () => (
  <>
    <MissionStatement />
    <MissionPillars />
    <WorkPreview />
    <ShippedProof />
    <OriginPreview />
  </>
);

/* eslint-enable max-lines */
