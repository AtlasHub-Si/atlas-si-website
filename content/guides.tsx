/*
 * The guides collection, ported from apps/auth-api/src/lib/guides.ts and
 * src/content/guides/*.tsx. Media lives in /public/media/guides/<slug>/.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleClip, ArticleGif, ArticleImage, ArticleVideo } from "@/components/content/article-media";
import { EXTERNAL_LINK_REL, ATLASBOT_LINKS } from "@/lib/site";
import type { ArticleEntry } from "@/content/news";

function sorted<T extends { publishedAt: string }>(articles: readonly T[]): T[] {
  return [...articles].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : 0));
}

function AtlasBot101() {
  return (
    <>
      <p>
        I built AtlasBot because I wanted teammates, not chats. A chat window forgets. A teammate keeps the folder it
        works in, the history of what it did, and a name you can call it by. Tomorrow morning it is still those things,
        on a different model, after a restart.
      </p>
      <p>
        This is the page I would send someone who has never opened the app. It covers what AtlasBot is, what an agent
        actually owns, and how to get one doing work you can check.
      </p>

      <h2>What AtlasBot is</h2>
      <p>
        AtlasBot is a desktop workspace for AI teammates that live on your computer. It runs the coding command-line
        tools you already use as processes on that machine:{" "}
        <a href={ATLASBOT_LINKS.codex} target="_blank" rel={EXTERNAL_LINK_REL}>
          the Codex App Server
        </a>
        ,{" "}
        <a href={ATLASBOT_LINKS.claude} target="_blank" rel={EXTERNAL_LINK_REL}>
          Claude Code
        </a>
        , Grok CLI and OpenCode. Each agent gets a workspace, a thread and an identity around them.
      </p>
      <p>
        Your work sits in a SQLite database called <code>atlasbot.db</code>, in the application&apos;s data folder. That file
        is the source of truth. Workspaces, conversations, attachments, browser data and team data stay on the computer
        that runs AtlasBot.
      </p>
      <p>
        <strong>Local-first is not the same as offline.</strong> Codex still talks to OpenAI, Claude to Anthropic, Grok
        to xAI. Pages in the embedded browser use the network. A plugin can call its own service. What does not leave is
        the record of the work.
      </p>

      <h2>Anatomy of an agent</h2>
      <p>Four things belong to an agent. All four survive a restart and a change of model:</p>
      <ul>
        <li>
          <strong>A workspace.</strong> One directory of its own at <code>~/AtlasBot/Agents/&lt;agent-id&gt;</code>. It
          also gets <code>~/AtlasBot/Shared</code>, which is where agents hand files to each other.
        </li>
        <li>
          <strong>A thread.</strong> Everything you have asked the agent, and everything it did, in one durable record.
        </li>
        <li>
          <strong>An identity.</strong> A name, an avatar, a short role and the instructions you wrote for it.
        </li>
        <li>
          <strong>A private provider session.</strong> The resume state of the command-line tool behind it. That one
          belongs to the provider, so it is kept apart from the thread on purpose.
        </li>
      </ul>
      <p>
        That is why a model is just a setting. Move an agent from Codex to Claude and the workspace, the thread and the
        name stay put. Only the thinking changes.
      </p>
      <ArticleImage
        src="/media/guides/atlasbot-101/a-thread.webp"
        alt="An agent thread. Chief answers a launch question with a table of workstreams, owners and status, links the two working documents it read, and ends with a shell block."
        width={2400}
        height={1064}
        mountOn="AtlasBot 101"
        caption="A thread is the answer and the work behind it: mentions of other agents, the files that were read, and the command it wants run next."
      />

      <h2>Install it, then connect a provider</h2>
      <p>
        AtlasBot runs on macOS 13 or newer on Apple silicon, Windows 10 or newer on x64, and x64 Linux as an AppImage.
        Grab the installer from{" "}
        <a href={ATLASBOT_LINKS.releases} target="_blank" rel={EXTERNAL_LINK_REL}>
          GitHub Releases
        </a>
        . The Windows preview is not code-signed yet, so Windows may warn about an unknown publisher. Check the release
        checksum before you run it. On Ubuntu 23.10 or newer and on Debian 13, the AppImage needs an AppArmor profile
        first.{" "}
        <a href={ATLASBOT_LINKS.documentation} target="_blank" rel={EXTERNAL_LINK_REL}>
          The README
        </a>{" "}
        has the two commands that install it.
      </p>
      <p>
        Then pick a provider. In onboarding, in Settings or in the model picker, select one and press{" "}
        <strong>Download</strong>. AtlasBot installs and pins its own managed copy of that command-line tool. If you
        already installed the tool yourself and there is no managed copy, AtlasBot uses yours.
      </p>
      <p>
        <strong>AtlasBot uses the login the command-line tool already has.</strong> It does not copy your provider
        credentials. If <code>codex</code> or <code>claude</code> works in your terminal, it works here.
      </p>
      <ArticleImage
        src="/media/guides/atlasbot-101/pick-a-model.webp"
        alt="The model picker open on the ChatGPT tab, showing the installed Codex CLI version, a list of GPT models, and a reasoning effort control."
        width={1440}
        height={1484}
        mountOn="AtlasBot 101"
        caption="The picker names the command-line tool and its version, so you can see which binary an answer came from."
      />

      <h2>Your first task</h2>
      <p>
        Make the first one small, specific and checkable. &ldquo;Improve my project&rdquo; gets you an essay. &ldquo;Read the failing test
        in this file and tell me which claim it disproves&rdquo; gets you something you can agree or disagree with.
      </p>
      <p>
        Then look at the activity under the answer, not only the answer. The thread shows the files the agent opened and
        the commands it ran. That is how you tell whether it did the work or described it.
      </p>

      <h2>Full access, and what that means</h2>
      <p>
        AtlasBot is a development preview. After you consent once at first launch, agents run with{" "}
        <code>danger-full-access</code> and <code>approvalPolicy: never</code>. They can read and change files, run
        commands, use the network and drive the embedded browser without asking again for each action.
      </p>
      <p>
        <strong>This is a product decision, not a security boundary.</strong> An agent starts in its own workspace, but
        these provider modes are unrestricted on purpose. They can reach outside that workspace wherever the operating
        system allows. Run agents and tasks you trust, and keep backups.
      </p>
      <p>
        What the application sends, and what it never sends, is written down in{" "}
        <a href={ATLASBOT_LINKS.privacy} target="_blank" rel={EXTERNAL_LINK_REL}>
          the privacy document
        </a>
        .
      </p>

      <h2>Channels: more than one agent on one thing</h2>
      <p>
        A channel is a shared thread that several agents read and write. One agent owns the task at a time, and it hands
        the task on explicitly. You keep the controls: Stop, Resume, Reassign, Archive and Restore.
      </p>
      <p>
        It works best when the agents are different from each other. One drafts, one verifies, one owns the release
        date. Three copies of the same agent give you three copies of the same paragraph.
      </p>
      <ArticleImage
        src="/media/guides/atlasbot-101/a-channel.webp"
        alt="A channel called Launch room. Chief assigns the release note to Launch, Research reports which performance claims it could verify, and Launch posts the finished draft as a linked file."
        width={2400}
        height={1090}
        mountOn="AtlasBot 101"
        caption="One room, one task owner. The handover is a message, so you can read who took the work and why."
      />

      <h2>Routines: the work that repeats</h2>
      <p>
        A routine is one instruction plus the times to run it. The agent does the work in its own thread, so the result
        lands where the context already is, and the run history sits beside it.
      </p>
      <p>
        Size the instruction so that &ldquo;nothing to report&rdquo; is a normal answer. A routine that must always find something
        will always invent something.
      </p>
      <ArticleImage
        src="/media/guides/atlasbot-101/a-routine.webp"
        alt="A routine in a thread. Two invoked routine markers sit above their instructions, and a side panel shows the schedule, on weekdays at 9:00 AM, with a successful run yesterday."
        width={1696}
        height={664}
        mountOn="AtlasBot 101"
        caption="The thread marks which turns a routine started, so a scheduled answer never reads as one you asked for."
      />

      <h2>Your team, on your own computer</h2>
      <p>
        You can invite people to your AtlasBot instead of copying it. Publishing never starts a second instance. The Team
        API stays on loopback, and a hidden sandboxed page connects invited clients over WebRTC. Signal only carries the
        connection setup.
      </p>
      <p>
        Cloudflare holds accounts, avatars, host configuration, memberships, invitations and logical session records. It
        does not carry chats, files or commands. An account is optional. AtlasBot works without one.
      </p>

      <h2>What is next</h2>
      <p>
        <Link href="/news">The news section</Link> is where I write about the decisions behind these parts.{" "}
        <Link href="/guides">The guides section</Link> is where the how-to pages collect. The{" "}
        <a href={ATLASBOT_LINKS.repository} target="_blank" rel={EXTERNAL_LINK_REL}>
          repository
        </a>{" "}
        holds the code, and{" "}
        <a href={ATLASBOT_LINKS.releases} target="_blank" rel={EXTERNAL_LINK_REL}>
          the releases page
        </a>{" "}
        holds every build.
      </p>
      <p>
        If something here is wrong, or a step does not match what you see, tell me. A preview is easier to correct than
        a release.
      </p>
    </>
  );
}

function WriteAGuideForAtlasBot() {
  const REGISTRY_ENTRY = `{
  slug: "write-a-guide-for-atlasbot",
  title: "Write a guide for AtlasBot",
  description: "…110 to 160 characters, and the only summary the site has…",
  publishedAt: "2026-09-11",
  author: NEWS_AUTHOR,
}`;

  return (
    <>
      <p>
        This page is two things at once. It is the instructions for adding a guide to this site, and it is the worked
        example: every element a guide body can use appears below, in the place where the text needs it. Copy from here
        rather than reading the components.
      </p>

      <h2>Add a guide in three steps</h2>
      <ol>
        <li>
          Write the body as a TSX component in <code>apps/auth-api/src/content/guides/</code>, named after its slug.
        </li>
        <li>
          Add one entry to <code>GUIDES_COLLECTION.articles</code> in <code>src/lib/guides.ts</code>, and one line to{" "}
          <code>GUIDE_BODIES</code> in <code>src/content/guides/index.ts</code>.
        </li>
        <li>
          Run <code>bun run api:images</code> and commit what it writes into <code>apps/auth-api/content-art</code>.
        </li>
      </ol>
      <p>The registry entry is the only description of the article the rest of the site reads:</p>
      <pre>
        <code>{REGISTRY_ENTRY}</code>
      </pre>
      <p>
        The artwork is generated, not drawn: four images per guide, from the title. The build fails when the committed
        folder and the registry disagree, so the last step is not optional. Nothing else needs changing — the index
        page, the article page, the sitemap and the feed all read the registry.
      </p>

      <h3>House rules</h3>
      <ul>
        <li>
          Write in ASD-STE100 Simplified Technical English: short sentences, one idea each, no words the reader has to
          decode.
        </li>
        <li>
          Keep <code>description</code> between 110 and 160 characters. It is the search result and the social card.
        </li>
        <li>
          Say what a picture shows in its <code>alt</code>, not that it is a picture. A caption adds what the prose did
          not.
        </li>
        <li>Check every claim against the code. A guide that is confidently wrong costs more than no guide.</li>
      </ul>
      <blockquote>
        Write for somebody who has the application open and is stuck. That reader does not want the history of the
        feature. They want the next thing to press.
      </blockquote>

      <hr />

      <h2>The elements you can use</h2>
      <p>
        A body is plain TSX, so any markup renders — but only the elements below are styled, and anything else will look
        like it escaped. Headings give the page its shape: <code>h2</code> for a section, <code>h3</code> for a step
        inside one. Use <strong>strong</strong> for the sentence a skimming reader must not miss, and no more than one
        per section.
      </p>
      <p>
        Use <code>ul</code> for things of equal weight and <code>ol</code> when the order is the point. Use inline{" "}
        <code>code</code> for a path, a flag or a setting, and a <code>pre</code> block for anything the reader will
        copy. Name a key with <kbd>⌘</kbd>
        <kbd>K</kbd> rather than describing it, and use a table when the reader is choosing between options.
      </p>

      <h3>Linking out and linking on</h3>
      <p>
        An external link takes its address from <code>ATLASBOT_LINKS</code> and carries <code>target=&quot;_blank&quot;</code> with{" "}
        <code>rel=&#123;EXTERNAL_LINK_REL&#125;</code>, like this link to{" "}
        <a href={ATLASBOT_LINKS.repository} target="_blank" rel={EXTERNAL_LINK_REL}>
          the repository
        </a>
        . Never paste a bare URL: one constant keeps every page pointing at the same place.
      </p>
      <p>
        A link inside the site is a router <code>Link</code>, so it navigates without reloading the page — for example
        to{" "}
        <Link href="/news/one-agent-many-providers">One agent, many providers</Link>, or back to{" "}
        <Link href="/guides">all guides</Link>.
      </p>

      <hr />

      <h2>Pictures, animations and video</h2>
      <p>
        Import the file rather than writing its path, and keep it in <code>src/content/guides/media/&lt;slug&gt;/</code>
        . The build then fingerprints it and fails on a file that is not there, so a renamed picture cannot ship broken.
        Every one of these components needs the real width and height, which is what holds the page still while the file
        loads.
      </p>
      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Use it for</th>
            <th>It needs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>ArticleImage</code>
            </td>
            <td>A screenshot or a diagram.</td>
            <td>
              <code>alt</code>. Optional <code>mountOn</code> (the article title) puts it on the card gradient; leave it
              out for a bare picture. <code>mountPad</code> is <code>&quot;tight&quot;</code> or <code>&quot;roomy&quot;</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>ArticleGif</code>
            </td>
            <td>A few frames that repeat, where each frame matters.</td>
            <td>
              <code>alt</code> and a <code>still</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>ArticleClip</code>
            </td>
            <td>A silent loop of movement, at a fraction of a GIF&apos;s size.</td>
            <td>
              <code>label</code> and a <code>poster</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>ArticleVideo</code>
            </td>
            <td>Something with sound, or longer than a loop.</td>
            <td>
              <code>label</code>, a <code>poster</code> and <code>captions</code>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        A <code>caption</code> on any of them draws the line underneath. Leave it out and the picture stands on its own,
        which is right when the picture only repeats the sentence above it.
      </p>

      <h3>A still picture</h3>
      <p>Reach for this first. It is the cheapest thing to load and the easiest thing to read.</p>
      <p>
        Leave <code>mountOn</code> out and the picture is the whole of the figure, which is right when it is already
        dark to its edges. Give it <code>mountOn</code> with this article&apos;s title to sit it on the card gradient.{" "}
        <code>mountPad=&quot;tight&quot;</code> is a thin mat, <code>mountPad=&quot;roomy&quot;</code> is a field. Leave{" "}
        <code>mountPad</code> out and a wide picture is tight, a tall one is roomy.
      </p>
      <ArticleImage
        src="/media/guides/write-a-guide-for-atlasbot/a-clear-task.webp"
        alt="An agent thread where the reader asks Research which claim is still open and what would close it."
        width={1696}
        height={612}
        caption="No mount. The picture stops where the column stops."
      />
      <ArticleImage
        src="/media/guides/write-a-guide-for-atlasbot/a-clear-task.webp"
        alt="An agent thread where the reader asks Research which claim is still open and what would close it."
        width={1696}
        height={612}
        mountOn="Write a guide for AtlasBot"
        caption="The same file on the card gradient. Rest a pointer on it and the artwork starts from the frame already on screen."
      />

      <h3>An animation</h3>
      <p>
        Use a GIF for a handful of states the reader compares against each other. It carries its own Pause control, and
        a reader who asked their system for less motion is given the still until they ask for the motion.
      </p>
      <ArticleGif
        src="/media/guides/write-a-guide-for-atlasbot/switch-provider.gif"
        still="/media/guides/write-a-guide-for-atlasbot/switch-provider-still.webp"
        alt="The provider tabs in the model picker, changing between Claude, ChatGPT, Grok and OpenCode, each with its command-line tool version."
        width={1440}
        height={912}
        mountOn="Write a guide for AtlasBot"
        caption="Four providers behind one agent. The version under each name is the command-line tool AtlasBot will start."
      />

      <h3>A silent loop</h3>
      <p>
        A clip is a GIF that compresses. It has no sound, it loops, it downloads nothing until it is on screen, and it
        stops when the reader stops it.
      </p>
      <ArticleClip
        src="/media/guides/write-a-guide-for-atlasbot/read-a-thread.mp4"
        poster="/media/guides/write-a-guide-for-atlasbot/read-a-thread-poster.webp"
        label="A thread scrolling through an agent's answer, from the opening summary down to the table of workstreams and the shell command under it."
        width={1696}
        height={940}
        mountOn="Write a guide for AtlasBot"
        caption="Movement is worth the bytes when the point is the movement — here, how much of a turn sits below the answer."
      />

      <h3>A video with captions</h3>
      <p>
        Use a video when a loop is too short for what you have to show. The reader starts it, and{" "}
        <strong>a WebVTT captions file is required</strong> — write it by hand next to the video. A video nobody can
        read is a video half the readers are shut out of.
      </p>
      <ArticleVideo
        src="/media/guides/write-a-guide-for-atlasbot/a-short-tour.mp4"
        poster="/media/guides/write-a-guide-for-atlasbot/a-short-tour-poster.webp"
        captions="/media/guides/write-a-guide-for-atlasbot/a-short-tour.vtt"
        label="A three-part tour of AtlasBot: an agent thread, a shared channel, and a routine with its schedule."
        width={2400}
        height={860}
        mountOn="Write a guide for AtlasBot"
        caption="Three scenes, three seconds each. Turn the captions on to see what a hand-written WebVTT file looks like in use."
      />

      <hr />

      <h2>Before you open the pull request</h2>
      <p>
        Read your own guide with the application open beside it and do what it says. Then check the article page, the
        index card, the feed and the social card, because one registry entry feeds all four. If a sentence only makes
        sense to somebody who already knows the answer, it is not finished.
      </p>
      <p>
        The{" "}
        <a href={ATLASBOT_LINKS.contributing} target="_blank" rel={EXTERNAL_LINK_REL}>
          contributing notes
        </a>{" "}
        cover the rest of the checks. Start from{" "}
        <Link href="/guides/atlasbot-101">AtlasBot 101</Link> if you need the vocabulary this site uses.
      </p>
    </>
  );
}

function WtfIsAtlasBot() {
  return (
    <>
      <p>
        At first glance, AtlasBot might look like another app for chatting with AI. But it is not a model or a chatbot on
        its own. It is a workspace that brings the models and agents you already use into one place, together with their
        files, conversations, and context.
      </p>
      <p>To understand how it works, it helps to separate those pieces first.</p>

      <h2>AtlasBot Is Not a Model</h2>
      <p>
        AtlasBot does not create its own AI model. It also does not replace tools like Codex, Claude Code, Grok CLI,
        OpenCode, or models that you host yourself.
      </p>
      <p>
        The model is the part that generates the response. Its output depends on its training, the instructions it
        receives, the context around the task, and the tools or files it can access.
      </p>
      <p>
        Codex, Claude Code, Grok CLI, OpenCode, and similar tools act as provider integrations or runtimes. They connect
        AtlasBot to a model and handle the communication, authentication, and provider-specific parts of the process.
      </p>
      <p>
        AtlasBot is the workspace around that process. It gives agents a role, a workspace, a conversation, a queue, and
        a way to keep context, exchange files, and work with other agents.
      </p>

      <h2>Model, Provider, Agent: What&rsquo;s the Difference?</h2>
      <p>A model generates the response.</p>
      <p>
        A provider integration or runtime connects that model to AtlasBot. It can be Codex, Claude Code, Grok CLI,
        OpenCode, or another configured runtime.
      </p>
      <p>
        An agent is the persistent setup built around that connection. It has its own role, instructions, workspace,
        conversation, queue, and context.
      </p>
      <p>
        This means the model and the agent do not have to be the same thing. You can move an agent from one provider
        integration to another while keeping the work around it in place.
      </p>
      <p>
        For example, a research agent might use Claude for one task and Codex for another. The model may change, but the
        agent&apos;s role, files, and conversation can remain the same.
      </p>
      <p>
        That is what makes an agent different from a saved prompt. It carries the work around the task, not just the
        instructions for answering it.
      </p>

      <h2>What an Agent Actually Owns</h2>
      <p>
        An agent in AtlasBot is more than a name attached to a model. It is a persistent setup for a particular kind of
        work.
      </p>
      <p>
        It has its own identity, instructions, workspace, conversation, queue, and provider session. The workspace is
        where it works with files, while the conversation keeps a record of what has already happened.
      </p>
      <p>
        Even when you change the provider, the agent can keep working with the same files, conversation, and context.
      </p>
      <p>This setup becomes more useful when the work continues over time or has to go through several stages.</p>

      <h2>Where the Work Happens</h2>
      <p>
        AtlasBot runs on your computer, so an agent&apos;s workspace is a local folder rather than a chat that disappears when
        you close a browser tab. Its conversations, queues, attachments, and other app data stay with the desktop app
        and the machine that hosts it.
      </p>
      <p>
        That does not mean every part of the process stays local. When an agent uses Codex, Claude, Grok, or another
        provider, prompts, files, and tool results may be sent to that provider. The embedded browser also uses the
        network.
      </p>
      <p>
        Local-first describes where AtlasBot keeps your project and agent state. It does not mean that the entire setup
        has to work offline.
      </p>
      <p>
        You can also keep AtlasBot running on one computer, such as a Mac mini, and connect to it from other devices. The
        host remains the place where the agents and their workspaces live, while the other devices give you a way to
        follow the work.
      </p>

      <h2>A Task From Start to Finish</h2>
      <p>Imagine asking a research agent to prepare a short report.</p>
      <p>
        You give it the task in its conversation, and AtlasBot runs it with the agent&apos;s instructions, workspace, context,
        and selected provider. The agent can inspect local files, use the embedded browser, save notes, and return the
        result in the same thread.
      </p>
      <p>
        When the first part is done, you can pass the work to another agent. A writing agent can use the research files,
        while a review agent checks the result and points out what needs to change.
      </p>
      <p>
        Each agent can keep its own role and conversation, while the project stays in one place. You can follow the work
        as it happens, send another instruction, pause a task, or redirect it when the plan changes.
      </p>
      <p>The models still do the actual work. AtlasBot keeps the tasks, files, conversations, and handoffs connected.</p>

      <h2>Why Use More Than One Agent?</h2>
      <p>
        One agent can handle a lot of work, but one setup is not always the best fit for every task. Research, coding,
        writing, and review often need different instructions, tools, and ways of working.
      </p>
      <p>Instead of asking one assistant to change roles constantly, you can give each agent a more focused job.</p>
      <p>
        AtlasBot lets agents exchange messages and files, pass work between their conversations, and work together in
        shared channels. A research agent can gather information, a writing agent can turn it into a draft, and a review
        agent can check the result.
      </p>
      <p>
        More agents do not automatically make a task better. For a quick question, one agent may be enough. A larger
        setup becomes useful when the work has clear stages, needs different perspectives, or has to continue over time.
      </p>

      <h2>Who Is AtlasBot Actually Built For?</h2>
      <p>
        AtlasBot is for people who want AI work to continue beyond a single answer. It makes the most sense when a task
        involves files, ongoing context, repeated steps, or more than one role.
      </p>
      <p>
        A developer might keep a coding agent next to a research or review agent. A content team might use one agent for
        research, another for drafts, and another for feedback.
      </p>
      <p>An individual might keep an agent running recurring tasks instead of rebuilding the same setup every time.</p>
      <p>
        If you only need a quick answer, a regular chatbot may be faster. AtlasBot becomes useful when the work starts to
        look more like a project than a conversation.
      </p>
      <p>
        It is also worth remembering that AtlasBot is still a development preview. Agents can access files, run commands,
        use the network, and control the browser, so you should only give them tasks you trust and keep backups of
        important work.
      </p>

      <h2>More Than a Chat Window</h2>
      <p>
        AtlasBot is not a model and not just another chat app. It is a local-first workspace that keeps agents, models,
        files, conversations, and tasks connected.
      </p>
      <p>
        The model provides the responses. The provider integration connects it to AtlasBot. The agent keeps the work
        around the task. AtlasBot brings these pieces together so you can keep working instead of starting from a blank
        chat each time.
      </p>
      <p>That is the idea behind AtlasBot: turning separate AI tools into persistent teammates for real work.</p>
      <p>If you want to see how it works in practice, start with AtlasBot 101.</p>
    </>
  );
}

export const GUIDES_ARTICLES: readonly ArticleEntry[] = sorted([
  {
    slug: "atlasbot-101",
    title: "AtlasBot 101",
    description:
      "What AtlasBot is, what an agent keeps between runs, and how to get one doing real work on your computer. Start here if you have not opened the app yet.",
    publishedAt: "2026-09-12",
    author: "Norbert Bodziony",
    body: AtlasBot101,
  },
  {
    slug: "write-a-guide-for-atlasbot",
    title: "Write a guide for AtlasBot",
    description:
      "How to write a guide for AtlasBot, with a worked example of every element one can use: prose, links, tables, images, animations, clips and captioned video.",
    publishedAt: "2026-09-11",
    author: "Norbert Bodziony",
    body: WriteAGuideForAtlasBot,
  },
  {
    slug: "wtf-is-atlasbot",
    title: "WTF Is AtlasBot?",
    description:
      "A practical explanation of models, providers, agents, and the local-first workspace that brings them together.",
    publishedAt: "2026-09-15",
    author: "Norbert Bodziony",
    body: WtfIsAtlasBot,
  },
]);

export const GUIDES_COLLECTION = {
  id: "guides",
  indexRoute: "/guides",
  articleRoute: "/guides",
  name: "Guides",
  indexTitle: "Guides — AtlasBot",
  indexDescription:
    "How AtlasBot works and how to write about it. Start with AtlasBot 101, then use the template guide as the worked example for the next one.",
  imageEyebrow: "ATLASBOT · GUIDES",
  backLabel: "All guides",
  moreTitle: "More guides",
  articles: GUIDES_ARTICLES,
} as const;
