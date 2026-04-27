import type { FC } from 'react';

import type { Project } from '#content';

interface ProjectTabsProps {
  projects: [Project, ...Project[]];
}

/**
 * URL-addressable project showcase
 * @param props component props
 * @param props.projects projects to render
 * @returns project navigation and detail sections
 */
export const ProjectTabs: FC<ProjectTabsProps> = ({ projects }) => (
  <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
    <nav
      aria-label="Project selector"
      className="grid gap-2 self-start sm:grid-cols-2 lg:sticky lg:top-6 lg:block">
      {projects.map((project) => (
        <a
          className="block w-full border border-[#d8c9b4] bg-[#fff9ee]/72 px-4 py-4 text-left text-[#162747] transition hover:border-[#a64b2a] hover:bg-[#a64b2a] hover:text-[#fff9ee] lg:border-b-0 lg:last:border-b"
          href={`#project-${project.slug}`}
          key={project.slug}>
          <span className="label-caps block opacity-80">{project.status}</span>
          <span className="mt-2 block text-2xl leading-tight font-medium">
            {project.name}
          </span>
        </a>
      ))}
    </nav>

    <div className="grid gap-8">
      {projects.map((project) => (
        <article
          className="scroll-mt-10 border border-[#d8c9b4] bg-[#fff9ee]/78 p-6 transition duration-300 target:border-[#a64b2a] target:shadow-[0_24px_70px_rgba(22,39,71,0.12)] sm:p-8"
          id={`project-${project.slug}`}
          key={project.slug}>
          <p className="label-caps text-[#a64b2a]">
            {project.status} / {project.kind}
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl leading-[1.06] font-medium text-balance sm:text-5xl">
            {project.name}
          </h2>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-[#162747]">
            {project.summary}
          </p>
          <blockquote className="mt-8 border-l border-[#a64b2a] pl-5 text-2xl leading-9 text-[#162747]">
            {project.thesis}
          </blockquote>
          <div className="mt-8 grid gap-4">
            {project.details.map((detail) => (
              <p
                className="border-t border-[#d8c9b4] pt-4 text-lg leading-8"
                key={detail}>
                {detail}
              </p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a className="ink-link text-lg" href={link.href} key={link.href}>
                <span aria-hidden="true">-&gt;</span>
                {link.label}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  </div>
);
