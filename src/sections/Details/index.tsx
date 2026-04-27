import Link from 'next/link';

import { currentFocus, projects } from '#content';

import type { FC } from 'react';

const FEATURED_PROJECT_COUNT = 4;

const notes = [
  {
    label: 'Origin',
    title: 'Engineering instinct, research patience.',
    body: 'I like problems where the first answer is too neat: tools, systems, proofs, products, and the small loops that make them useful for people.',
  },
  {
    label: 'Method',
    title: 'Turn ambiguity into working shape.',
    body: 'My work usually starts with a sketch, a model, or a prototype, then tightens through careful feedback from the humans using it.',
  },
  {
    label: 'Bias',
    title: 'Build the thing that changes the conversation.',
    body: 'I care about software that makes hard ideas easier to hold, explain, test, and share so better futures become more practical.',
  },
];

const threads = [
  'Applied mathematics',
  'Developer tools',
  'AI product systems',
  'Research workflows',
  'Company building',
];

/**
 * landing about preview section
 * @returns about preview
 */
const AboutPreview: FC = () => (
  <section
    className="relative isolate overflow-visible bg-transparent py-14 text-[#162747] sm:py-20"
    id="about">
    <div aria-hidden="true" className="section-wash section-wash-left" />
    <div className="site-shell grid gap-10 lg:grid-cols-[0.76fr_1fr] lg:items-start">
      <div>
        <p className="label-caps mb-4 text-[#a64b2a]">About</p>
        <h2 className="max-w-xl text-4xl leading-[1.08] font-medium text-balance sm:text-5xl">
          I move between code, maths, and company-making to make complex ideas
          usable.
        </h2>
        <Link className="ink-link mt-7 text-lg" href="/about">
          <span aria-hidden="true">-&gt;</span>
          Read the longer story
        </Link>
      </div>

      <div>
        {notes.map((note) => (
          <article
            className="grid gap-3 py-6 sm:grid-cols-[7rem_1fr]"
            key={note.label}>
            <p className="label-caps text-[#a64b2a]">{note.label}</p>
            <div>
              <h3 className="text-2xl leading-tight font-medium text-[#162747]">
                {note.title}
              </h3>
              <p className="mt-2 max-w-2xl text-lg leading-8 text-[#162747]">
                {note.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

/**
 * landing now preview section
 * @returns now preview
 */
const NowPreview: FC = () => (
  <section
    className="relative isolate overflow-visible bg-transparent py-14 text-[#162747] sm:py-20"
    id="now">
    <div aria-hidden="true" className="section-wash section-wash-right" />
    <div className="site-shell">
      <div className="grid gap-8 pb-6 md:grid-cols-[0.7fr_1fr] md:items-end">
        <p className="label-caps text-[#a64b2a]">Now</p>
        <h2 className="text-4xl leading-[1.08] font-medium text-balance sm:text-5xl">
          Current attention: context-aware agents, meaningful work, and the
          systems between them.
        </h2>
      </div>

      <div className="grid md:grid-cols-4">
        {currentFocus.map((focus) => (
          <article className="min-h-52 px-0 py-6 md:px-5" key={focus.label}>
            <p className="label-caps text-[#a64b2a]">{focus.label}</p>
            <p className="mt-8 max-w-64 text-xl leading-8 font-medium text-[#162747]">
              {focus.body}
            </p>
          </article>
        ))}
      </div>
      <Link className="ink-link mt-7 text-lg" href="/now">
        <span aria-hidden="true">-&gt;</span>
        See the current operating note
      </Link>
    </div>
  </section>
);

/**
 * landing work preview section
 * @returns work preview
 */
const WorkPreview: FC = () => (
  <section
    className="relative isolate overflow-visible bg-transparent py-14 text-[#162747] sm:py-20"
    id="work">
    <div aria-hidden="true" className="section-wash section-wash-left" />
    <div className="site-shell">
      <div className="grid gap-8 pb-6 md:grid-cols-[0.7fr_1fr] md:items-end">
        <p className="label-caps text-[#a64b2a]">Selected work</p>
        <h2 className="text-4xl leading-[1.08] font-medium text-balance sm:text-5xl">
          Projects around context, virtual employees, and purposeful work.
        </h2>
      </div>

      <div className="grid md:grid-cols-4">
        {projects.slice(0, FEATURED_PROJECT_COUNT).map((project, index) => (
          <article className="min-h-56 px-0 py-6 md:px-5" key={project.slug}>
            <p className="label-caps text-[#a64b2a]">0{index + 1}</p>
            <h3 className="mt-8 max-w-56 text-2xl leading-7 font-medium text-[#162747]">
              {project.name}
            </h3>
            <p className="mt-4 max-w-64 text-lg leading-7 text-[#162747]">
              {project.summary}
            </p>
          </article>
        ))}
      </div>
      <Link className="ink-link mt-7 text-lg" href="/work">
        <span aria-hidden="true">-&gt;</span>
        Explore the project map
      </Link>
    </div>
  </section>
);

/**
 * landing interest thread section
 * @returns interest thread editorial line
 */
const ThreadPreview: FC = () => (
  <section className="bg-transparent py-12 text-[#162747]">
    <div className="site-shell grid gap-6 md:grid-cols-[0.7fr_1fr] md:items-baseline">
      <p className="label-caps text-[#a64b2a]">Long-running threads</p>
      <ul className="thread-line flex flex-col gap-y-3 md:flex-row md:flex-wrap md:items-baseline md:gap-y-2">
        {threads.map((thread) => (
          <li
            className="thread-entry text-2xl leading-snug text-[#162747] transition-colors duration-200 hover:text-[#a64b2a]"
            key={thread}>
            {thread}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/**
 * landing contact section
 * @returns contact call to action
 */
const ContactPreview: FC = () => (
  <section
    className="relative isolate overflow-visible bg-transparent py-14 text-[#162747] sm:py-20"
    id="contact">
    <div aria-hidden="true" className="section-wash section-wash-bottom" />
    <div className="site-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
      <div className="max-w-3xl">
        <p className="label-caps mb-4 text-[#a64b2a]">Contact</p>
        <h2 className="text-4xl leading-[1.08] font-medium text-balance sm:text-5xl">
          If the idea makes human work clearer, kinder, or more capable, I am
          interested.
        </h2>
      </div>

      <a className="ink-link w-fit text-xl" href="mailto:alvis@hilbert.space">
        alvis@hilbert.space
      </a>
    </div>
  </section>
);

/**
 * supporting landing page sections
 * @returns about, now, work, interests, and contact sections
 */
export const Details: FC = () => (
  <>
    <AboutPreview />
    <NowPreview />
    <WorkPreview />
    <ThreadPreview />
    <ContactPreview />
  </>
);
