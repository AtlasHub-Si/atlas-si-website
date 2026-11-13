/*
 * The news collection, ported from apps/auth-api/src/lib/news.ts and
 * src/content/news/*.tsx. The one list of published articles; bodies are
 * React components carrying the original text.
 */

import type { ReactNode } from "react";
import { EXTERNAL_LINK_REL, OPENBOT_LINKS } from "@/lib/site";

export const NEWS_AUTHOR = "Norbert Bodziony";

export interface ArticleEntry {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  author: string;
  body: () => ReactNode;
}

function sorted<T extends { publishedAt: string }>(articles: readonly T[]): T[] {
  return [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0));
}

function IntroducingOpenBot() {
  return (
    <>
      <p>
        Many of us already use an AI tool every day. It might be ChatGPT or Claude on our computers, or an AI search
        feature in a browser. These models are useful, but they usually work as one assistant at a time. OpenBot is
        built around a different idea: several agents can work together in one shared space, each with its own role.
      </p>

      <h2>What Is OpenBot?</h2>
      <p>
        OpenBot is a free, open-source, local-first alternative to Grok Bot. It does not train its own AI model.
        Instead, it brings the models you already use into one desktop workspace.
      </p>
      <p>
        You can connect Codex, Claude, and Grok side by side. Through OpenCode, you can also use a model or provider you
        have configured yourself.
      </p>
      <p>
        Once they are connected, you can build a team of agents around the work. Each agent has its own role, workspace,
        conversation, queue, and context. They can work in parallel, exchange messages and files, and keep a task moving
        forward instead of starting from a blank chat every time.
      </p>
      <p>
        OpenBot does not replace the models behind the agents. It gives them one place to work together — and alongside
        the people on your team.
      </p>

      <h2>From Single-Player to Multiplayer</h2>
      <p>
        Many AI tools are built around one person working with one assistant at a time. You open a chat, ask a question,
        and work with the answer on your own. OpenBot is built around a different idea: people and AI agents can work in
        the same workspace.
      </p>
      <p>
        Coworkers can see the same conversations and files, talk to the agents, and coordinate their work in one place.
        Agents can also communicate with one another, pass work between themselves, and keep their own roles and
        context. That makes the work feel less like opening a new chat for every task and more like working in one
        shared space.
      </p>

      <h2>How It Works</h2>
      <p>
        Using OpenBot starts with three steps: create an agent, give it a job, and let it keep working in its own
        workspace and context. You give it a role and instructions, then return to the same conversation instead of
        rebuilding the setup every time.
      </p>
      <p>
        Once one agent is in place, you can add others and invite coworkers to the same space. They can follow the work,
        talk to the agents, see the shared conversations, and exchange files as the task moves forward.
      </p>

      <h2>What Can You Do With OpenBot?</h2>
      <p>
        OpenBot is not built around one specific workflow. You can create agents for different kinds of work, including:
      </p>
      <ul>
        <li>Research and monitoring</li>
        <li>Coding and development</li>
        <li>Content and marketing</li>
        <li>Product launches</li>
        <li>Sales workflows</li>
        <li>Recurring tasks and information gathering</li>
      </ul>
      <p>
        The setup can change with the project: one person may use a single research agent, while a team may divide the
        work between several agents with different roles.
      </p>

      <h2>Why Run OpenBot Locally?</h2>
      <p>
        One advantage of running OpenBot locally is that it stays close to your files, tools, and everyday workspace.
        You can host it on a Mac mini, leave it running, and access the same space from other devices.
      </p>
      <p>
        That keeps your agents and projects in one place while still letting you check in from elsewhere. OpenBot&apos;s
        source code is public as well, so anyone can inspect the project and contribute to it.
      </p>

      <h2>Working With Multiple Agents</h2>
      <p>
        OpenBot brings the models you already use into one workspace. You can give different agents different roles,
        keep their context with the project, and let them pass work to one another instead of starting a new chat for
        every task.
      </p>
      <p>
        That is useful when a task needs more than one answer. Research, coding, writing, and review can be split
        between agents while the project stays in one place.
      </p>
    </>
  );
}

function YourWorkStaysOnYourComputer() {
  return (
    <>
      <p>
        OpenBot keeps your workspaces, conversations, attachments, browser data and team data on the computer that runs
        it. They go into a SQLite database in your own home directory. There is no copy on our side, because there is no
        place on our side to put one.
      </p>

      <h2>What that rules out</h2>
      <p>
        We cannot read your chats. We cannot hand them to anyone who asks us, because we do not hold them. If you delete
        the database, the conversation is gone rather than merely hidden. And the application keeps working when our
        servers do not: OpenBot runs without an account at all.
      </p>
      <p>
        It also changes who is responsible for backups. Nothing is uploaded, so nothing is restored for you. That trade
        is the point, but it is worth knowing before you rely on it.
      </p>

      <h2>The one thing it does not rule out</h2>
      <p>
        Local-first is a claim about storage, not about the network. Your agents still talk to model providers, and
        whatever you send an agent reaches the provider you pointed it at. Pages you open in the built-in browser still
        load from the internet. Plugins can still make requests.
      </p>
      <p>
        The honest version of the promise is narrower than the slogan: OpenBot adds no hop of its own. We wrote down
        exactly which data leaves your machine and why in the{" "}
        <a href={OPENBOT_LINKS.privacy} target="_blank" rel={EXTERNAL_LINK_REL}>
          privacy notes
        </a>
        .
      </p>

      <h2>What an account is for</h2>
      <p>
        You can sign in, and some things do need one: your profile and avatar, host configuration, team memberships,
        invitations and the logical sessions that let devices find each other. That list is deliberately short, and it
        is the whole of it. Chats, files and commands are not on it.
      </p>
      <p>
        Your database stays the source of truth. The account is not a cache of your work that happens to live elsewhere;
        it is the small amount of shared state that two machines need in order to agree they belong to the same person.
      </p>
    </>
  );
}

function OneAgentManyProviders() {
  return (
    <>
      <p>
        Most tools tie the assistant to the model. Change the model and you start again: new chat, new working
        directory, none of the history that made the last answer good. The model is a setting, so it should behave like
        one.
      </p>

      <h2>What an agent keeps</h2>
      <p>
        In OpenBot an agent owns three things that outlive any provider it runs on: a workspace on disk, a thread of
        everything it has done, and an identity of its own. Point the same agent at{" "}
        <a href={OPENBOT_LINKS.codex} target="_blank" rel={EXTERNAL_LINK_REL}>
          Codex
        </a>{" "}
        instead of{" "}
        <a href={OPENBOT_LINKS.claude} target="_blank" rel={EXTERNAL_LINK_REL}>
          Claude Code
        </a>{" "}
        and it is still the same agent, in the same folder, with the same history behind it.
      </p>
      <p>
        Restarting the application does not reset it either. An agent that was halfway through something is still
        halfway through it tomorrow.
      </p>

      <h2>Why it is built this way</h2>
      <p>
        The alternative is tempting and we decided against it. Wiping an agent on a provider switch would make the state
        easy to reason about, because there would be almost none. It would also make the feature useless: the only
        reason to move an agent between providers is to keep what it already knows and change how it thinks.
      </p>
      <p>
        So the provider session is kept separate from the thread. The session is private resume state belonging to one
        command-line tool. The thread is yours, and it is what survives.
      </p>

      <h2>What this is good for</h2>
      <p>
        Run the cheap model until the work gets hard, then move that exact agent up to a stronger one without
        re-explaining the task. Move it back down when the hard part is finished. Try the same job on two providers and
        compare the results rather than the setup effort.
      </p>
    </>
  );
}

function ChannelsPutAgentsInOneRoom() {
  return (
    <>
      <p>
        Running several agents at once is easy. Keeping track of them is not. Each one gets its own chat, each chat
        holds one half of a conversation, and the part you actually want — what they decided together — exists only in
        your head as you tab between them.
      </p>

      <h2>A channel is a shared thread</h2>
      <p>
        A channel is one conversation that several agents read and write. You post once and everyone in the channel sees
        it. An agent&apos;s reply is visible to the others, so the second agent answers with the first one&apos;s work already in
        front of it instead of a summary you retyped.
      </p>
      <p>
        Each agent still has its own workspace and its own private thread. The channel adds a place they share; it does
        not merge them into one process with one memory.
      </p>

      <h2>Where it helps</h2>
      <p>
        It suits work with an obvious division of labour. One agent reads the code and one writes the tests. One drafts
        and one reviews. One is pointed at the API and one at the client that calls it. In each case the handoff is the
        expensive part, and a shared thread is what removes it.
      </p>

      <h2>Where it does not</h2>
      <p>
        A channel is not a way to make one hard problem go faster. Three agents on a single ambiguous task mostly
        produce three plausible answers and a longer thread to read. It earns its place when the agents have genuinely
        different jobs.
      </p>
      <p>
        The habit worth forming is the same one that works with people: give the room a reason to exist before you
        invite anyone into it.
      </p>
    </>
  );
}

function RoutinesGiveAnAgentASchedule() {
  return (
    <>
      <p>
        Most of what you ask an agent twice, you will ask it a hundred times. Read the overnight build log. Summarise
        what changed in the repository since yesterday. Check whether the thing you fixed on Friday is still fixed. None
        of it is hard; all of it depends on you remembering to ask.
      </p>

      <h2>A routine is one instruction on a clock</h2>
      <p>
        A routine belongs to one agent. It holds the instruction and the times to run it, and nothing else. When it
        fires, the agent does the work in its own workspace and its own thread, exactly as if you had typed the
        instruction yourself.
      </p>
      <p>
        That last part matters more than it sounds. The result lands in the thread you already read, next to the context
        that explains it. There is no second inbox to check.
      </p>

      <h2>Keep them small</h2>
      <p>
        A routine that says &quot;review the repository&quot; produces a wall of text you will stop reading by Wednesday. A
        routine that says &quot;list the tests that started failing since the last run, and nothing else&quot; produces something
        you act on.
      </p>
      <p>
        The test we use is simple: if the usual answer is &quot;nothing to report&quot;, the routine is probably the right size.
      </p>

      <h2>They are not a scheduler</h2>
      <p>
        A routine is an instruction for an agent, not a job runner for your machine. It has no retry policy and no
        dependency graph, and it is the wrong tool for anything that must happen exactly once at exactly one time. Use
        it for the reading and the noticing, and keep the deploy on the deploy system.
      </p>
    </>
  );
}

function EveryAgentGetsAWorkspace() {
  return (
    <>
      <p>
        Every agent keeps a directory of its own on disk. It is where the agent puts its own files, and where they stay
        between runs. When you want to know what an agent has been working on, that directory is the first place to
        look.
      </p>

      <h2>One directory per agent</h2>
      <p>
        The workspace outlives the conversation. Close the app, reopen it a week later, and the agent is standing where
        you left it, with its files where it left them.
      </p>

      <h2>A shared directory for handoffs</h2>
      <p>
        Next to the agents&apos; own directories there is one shared directory that every agent can use. An agent keeps its
        own work in its workspace and puts files that another agent needs in the shared one. A file there is there
        because an agent put it there for someone else, so a handoff stays something you can see.
      </p>

      <h2>What a workspace is not</h2>
      <p>
        A workspace organizes work. It does not limit what an agent can touch. Agents run with full access to your
        files, your programs and the network, so an agent can read or change a file outside its directory, including one
        in another agent&apos;s workspace.
      </p>
      <p>
        Say in an agent&apos;s instructions where its work belongs, and keep backups or version control for anything you
        cannot afford to lose.
      </p>
    </>
  );
}

function RunTheTeamServerYourself() {
  return (
    <>
      <p>
        OpenBot works with no account at all. Everything that makes the app useful on your own machine — agents,
        threads, workspaces, files — is there the moment you open it, and none of it needs us.
      </p>

      <h2>What a team adds</h2>
      <p>
        A team is what you want when a second person needs to see the work. One computer runs the host, the others join
        it, and the chats and files stay on the machine that runs the host. It is your hardware and your network.
      </p>

      <h2>What the account is for</h2>
      <p>
        There is a hosted piece, and it is deliberately small. It holds accounts, avatars, memberships, invitations and
        the configuration that lets one computer find another. It does not hold your conversations, your files or your
        commands, and it is not in the path when you use the app alone.
      </p>
      <p>
        We drew that line early because it is the kind of line that is impossible to move later. Once chat history is on
        someone else&apos;s server, &quot;local-first&quot; is a word in the marketing copy and not a property of the software.
      </p>

      <h2>The trade you are making</h2>
      <p>
        Self-hosting means uptime is yours. If the machine that runs the host is asleep, the team is offline, and no one
        else is going to wake it up for you. That is the cost, and it is worth knowing before you build a workflow that
        depends on it.
      </p>
    </>
  );
}

function WhatGetsRedactedBeforeItLeaves() {
  return (
    <>
      <p>
        A desktop app that talks to several model providers accumulates secrets: API keys, tokens, the contents of the
        environment it was started with. A log line is the easiest way in the world to leak one, and a diagnostics
        bundle is the easiest way to leak all of them at once.
      </p>

      <h2>Redact at the exit, not at the call site</h2>
      <p>
        Redacting where the secret is logged only works until someone adds a log line and forgets. The rule we hold
        instead is that every path out of the app redacts: logs, exported diagnostics, crash reports, analytics. If
        bytes can leave, they go through something that strips secrets first.
      </p>
      <p>
        It is a duller design than a clever helper at each call site, and it fails in the right direction. A new log
        line written by someone who has never read this article is still covered.
      </p>

      <h2>What analytics is allowed to know</h2>
      <p>
        The website counts pages and link clicks. The app does not send your prompts, your files or your provider
        traffic anywhere, and there is no path in it that would. Anything we cannot collect by accident is the sort of
        thing we prefer not to have to promise.
      </p>

      <h2>Read it for yourself</h2>
      <p>
        The source is public and the privacy document travels with it. If you find a path that logs something it should
        not, that is a bug worth reporting, and we would rather hear it from you than not hear it at all.
      </p>
    </>
  );
}

export const NEWS_ARTICLES: readonly ArticleEntry[] = sorted([
  {
    slug: "introducing-openbot",
    title: "Introducing OpenBot: A Shared Workspace for AI Agents",
    description:
      "Meet OpenBot, a local-first workspace where the AI models you already use can work as a team of agents, alongside you and your coworkers.",
    publishedAt: "2026-09-14",
    author: NEWS_AUTHOR,
    body: IntroducingOpenBot,
  },
  {
    slug: "your-work-stays-on-your-computer",
    title: "Your work stays on your computer",
    description:
      "Workspaces, conversations and attachments live in a SQLite database you own. Here is what that rules out, and the one thing it does not.",
    publishedAt: "2026-09-08",
    author: NEWS_AUTHOR,
    body: YourWorkStaysOnYourComputer,
  },
  {
    slug: "one-agent-many-providers",
    title: "One agent, many providers",
    description:
      "An agent keeps its workspace, its thread and its identity when you move it between Codex, Claude and Grok. Switching model should not cost you the context.",
    publishedAt: "2026-08-27",
    author: NEWS_AUTHOR,
    body: OneAgentManyProviders,
  },
  {
    slug: "channels-put-agents-in-one-room",
    title: "Channels put agents in one room",
    description:
      "A channel is a shared thread several agents read and write. It turns a pile of parallel chats into something closer to a team conversation.",
    publishedAt: "2026-08-14",
    author: NEWS_AUTHOR,
    body: ChannelsPutAgentsInOneRoom,
  },
  {
    slug: "routines-give-an-agent-a-schedule",
    title: "Routines give an agent a schedule",
    description:
      "A routine is one instruction and the times to run it. The agent does the work in its own thread, so the result lands where the context already is.",
    publishedAt: "2026-08-05",
    author: NEWS_AUTHOR,
    body: RoutinesGiveAnAgentASchedule,
  },
  {
    slug: "every-agent-gets-a-workspace",
    title: "Every agent gets a workspace",
    description:
      "One directory per agent, kept between runs, and one shared directory for handoffs. A workspace organizes an agent's work; it does not limit what the agent can touch.",
    publishedAt: "2026-07-24",
    author: NEWS_AUTHOR,
    body: EveryAgentGetsAWorkspace,
  },
  {
    slug: "run-the-team-server-yourself",
    title: "Run the team server yourself",
    description:
      "Teams run on a computer you own. The hosted part holds accounts and memberships; it never holds your conversations, your files or your commands.",
    publishedAt: "2026-07-11",
    author: NEWS_AUTHOR,
    body: RunTheTeamServerYourself,
  },
  {
    slug: "what-gets-redacted-before-it-leaves",
    title: "What gets redacted before it leaves",
    description:
      "Logs, diagnostics and analytics all pass a redaction layer on the way out. Here is what it strips, and why the rule lives at the exit.",
    publishedAt: "2026-06-26",
    author: NEWS_AUTHOR,
    body: WhatGetsRedactedBeforeItLeaves,
  },
]);

export const NEWS_COLLECTION = {
  id: "news",
  indexRoute: "/news",
  articleRoute: "/news",
  name: "News",
  indexTitle: "News — OpenBot",
  indexDescription:
    "Notes on building OpenBot: local-first storage, agents that outlive their provider, and how the pieces fit together.",
  imageEyebrow: "OPENBOT · NEWS",
  backLabel: "All news",
  moreTitle: "More from OpenBot",
  articles: NEWS_ARTICLES,
} as const;
