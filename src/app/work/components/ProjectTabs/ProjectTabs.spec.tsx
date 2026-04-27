import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { projects } from '#content';

import { ProjectTabs } from './ProjectTabs';

describe('ProjectTabs', () => {
  it('renders stable work layout hooks for temporary design variants', () => {
    const html = renderToStaticMarkup(<ProjectTabs projects={projects} />);

    expect(html).toContain('work-projects');
    expect(html).toContain('work-project-nav');
    expect(html).toContain('work-project-list');
    expect(html).toContain('work-project-card');
  });

  it('shows concrete proof for the company and shipped work', () => {
    const html = renderToStaticMarkup(<ProjectTabs projects={projects} />);

    expect(html).toContain('Who it is for');
    expect(html).toContain('What exists now');
    expect(html).toContain('Next proof');
    expect(html).toContain('Presetter');
    expect(html).toContain('Explore the repository');
  });
});
