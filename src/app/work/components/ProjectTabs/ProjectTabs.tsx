import {
  circleKeyword,
  projectPlateBySlug,
  ProjectPlateFigure,
} from '#components';

import type { FC } from 'react';

import type { Project } from '#content';

/** props accepted by `ProjectTabs` */
export type ProjectTabsProps = {
  /** non-empty list of projects to render; the first project anchors the page */
  projects: readonly [Project, ...Project[]];
};

/**
 * renders a URL-addressable project showcase
 * @param props component props
 * @param props.projects projects to render
 * @returns project navigation and detail sections
 */
export const ProjectTabs: FC<ProjectTabsProps> = ({ projects }) => (
  <div className="work-projects grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
    <nav
      aria-label="Project selector"
      className="work-project-nav grid gap-2 self-start sm:grid-cols-2 lg:sticky lg:top-6 lg:block">
      {projects.map((project) => (
        <a
          className="work-project-link block w-full border border-(--color-rule) bg-(--color-paper-raised)/72 px-4 py-4 text-left text-(--color-ink) transition hover:border-(--color-accent) hover:bg-(--color-accent) hover:text-(--color-paper-raised) lg:border-b-0 lg:last:border-b"
          href={`#project-${project.slug}`}
          key={project.slug}>
          <span className="label-caps block opacity-80">{project.status}</span>
          <span className="mt-2 block text-2xl leading-tight font-medium">
            {project.name}
          </span>
        </a>
      ))}
    </nav>

    <div className="work-project-list grid gap-8">
      {projects.map((project, index) => {
        const plate = projectPlateBySlug[project.slug];

        return (
          <article
            className="work-project-card scroll-mt-10 border border-(--color-rule) bg-(--color-paper-raised)/78 p-6 transition duration-300 target:border-(--color-accent) target:shadow-[0_24px_70px_rgba(22,39,71,0.12)] sm:p-8"
            id={`project-${project.slug}`}
            key={project.slug}>
            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_15rem] xl:items-start">
              <div>
                <p className="label-caps text-(--color-mute-strong)">
                  <span className="text-(--color-accent)">0{index + 1}</span>
                  {' · '}
                  {project.status} · {project.kind}
                </p>
                <h2 className="mt-4 max-w-3xl text-4xl leading-[1.06] font-medium text-balance sm:text-5xl">
                  {project.name}
                </h2>
                <p className="mt-5 max-w-3xl text-xl leading-8 text-(--color-ink)">
                  {plate
                    ? circleKeyword(project.summary, plate.keyword)
                    : project.summary}
                </p>
              </div>
              {plate && <ProjectPlateFigure plate={plate} />}
            </div>
            <blockquote className="mt-8 border-l border-(--color-accent) pl-5 text-2xl leading-9 text-(--color-ink)">
              {project.thesis}
            </blockquote>
            <dl className="mt-8 grid border-y border-(--color-rule) md:grid-cols-3 md:divide-x md:divide-(--color-rule)">
              {project.proof.map((signal) => (
                <div className="py-5 md:px-5 md:first:pl-0" key={signal.label}>
                  <dt className="label-caps text-(--color-accent)">
                    {signal.label}
                  </dt>
                  <dd className="mt-3 text-base leading-7 text-(--color-ink)">
                    {signal.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 grid gap-4">
              {project.details.map((detail) => (
                <p
                  className="border-t border-(--color-rule) pt-4 text-lg leading-8"
                  key={detail}>
                  {detail}
                </p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {project.links.map((link) => (
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
          </article>
        );
      })}
    </div>
  </div>
);
