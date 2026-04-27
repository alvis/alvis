export type { ContentBlock, Essay } from './essays';
export { getAssetKey } from './assets';
export { essays } from './essays';

export interface Project {
  slug: string;
  name: string;
  status: string;
  kind: string;
  summary: string;
  thesis: string;
  details: string[];
  proof: Array<{ label: string; value: string }>;
  links: Array<{ href: string; label: string }>;
}

export const projects: [Project, ...Project[]] = [
  {
    slug: 'contexta',
    name: 'Contexta',
    status: 'Primary company',
    kind: 'Context-aware AI infrastructure',
    summary:
      'A system for giving AI agents durable working memory, provenance, and context that can be inspected, updated, and trusted.',
    thesis:
      'Context should be treated as a first-class product surface: versioned, attributable, recoverable, and useful across the whole lifecycle of work.',
    details: [
      'Designing memory structures that separate facts, preferences, decisions, tasks, and unresolved assumptions.',
      'Exploring interfaces that let people see why an agent believes something before they let it act.',
      'Building toward agent workflows where context survives across meetings, documents, tools, and time.',
    ],
    proof: [
      {
        label: 'Who it is for',
        value:
          'Product and operations teams delegating recurring, high-context work to AI agents.',
      },
      {
        label: 'What exists now',
        value:
          'The inspectable memory and provenance layer is in active product development.',
      },
      {
        label: 'Next proof',
        value:
          'Take one real workflow from briefing to action while a human can inspect what the agent knew and why it acted.',
      },
    ],
    links: [
      {
        href: 'mailto:alvis@hilbert.space?subject=Contexta%20design%20partner',
        label: 'Bring a design-partner workflow',
      },
    ],
  },
  {
    slug: 'amino-ai',
    name: 'Amino.ai',
    status: 'Exploring',
    kind: 'AI-native workflow and virtual employees',
    summary:
      'An exploration of virtual employees: agents that can own bounded work, report progress, ask for judgment, and improve through feedback.',
    thesis:
      'The future of work is not just automation. It is a new organizational interface where software can hold responsibility without erasing human purpose.',
    details: [
      'Mapping what a virtual employee must know before it can responsibly perform a role.',
      'Testing workflow primitives for delegation, review, escalation, and memory.',
      'Studying how teams can gain leverage without turning every craft into a queue of automated tasks.',
    ],
    proof: [
      {
        label: 'Who it is for',
        value:
          'Teams testing where an AI collaborator can own work without hiding uncertainty.',
      },
      {
        label: 'What exists now',
        value:
          'Workflow primitives under test: delegation, review, escalation, feedback, and memory.',
      },
      {
        label: 'Next proof',
        value:
          'Carry one bounded role from a clear brief through review, escalation, and accountable completion.',
      },
    ],
    links: [
      {
        href: 'mailto:alvis@hilbert.space?subject=Amino.ai',
        label: 'Ask about Amino.ai',
      },
    ],
  },
  {
    slug: 'work-for-future',
    name: 'Work for Future',
    status: 'Researching',
    kind: 'Purpose, careers, and future-of-work systems',
    summary:
      'A research and product thread about meaningful work, career agency, and the tools people need to shape better futures.',
    thesis:
      'If AI changes the price of execution, the scarce resource becomes direction: what people choose to build, why it matters, and how work remains humane.',
    details: [
      'Writing about the tension between automation and purpose.',
      'Collecting patterns for career systems that help people compound taste, skill, and agency.',
      'Looking for product shapes that make long-term contribution easier to see and coordinate.',
    ],
    proof: [
      {
        label: 'Who it is for',
        value:
          'People who want career decisions to account for purpose, fit, and long-term agency.',
      },
      {
        label: 'What exists now',
        value:
          'A research and product thesis connecting meaningful work, career context, and human authorship.',
      },
      {
        label: 'Next proof',
        value:
          'Turn purpose matching from a broad ideal into one testable decision surface.',
      },
    ],
    links: [
      {
        href: 'mailto:alvis@hilbert.space?subject=Work%20for%20Future',
        label: 'Collaborate',
      },
    ],
  },
  {
    slug: 'presetter',
    name: 'Presetter',
    status: 'Shipped',
    kind: 'Open-source developer infrastructure',
    summary:
      'A configuration system for TypeScript projects and monorepos that keeps shared engineering decisions composed, reviewable, and current.',
    thesis:
      'The point is not fewer config files. It is fewer unexplained decisions.',
    details: [
      'Version 9 gives the preset ecosystem one public namespace and a stricter modern baseline.',
      'Runtime, Storybook, and monorepo presets turn repeated setup into explicit composition.',
      'Provenance-backed publishing and resumable releases treat the delivery system as part of the product.',
    ],
    proof: [
      {
        label: 'Who it is for',
        value:
          'TypeScript teams maintaining consistent decisions across projects, packages, and time.',
      },
      {
        label: 'What exists now',
        value:
          'A public CLI, scoped preset ecosystem, v9 release, migration guide, and production release pipeline.',
      },
      {
        label: 'Next proof',
        value:
          'Make each upgrade read like a reviewed decision instead of another copied configuration file.',
      },
    ],
    links: [
      { href: 'https://presetter.dev/', label: 'Explore Presetter' },
      {
        href: 'https://github.com/alvis/presetter',
        label: 'Explore the repository',
      },
      {
        href: '/thinking/presetter-v9-configuration-with-a-memory',
        label: 'Read the v9 field note',
      },
    ],
  },
  {
    slug: 'field-notes',
    name: 'Field Notes',
    status: 'Publishing',
    kind: 'Essays, diagrams, and prototypes',
    summary:
      'A public notebook for mathematics, complexity science, design, architecture, and the emotional texture of building.',
    thesis:
      'Serious technical work benefits from a more humane public surface: precise enough to be useful and personal enough to be remembered.',
    details: [
      'Short essays on agent reliability, context systems, and product taste.',
      'Visual diagrams for ideas that are easier to understand spatially than verbally.',
      'Small prototypes that test whether an idea changes how people think or work.',
    ],
    proof: [
      {
        label: 'Who it is for',
        value:
          'Builders who want the engineering argument and the human stakes in the same notebook.',
      },
      {
        label: 'What exists now',
        value:
          'Seven public essays spanning agent reliability, context systems, product craft, and open source.',
      },
      {
        label: 'Next proof',
        value:
          'Keep translating the thesis into code, diagrams, and claims that can be tested in public.',
      },
    ],
    links: [{ href: '/thinking', label: 'Read essays' }],
  },
];

export const currentFocus = [
  {
    label: 'Building',
    body: 'Contexta: context infrastructure for agents that need memory, provenance, and accountable action.',
  },
  {
    label: 'Testing',
    body: 'AI-native workflows where virtual employees can own bounded work without hiding uncertainty from humans.',
  },
  {
    label: 'Writing',
    body: 'A thesis on meaningful work after automation: how people keep authorship when execution becomes abundant.',
  },
  {
    label: 'Learning',
    body: 'Complexity science, organizational design, proof systems, and architectural spaces that make thought feel embodied.',
  },
];
