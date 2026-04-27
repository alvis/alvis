import agentsNeed from '#public/images/blog/agents-need.png';

import type { StaticImageData } from 'next/image';

/**
 * structural unit of an essay body. discriminated union so future block kinds
 * (heading, pull quote, code listing, figure) can be added without breaking
 * existing renderers
 */
export type ContentBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; level: 2; text: string; emphasis?: string }
  | { kind: 'pull'; text: string }
  | { kind: 'code'; language: string; caption: string; source: string }
  | { kind: 'figure'; src: StaticImageData; alt: string; caption?: string };

export interface Essay {
  slug: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image: string;
  imageAlt: string;
  readingTime: string;
  tags: string[];
  links?: Array<{ href: string; label: string }>;
  body: ContentBlock[];
}

/* eslint-disable max-lines -- editorial content data; line count tracks essay
   length, not logical complexity. each entry is a single `Essay` literal. */

const essayCatalog: Essay[] = [
  {
    slug: 'presetter-v9-configuration-with-a-memory',
    title: 'Configuration Should Have a Memory: Presetter v9',
    date: 'Jun 27, 2026',
    category: 'Open source',
    summary:
      'Presetter began as a way to stop copying config files. Version 9 turns that small irritation into a clearer system for preserving engineering decisions across projects, packages, and time.',
    image: '/images/blog/presetter-memory.webp',
    imageAlt:
      'Watercolor study of a quiet engineering workbench, where configuration becomes background infrastructure instead of the work itself.',
    readingTime: '8 min',
    tags: ['Presetter', 'TypeScript', 'Open source', 'Developer tools'],
    links: [
      { href: 'https://presetter.dev/', label: 'Explore Presetter' },
      {
        href: 'https://github.com/alvis/presetter/releases/tag/v9.0.0',
        label: 'Read the v9.0.0 release',
      },
      {
        href: 'https://presetter.dev/docs/tutorials/migration-guides/v8-to-v9',
        label: 'Follow the v8 to v9 migration guide',
      },
    ],
    body: [
      {
        kind: 'paragraph',
        text: 'Every repository begins with a brief period of innocence. The TypeScript config is legible. ESLint has not yet acquired six local exceptions. The test runner does one obvious thing. Then the project lives. A framework changes, a package splits, somebody fixes CI at midnight, and the reasons behind the configuration begin to disappear while the files remain.',
      },
      {
        kind: 'paragraph',
        text: 'That was the irritation behind Presetter. I did not want another generator that made a project look tidy on day one. I wanted a way to preserve the engineering decisions that keep many projects coherent on day one hundred: what strict means here, which files count as source, how tests are named, what a monorepo may override, and where a deliberate exception belongs.',
      },
      {
        kind: 'heading',
        level: 2,
        text: 'Config drift is organizational memory loss',
        emphasis: 'memory',
      },
      {
        kind: 'paragraph',
        text: 'Teams usually experience configuration drift as friction. One package lints differently. Another compiles to an older target. A third has a hand-edited script nobody wants to touch. But the deeper failure is not duplication. It is memory loss. Each copied file separates a decision from the place where that decision can be explained, reviewed, and improved.',
      },
      {
        kind: 'paragraph',
        text: 'Presetter treats configuration as a composed source of truth. A project names the presets it needs; those presets contribute assets, variables, and scripts; explicit project choices can still override the result. The generated files remain readable because tools need ordinary files, but Git does not have to pretend those artifacts are the source of the decision.',
      },
      {
        kind: 'pull',
        text: '“The point is not fewer config files. It is fewer unexplained decisions.”',
      },
      {
        kind: 'heading',
        level: 2,
        text: 'Version 9 makes the system visible',
        emphasis: 'system',
      },
      {
        kind: 'paragraph',
        text: 'Presetter v9 moves every preset package into the @presetter scope. The CLI remains presetter, while packages such as @presetter/preset-essentials, @presetter/preset-react, and @presetter/preset-monorepo now read as parts of one ecosystem. A namespace rename sounds administrative until you maintain the project: it gives the public surface a boundary, makes ownership explicit, and creates room for the system to grow without inventing another naming convention.',
      },
      {
        kind: 'paragraph',
        text: 'The baseline moves forward too. TypeScript 6 is now the required peer, ES2024 is the default target, and the essentials preset enables noUncheckedIndexedAccess. The templates lean more heavily on TypeScript’s strict defaults instead of restating them. These are intentionally opinionated changes. A shared preset is valuable only when it is willing to turn accumulated experience into a better default.',
      },
      {
        kind: 'paragraph',
        text: 'Three new presets make the composition model more literal. Node and Bun now have their own runtime-aware foundations. Storybook becomes a first-class preset that can generate its configuration, scripts, ESLint rules, and Vitest browser project. Monorepos gain sub-level Vitest support, and bootstrap can target packages by package-name glob rather than only by project path.',
      },
      {
        kind: 'code',
        language: 'typescript',
        caption: 'presetter.config.ts — the project states its stack once',
        source: `import essentials from '@presetter/preset-essentials';
import node from '@presetter/preset-node';
import strict from '@presetter/preset-strict';
import { preset } from 'presetter';

export default preset('service', {
  extends: [essentials, node, strict],
});`,
      },
      {
        kind: 'heading',
        level: 2,
        text: 'The release pipeline is part of the product',
        emphasis: 'product',
      },
      {
        kind: 'paragraph',
        text: 'There is another part of v9 I care about because users rarely see it directly. Changelogs now come from git-cliff, packages are published with provenance, and the release workflow is designed to resume when a partially completed publish meets a package version that already exists. Shipping open source is not only the code inside the tarball. It is the evidence around the tarball and the ability to recover when the happy path breaks halfway through.',
      },
      {
        kind: 'paragraph',
        text: 'That work is deliberately boring. Good infrastructure often is. The release should be verifiable; the package graph should move in lockstep; a rerun should continue instead of turning partial success into a manual incident. Reliability is a feature even when its interface is a quiet green check.',
      },
      {
        kind: 'heading',
        level: 2,
        text: 'Upgrading without pretending nothing changed',
        emphasis: 'changed',
      },
      {
        kind: 'paragraph',
        text: 'Version 9 is a major release because the package namespace, TypeScript baseline, supported Node versions, and several script names change. The honest upgrade path is to follow the migration guide, replace the old presetter-preset-* packages with their @presetter/* equivalents, and regenerate the project files. The generated diff is useful: it shows exactly how the new shared decisions meet the local project.',
      },
      {
        kind: 'code',
        language: 'shell',
        caption: 'Upgrade the core and two common presets with pnpm',
        source: `pnpm add -D presetter@^9.0.0 \\
  @presetter/preset-essentials@^9.0.0 \\
  @presetter/preset-esm@^9.0.0

pnpm exec presetter bootstrap`,
      },
      {
        kind: 'heading',
        level: 2,
        text: 'Configuration is context',
        emphasis: 'context',
      },
      {
        kind: 'paragraph',
        text: 'I have spent a lot of time thinking about context for AI, but software projects have always had the same problem. They inherit decisions without inheriting the situation that produced them. Presetter is a small attempt to make that context durable: compose it, name it, keep the escape hatches visible, and let each repository receive the latest version without erasing what makes it local.',
      },
      {
        kind: 'paragraph',
        text: 'Version 9 does not make configuration disappear. It makes configuration quieter because its decisions have somewhere to live. That is the kind of tool I want to keep building: present when judgment is needed, almost invisible when the real work begins.',
      },
    ],
  },
  {
    slug: 'context-layer-is-the-product',
    title: 'The Context Layer Is the Product',
    date: 'May 19, 2025',
    category: 'Systems',
    summary:
      'Context shapes decisions, creates leverage, and compounds over time. The next durable AI products will treat context as infrastructure, not prompt decoration.',
    image: '/images/blog/context-product.png',
    imageAlt:
      'Watercolor diagram of overlapping context layers feeding a central decision surface, illustrating context as product infrastructure.',
    readingTime: '7 min',
    tags: ['Context', 'AI systems', 'Knowledge work'],
    body: [
      {
        kind: 'paragraph',
        text: 'Most AI products still treat context as a prelude. A user asks, a prompt is assembled, a model responds, and whatever happened before becomes a retrieval problem for the next turn. That is useful, but it is not yet a product architecture. It is a clever interface around a forgetful machine.',
      },
      {
        kind: 'paragraph',
        text: 'The work that matters in a company is rarely contained in the latest message. It lives in half-finished decisions, meeting residue, founder taste, customer scars, system constraints, and the informal language a team uses when it knows what it means. If an agent cannot preserve that material, it will keep asking people to become its memory.',
      },
      {
        kind: 'paragraph',
        text: 'I think the context layer becomes the product because it is where trust accumulates. It knows why a decision was made, what evidence supported it, who objected, what changed afterwards, and which assumptions are now stale. It can make an answer feel less like an oracle and more like a continuation of a real working relationship.',
      },
      {
        kind: 'paragraph',
        text: 'This changes the shape of software. Instead of designing isolated tools, we design context-bearing systems: memory with provenance, actions with audit trails, interfaces that show why something is recommended, and workflows where human judgment is not bypassed but made easier to apply.',
      },
      {
        kind: 'paragraph',
        text: 'The best context systems will feel quiet. They will not announce themselves as databases or copilots. They will make the right draft appear with the right constraints already loaded, the right task move at the right time, and the right person regain the thread without rereading a week of noise.',
      },
      {
        kind: 'paragraph',
        text: 'When context becomes first-class, AI stops being a novelty layer and starts becoming an operating fabric for purposeful work. That is the product I want to build toward.',
      },
    ],
  },
  {
    slug: 'why-agent-demos-break-in-production',
    title: 'Why Agent Demos Break in Production',
    date: 'May 02, 2025',
    category: 'Agents',
    summary:
      'Agent demos are optimized for spectacle. Production agents need memory boundaries, verifiable action, recovery paths, and a clear theory of when not to act.',
    image: '/images/blog/agents-need.png',
    imageAlt:
      'Watercolor sketch of an agent loop with memory, tools, guardrails, and feedback arrows showing what production agents need beyond the demo.',
    readingTime: '8 min',
    tags: ['Agents', 'Reliability', 'Provenance'],
    body: [
      {
        kind: 'paragraph',
        text: 'The demo version of an agent is a magic trick: clean context, friendly tools, no legacy mess, and a user who knows exactly what to ask. Production is different. Production is a thousand small exceptions wearing a familiar interface.',
      },
      {
        kind: 'paragraph',
        text: 'Agents break when they are allowed to act without understanding the shape of responsibility around the action. Sending an email is not hard. Knowing whether this email should be sent, what prior conversation it depends on, what promise it implies, and how to recover if the premise is wrong is the real system.',
      },
      {
        kind: 'paragraph',
        text: 'A reliable agent needs at least four layers. It needs memory that distinguishes durable facts from temporary notes. It needs tools with explicit permissions and typed failure modes. It needs guardrails that are not just refusal policies but operational constraints. And it needs feedback loops from the real world so it can notice when its model of the work is drifting.',
      },
      {
        kind: 'paragraph',
        text: 'The most important design choice is often restraint. A useful agent should know when to draft instead of send, ask instead of infer, summarize instead of decide, and stop instead of continuing a flawed chain of action. Autonomy without calibrated hesitation is just a faster way to create cleanup work.',
      },
      {
        kind: 'paragraph',
        text: 'This is why provenance matters. People need to inspect the path from evidence to recommendation to action. They need to see which source was used, which assumption was made, and which human decision closed the loop. Without that, trust becomes a mood instead of a property of the system.',
      },
      {
        kind: 'paragraph',
        text: 'I am interested in agents that make production work feel calmer: systems that remember what matters, act when it matters, and can prove why it mattered afterwards.',
      },
    ],
  },
  {
    slug: 'designing-tools-that-disappear-into-the-work',
    title: 'Designing Tools That Disappear Into the Work',
    date: 'Apr 16, 2025',
    category: 'Product',
    summary:
      'The best tools reduce friction, preserve human taste, and make the work itself more visible than the interface around it.',
    image: '/images/blog/quiet-useful.png',
    imageAlt:
      'Watercolor study of a workspace where the interface fades into the background and the work itself moves to the foreground.',
    readingTime: '6 min',
    tags: ['Design', 'Craft', 'Tools', 'Context'],
    body: [
      {
        kind: 'paragraph',
        text: 'A tool disappears when it stops asking to be admired. It becomes part of the rhythm of the work: a pencil, a notebook margin, a command palette, a shared phrase that compresses a complicated decision into something a team can move with. The measure of the tool is not how clever it looks at rest. It is how much of the real work becomes visible when you pick it up.',
      },
      {
        kind: 'paragraph',
        text: 'Many AI interfaces do the opposite. They pull attention toward the system. They make the user manage prompts, inspect verbose traces, retry brittle outputs, and perform confidence they do not feel. The interface becomes another job. The work the person actually came to do recedes behind the choreography of operating the assistant.',
      },
      {
        kind: 'paragraph',
        text: 'A disappearing tool does not mean an invisible one. It means the surface is honest about where it belongs. It reveals state when state matters. It shows provenance when trust is needed. It gives the user a handle when judgment is required. Then it gets out of the way. The hard part is calibrating that rhythm so the system speaks at the right volume, and stays quiet the rest of the time.',
      },
      {
        kind: 'paragraph',
        text: 'The design challenge is to protect human agency while increasing leverage. That means building workflows where AI can prepare, compare, remember, and execute, but where the person still feels authorship over the direction. The system should make someone more themselves at higher resolution, not flatten their voice into a generic competence that any team could have produced. Leverage without authorship is just borrowed taste, and borrowed taste does not survive contact with a hard decision.',
      },
      {
        kind: 'paragraph',
        text: 'This is part of what I am trying to build with Contexta. The aspiration is not a chat surface that performs intelligence. It is a quiet substrate that holds the context of a real working life — decisions, drafts, half-formed assumptions, people, promises — and offers them back at the moment they are needed. The interface should feel less like a product and more like a well-kept studio: things arrive when you reach for them, the tools have a place, and yesterday is still legible when you walk back in. The output of that kind of system is not a flood of suggestions. It is a faster path from intention to a result the person can actually defend.',
      },
      {
        kind: 'paragraph',
        text: 'A disappearing tool also has to be honest about failure. When the underlying model is unsure, the surface should say so without theatre. When an action depends on a brittle inference, it should defer to the human instead of inventing certainty. Calmness is not the absence of friction; it is friction placed at the moments where attention actually protects the work. The interfaces I trust are the ones that resist when they should, and disappear when they should, and never confuse the two.',
      },
      {
        kind: 'paragraph',
        text: 'I keep returning to architecture as a metaphor. A good building does not disappear because it is absent. It disappears because it supports life without constantly explaining itself. The light is good. The acoustics are quiet. The doors open the way you expected. The best software for future work should have that same confidence: present, considered, almost unnoticed, and exactly there when the work begins.',
      },
    ],
  },
  {
    slug: 'on-the-context-harness',
    title: 'On the Context Harness',
    date: 'May 18, 2026',
    category: 'Systems',
    summary:
      'A note on why the apparatus around the model — and not the model itself — has quietly become the substance of intelligent work.',
    image: '/images/blog/context-harness.webp',
    imageAlt:
      'Diagram of a context harness: tools, memory, retrieval, and instructions arranged around a central model.',
    readingTime: '9 min',
    tags: ['Context harness', 'Agents', 'Philosophy of tools'],
    body: [
      {
        kind: 'paragraph',
        text: 'There is a moment, when you have built with these models for long enough, that the question quietly inverts. You stop asking what the model can do and start asking what it has been given. The locus of attention shifts outward, from the engine to the harness — the small architecture of tools, memory, instructions, and retrieval sitting between the model and the world. What once felt like periphery turns out, on closer reading, to have been the work all along.',
      },
      {
        kind: 'paragraph',
        text: 'By harness I mean something more specific than scaffolding, though the field is still settling its terms. It is the loop that calls the model, parses its output, dispatches its tool calls, and decides when to stop. It is the rules for what gets remembered between sessions and what is allowed to be forgotten. It is the system prompt, the retrieval index, the schemas that constrain what the model is allowed to say back. It is, roughly, everything in the system except the model itself — which is to say, almost everything.',
      },
      {
        kind: 'paragraph',
        text: 'Philosophers have a name for the inversion. Heidegger called the everyday objects we use ready-to-hand: present not as objects of thought but as extensions of the act being performed. The hammer disappears into the hammering; we notice it only when it breaks. A model, likewise, fades into the workflow that holds it. We have spent two years staring at the hammer. The harness is what does the building.',
      },
      {
        kind: 'paragraph',
        text: 'It would be tempting to call this harness a kind of memory, but the analogy misleads more than it helps. Memory, in us, is reconstructive — biased toward meaning, shaped by what we cared enough to keep, distorted in ways that often turn out to be useful. A harness is curatorial. Someone has decided what to preserve, in what form, with what provenance, surfaced under what conditions.',
      },
      {
        kind: 'paragraph',
        text: 'It is closer, in this sense, to an archive than to a mind. And an archive, as Derrida liked to insist, is never neutral. It is bound up with the question of who keeps it and on whose authority. It encodes what its keepers believed was worth keeping. The phrase context engineering, now widely circulated, papers over an older and harder question: who decides what gets to count as context?',
      },
      {
        kind: 'paragraph',
        text: "This is why the harness is becoming the product. The model itself is drifting toward commodity; the harness is where a company's judgment now lives. Which evidence is admissible. Which interruptions are tolerable. Which actions require a second pair of eyes. Which silences are worth breaking. Software has always encoded judgment, but for the first time we are letting that judgment act quietly, on a user's behalf, without first being translated into a button to be pressed.",
      },
      {
        kind: 'pull',
        text: '“Most current AI products work in a void and call the void general intelligence.”',
      },
      {
        kind: 'paragraph',
        text: 'There is a humbler way to put it. The harness is where the model meets the situation, and a situation is not a prompt. It is a posture, a set of constraints, a history of what was tried last week, a sense of who is in the room and what they came in carrying. To be, Heidegger thought, is to be situated. To work without situation is to work in a void; most current AI products work in a void and call the void general intelligence.',
      },
      {
        kind: 'paragraph',
        text: "The literature has begun to acknowledge this in its own dialect. Even with context windows in the millions, practitioners report what they have started to call context rot: as the window fills, instruction-following decays and the model's grip on its task loosens. Bigger contexts, it turns out, are not better contexts. The size of the room is not the question. The question is what furniture has been arranged in it, and where the model has been asked to stand.",
      },
      {
        kind: 'paragraph',
        text: 'There is an older argument worth recalling here. In 1998, Andy Clark and David Chalmers proposed that the mind extends past the skull — that a notebook, in the hands of someone who relies on it, becomes part of how that person thinks. The harness is the analogous structure for a model. But the notebook in their parable belongs to the person who carries it; the harness, in most current products, is the curation of a third party. We are building extended cognition on borrowed notebooks.',
      },
      {
        kind: 'paragraph',
        text: 'I do not think this is, in itself, a problem. Most of cognition is borrowed; libraries and institutions and operating systems are also kinds of harness, and we have spent centuries making them tolerable. But the question of whose interests the curation serves is unresolved, and it will not be resolved by better retrieval. It will be resolved, if at all, by the slow accumulation of norms about what a system is allowed to remember, on whose behalf, and at whose request.',
      },
      {
        kind: 'paragraph',
        text: 'The work, then, is not to wait for the next checkpoint but to thicken the harness — to give the model a place to stand. Give me a place to stand, Archimedes is supposed to have said, and a lever long enough, and I will move the world. We have the lever. The place to stand is what we are still, slowly, learning how to build.',
      },
    ],
  },
  {
    slug: 'a-harness-in-eighty-lines',
    title: 'A Harness in Eighty Lines',
    date: 'May 11, 2026',
    category: 'Notebook',
    summary:
      'The smallest loop that calls a model, dispatches its tools, keeps a memory, and decides when to stop — and what each of those choices is actually saying.',
    image: '/images/blog/harness-eighty-lines.webp',
    imageAlt:
      'Workbench study: a single page of Python, a notebook, and a quiet lamp — the harness on a surface you can read in one sitting.',
    readingTime: '7 min',
    tags: ['Python', 'Agents', 'Engineering'],
    body: [
      {
        kind: 'paragraph',
        text: "The companion to last week's essay is an exercise: write the smallest harness you can stand behind. Not a framework, not an SDK — sixty or eighty lines that you understand entirely, that fail in ways you can name. What follows is mine. It is in Python because Python reads, on a good day, like a careful sentence. The same shape works in anything.",
      },
      {
        kind: 'paragraph',
        text: "The four things a harness actually does are: it calls the model; it routes the model's tool calls; it decides what to keep between turns; and it decides when to stop. Most production systems are these four things wearing a coat. The coat is important. The four things are more important.",
      },
      {
        kind: 'heading',
        level: 2,
        text: 'I. The loop is the harness',
        emphasis: 'is',
      },
      {
        kind: 'paragraph',
        text: 'Before anything else, there is a loop. The model speaks; the harness listens; the harness decides what to do with what was said; the model speaks again. It is unglamorous, and it is most of the work.',
      },
      {
        kind: 'code',
        language: 'python',
        caption: 'harness.py — the loop, in one breath',
        source: `def run(task: str, tools: dict, memory: Memory,
        policy: Policy, max_turns: int = 12) -> str | None:
    messages = [{"role": "user", "content": task}]

    for turn in range(max_turns):
        reply = call_model(messages, tools, memory.surface())

        if reply.stop_reason == "end_turn":
            memory.commit(reply.text)
            return reply.text

        for call in reply.tool_calls:
            result = dispatch(call, tools, policy)
            memory.observe(call, result)
            messages.append(as_tool_message(call, result))

        if should_stop(turn, memory, reply):
            return memory.summarize_so_far()

    return None  # ran out of turns; that is also an answer`,
      },
      {
        kind: 'paragraph',
        text: 'Notice what is not in this loop. There is no router, no agent type, no role-playing system prompt, no "planner" that writes a plan before doing the work. None of those are wrong; none of them are the harness. The harness is the four lines that decide what happens between two model calls.',
      },
      {
        kind: 'heading',
        level: 2,
        text: 'II. Memory is curation, not capture',
      },
      {
        kind: 'paragraph',
        text: 'The temptation, when the context window is large, is to put everything in it. Resist. A memory that stores everything is not a memory; it is a hopper. The job is to choose — what to keep, in what form, surfaced under what conditions.',
      },
      {
        kind: 'code',
        language: 'python',
        caption: 'memory.py — a curatorial store, not a hopper',
        source: `class Memory:
    """Curatorial. Keeps less than it sees."""

    def __init__(self, budget_tokens: int = 4000):
        self.budget = budget_tokens
        self.events: list[Event] = []   # tool calls + results
        self.notes:  list[str]   = []   # the model's own summaries

    def observe(self, call, result):
        # Summarize on the way in. The raw result rarely earns its tokens.
        summary = summarize(result, target_tokens=120)
        self.events.append(Event(call=call, summary=summary))

    def commit(self, final_text: str):
        self.notes.append(distill(final_text))

    def surface(self) -> list[str]:
        # Return what's likely relevant right now, within budget.
        recent  = self.events[-8:]
        salient = top_k_by_relevance(self.events[:-8], k=3)
        return [render(e) for e in (*salient, *recent)]`,
      },
      {
        kind: 'paragraph',
        text: "surface() is the interesting function. It is the part of the system that says: of everything we know, here is what this model, at this moment, should be standing on. The rest is archive. The harness's opinion about what counts as relevant lives inside three lines of Python, and changing them changes the system's character more than a new model would.",
      },
      {
        kind: 'pull',
        text: '“A memory that stores everything is not a memory; it is a hopper.”',
      },
      {
        kind: 'heading',
        level: 2,
        text: 'III. Stopping is a judgment',
      },
      {
        kind: 'paragraph',
        text: 'Most failed agents fail by not stopping. They loop, they re-fetch what they have already fetched, they refine a sentence that was fine an hour ago. A max_turns cap is the floor, not the ceiling, of the judgment we owe here.',
      },
      {
        kind: 'code',
        language: 'python',
        caption: "stopping.py — four ways to know you're done",
        source: `def should_stop(turn: int, memory: Memory, reply) -> bool:
    # 1. The model thinks it's done.
    if reply.stop_reason == "end_turn":
        return True

    # 2. The last three actions are duplicates of earlier ones.
    if is_looping(memory.events, window=3):
        return True

    # 3. We're spending more than the task is worth.
    if memory.cost_so_far() > memory.cost_budget:
        return True

    # 4. We've drifted off the original task.
    if drift_score(memory.notes, memory.original_task) > 0.6:
        return True

    return False`,
      },
      {
        kind: 'paragraph',
        text: 'Each of these conditions is a sentence about what the system is for. (1) trusts the model. (2) does not. (3) admits that an answer can be too expensive to be worth having. (4) is the one most systems forget: drift is silent, and the model cannot, by itself, notice that it is no longer doing the thing it was asked to do.',
      },
      {
        kind: 'heading',
        level: 2,
        text: 'IV. Tools have a politics',
      },
      {
        kind: 'paragraph',
        text: 'The last layer is the smallest and the most consequential. It is the part of the system that says: not that, not now, not without asking. Without it, a tool-using model is a fast intern with the master key.',
      },
      {
        kind: 'code',
        language: 'python',
        caption: 'policy.py — the part that says no',
        source: `class Policy:
    """The harness's conscience. Lives outside the model."""

    def __init__(self, rules):
        self.rules = rules

    def allows(self, call) -> bool:
        return all(rule(call) for rule in self.rules)

    def reason(self, call) -> str:
        for rule in self.rules:
            if not rule(call):
                return rule.__doc__ or "refused by policy"
        return ""


def dispatch(call, tools, policy):
    if not policy.allows(call):
        return f"refused: {policy.reason(call)}"
    try:
        return tools[call.name](**call.input)
    except Exception as e:
        # Errors are also context. Surface them; don't swallow.
        return f"error: {type(e).__name__}: {e}"`,
      },
      {
        kind: 'paragraph',
        text: 'I have come to think of the policy as the most honest part of the system, because it is the only part that has to say what it believes. A model can equivocate; a rule cannot. A rule is a promise the system has made to its user, in advance, in writing.',
      },
      {
        kind: 'paragraph',
        text: 'That is, roughly, the whole thing. About eighty lines, if you count the imports. It will not impress anyone in a demo. It will, with a little care, do most of what the demos do, in a shape you can stand behind on a Tuesday morning when someone asks you why it did what it did.',
      },
      {
        kind: 'paragraph',
        text: 'The point of writing it small is not minimalism. It is legibility. The reason to keep the harness on a page you can read in one sitting is so that the judgment it encodes — about memory, about stopping, about refusal — can be argued with. Everything else in a system can be borrowed. The judgment is yours to defend.',
      },
    ],
  },
  {
    slug: 'the-polite-agent',
    title: 'The Polite Agent',
    date: 'Apr 02, 2026',
    category: 'Agents',
    summary:
      'The best agents feel like collaborators, not servants. A note on tone, refusal, and the texture of usefulness.',
    image: '/images/blog/polite-agent.webp',
    imageAlt:
      'Watercolor study of an agent loop pausing mid-action — a collaborator weighing whether to speak, defer, or ask.',
    readingTime: '12 min',
    tags: ['Agents', 'Tone', 'Refusal'],
    body: [
      {
        kind: 'paragraph',
        text: 'There is a quiet test I have started applying to agents, almost without meaning to. After a few minutes of working with one, I ask myself whether I feel as though I have been collaborating with something, or whether I have been managing it. The two feel different in the body before they feel different in the analysis. A collaborator leaves the room slightly easier than they entered it. A servant leaves you tired in a way you cannot quite account for.',
      },
      {
        kind: 'paragraph',
        text: 'The difference, I think, is mostly tone. Not the surface tone — most products have long since learned to be polite in the shallow sense, the sense that involves please and thank you and an apology when something fails. I mean tone in the older sense: the posture an instrument takes toward the work. Lucy Suchman, writing about machines that try to act in human situations, pointed out that the trouble is rarely intelligence. It is that the machine has no sense of the situation it is acting inside. The polite agent is the one that behaves as if the situation is real.',
      },
      {
        kind: 'paragraph',
        text: 'Part of that is refusal, and refusal is harder than it looks. The unhelpful agent refuses by reflex; the obsequious one refuses nothing, which is its own form of unhelpfulness, because it forces the user to do the refusing on its behalf. A well-mannered refusal has a shape: it acknowledges what was asked, names the reason it will not do the thing, and offers a smaller thing it can do instead. It is the difference between a door that is locked and a door that is locked with a note on it. The note is the entire interface.',
      },
      {
        kind: 'paragraph',
        text: 'I have started to think of tone as the texture of usefulness. A useful agent that grates is, over a week, less useful than a slightly less capable one that fits into the rhythm of the work. People will route around the abrasive collaborator, even if the abrasive collaborator is technically better. We are not, most of us, looking for the most capable possible assistant. We are looking for the one we can work next to without holding our breath.',
      },
      {
        kind: 'figure',
        src: agentsNeed,
        alt: 'Watercolor sketch of two figures at a shared workbench, one human, one agent — the agent pausing to listen.',
        caption: 'A collaborator is the loop running with care.',
      },
      {
        kind: 'paragraph',
        text: 'The hardest tonal move, I suspect, is the agent that knows when to be quiet. Most assistants speak when spoken to and then keep speaking; the best ones learn that a great deal of collaboration is silence that does not need to be filled. A draft left on the desk. A question asked once and not repeated. An action half-prepared, awaiting a yes. The work of the polite agent is to make the next move easy for the human, not to perform competence in the moment.',
      },
      {
        kind: 'paragraph',
        text: 'None of this is solved by a better model. It is solved by deciding, deliberately and in advance, what kind of company you are building. Tone is downstream of values; refusal is downstream of conviction; the texture of usefulness is downstream of having spent time, on purpose, thinking about what it feels like to be on the other side of the thing you have made. The polite agent is not a feature. It is a stance the system takes, encoded somewhere small, that the user will feel long before they can name.',
      },
    ],
  },
];

essayCatalog.sort(
  (left, right) => Date.parse(right.date) - Date.parse(left.date),
);

export const essays = essayCatalog;

/* eslint-enable max-lines */
