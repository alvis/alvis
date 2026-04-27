import agentsNeed from '#public/images/blog/agents-need.png';
import contextProduct from '#public/images/blog/context-product.png';
import quietUseful from '#public/images/blog/quiet-useful.png';

import type { StaticImageData } from 'next/image';

export interface Essay {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image: StaticImageData;
  imageAlt: string;
  readingTime: string;
  tags: string[];
  body: string[];
}

export interface Project {
  slug: string;
  name: string;
  status: string;
  kind: string;
  summary: string;
  thesis: string;
  details: string[];
  links: Array<{ href: string; label: string }>;
}

export const essays: Essay[] = [
  {
    slug: 'context-layer-is-the-product',
    title: 'The Context Layer Is the Product',
    date: 'May 19, 2025',
    category: 'Systems',
    summary:
      'Context shapes decisions, creates leverage, and compounds over time. The next durable AI products will treat context as infrastructure, not prompt decoration.',
    image: contextProduct,
    imageAlt:
      'Watercolor diagram of overlapping context layers feeding a central decision surface, illustrating context as product infrastructure.',
    readingTime: '7 min',
    tags: ['Context', 'AI systems', 'Knowledge work'],
    body: [
      'Most AI products still treat context as a prelude. A user asks, a prompt is assembled, a model responds, and whatever happened before becomes a retrieval problem for the next turn. That is useful, but it is not yet a product architecture. It is a clever interface around a forgetful machine.',
      'The work that matters in a company is rarely contained in the latest message. It lives in half-finished decisions, meeting residue, founder taste, customer scars, system constraints, and the informal language a team uses when it knows what it means. If an agent cannot preserve that material, it will keep asking people to become its memory.',
      'I think the context layer becomes the product because it is where trust accumulates. It knows why a decision was made, what evidence supported it, who objected, what changed afterwards, and which assumptions are now stale. It can make an answer feel less like an oracle and more like a continuation of a real working relationship.',
      'This changes the shape of software. Instead of designing isolated tools, we design context-bearing systems: memory with provenance, actions with audit trails, interfaces that show why something is recommended, and workflows where human judgment is not bypassed but made easier to apply.',
      'The best context systems will feel quiet. They will not announce themselves as databases or copilots. They will make the right draft appear with the right constraints already loaded, the right task move at the right time, and the right person regain the thread without rereading a week of noise.',
      'When context becomes first-class, AI stops being a novelty layer and starts becoming an operating fabric for purposeful work. That is the product I want to build toward.',
    ],
  },
  {
    slug: 'why-agent-demos-break-in-production',
    title: 'Why Agent Demos Break in Production',
    date: 'May 02, 2025',
    category: 'Agents',
    summary:
      'Agent demos are optimized for spectacle. Production agents need memory boundaries, verifiable action, recovery paths, and a clear theory of when not to act.',
    image: agentsNeed,
    imageAlt:
      'Watercolor sketch of an agent loop with memory, tools, guardrails, and feedback arrows showing what production agents need beyond the demo.',
    readingTime: '8 min',
    tags: ['Agents', 'Reliability', 'Provenance'],
    body: [
      'The demo version of an agent is a magic trick: clean context, friendly tools, no legacy mess, and a user who knows exactly what to ask. Production is different. Production is a thousand small exceptions wearing a familiar interface.',
      'Agents break when they are allowed to act without understanding the shape of responsibility around the action. Sending an email is not hard. Knowing whether this email should be sent, what prior conversation it depends on, what promise it implies, and how to recover if the premise is wrong is the real system.',
      'A reliable agent needs at least four layers. It needs memory that distinguishes durable facts from temporary notes. It needs tools with explicit permissions and typed failure modes. It needs guardrails that are not just refusal policies but operational constraints. And it needs feedback loops from the real world so it can notice when its model of the work is drifting.',
      'The most important design choice is often restraint. A useful agent should know when to draft instead of send, ask instead of infer, summarize instead of decide, and stop instead of continuing a flawed chain of action. Autonomy without calibrated hesitation is just a faster way to create cleanup work.',
      'This is why provenance matters. People need to inspect the path from evidence to recommendation to action. They need to see which source was used, which assumption was made, and which human decision closed the loop. Without that, trust becomes a mood instead of a property of the system.',
      'I am interested in agents that make production work feel calmer: systems that remember what matters, act when it matters, and can prove why it mattered afterwards.',
    ],
  },
  {
    slug: 'designing-tools-that-disappear-into-the-work',
    title: 'Designing Tools That Disappear Into the Work',
    date: 'Apr 16, 2025',
    category: 'Product',
    summary:
      'The best tools reduce friction, preserve human taste, and make the work itself more visible than the interface around it.',
    image: quietUseful,
    imageAlt:
      'Watercolor study of a workspace where the interface fades into the background and the work itself moves to the foreground.',
    readingTime: '6 min',
    tags: ['Design', 'Craft', 'Tools', 'Context'],
    body: [
      'A tool disappears when it stops asking to be admired. It becomes part of the rhythm of the work: a pencil, a notebook margin, a command palette, a shared phrase that compresses a complicated decision into something a team can move with. The measure of the tool is not how clever it looks at rest. It is how much of the real work becomes visible when you pick it up.',
      'Many AI interfaces do the opposite. They pull attention toward the system. They make the user manage prompts, inspect verbose traces, retry brittle outputs, and perform confidence they do not feel. The interface becomes another job. The work the person actually came to do recedes behind the choreography of operating the assistant.',
      'A disappearing tool does not mean an invisible one. It means the surface is honest about where it belongs. It reveals state when state matters. It shows provenance when trust is needed. It gives the user a handle when judgment is required. Then it gets out of the way. The hard part is calibrating that rhythm so the system speaks at the right volume, and stays quiet the rest of the time.',
      'The design challenge is to protect human agency while increasing leverage. That means building workflows where AI can prepare, compare, remember, and execute, but where the person still feels authorship over the direction. The system should make someone more themselves at higher resolution, not flatten their voice into a generic competence that any team could have produced. Leverage without authorship is just borrowed taste, and borrowed taste does not survive contact with a hard decision.',
      'This is part of what I am trying to build with Contexta. The aspiration is not a chat surface that performs intelligence. It is a quiet substrate that holds the context of a real working life — decisions, drafts, half-formed assumptions, people, promises — and offers them back at the moment they are needed. The interface should feel less like a product and more like a well-kept studio: things arrive when you reach for them, the tools have a place, and yesterday is still legible when you walk back in. The output of that kind of system is not a flood of suggestions. It is a faster path from intention to a result the person can actually defend.',
      'A disappearing tool also has to be honest about failure. When the underlying model is unsure, the surface should say so without theatre. When an action depends on a brittle inference, it should defer to the human instead of inventing certainty. Calmness is not the absence of friction; it is friction placed at the moments where attention actually protects the work. The interfaces I trust are the ones that resist when they should, and disappear when they should, and never confuse the two.',
      'I keep returning to architecture as a metaphor. A good building does not disappear because it is absent. It disappears because it supports life without constantly explaining itself. The light is good. The acoustics are quiet. The doors open the way you expected. The best software for future work should have that same confidence: present, considered, almost unnoticed, and exactly there when the work begins.',
    ],
  },
];

export const projects: [Project, ...Project[]] = [
  {
    slug: 'contexta',
    name: 'Contexta',
    status: 'Building',
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
    links: [
      {
        href: 'mailto:alvis@hilbert.space?subject=Contexta',
        label: 'Discuss Contexta',
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
    links: [
      {
        href: 'mailto:alvis@hilbert.space?subject=Work%20for%20Future',
        label: 'Collaborate',
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
