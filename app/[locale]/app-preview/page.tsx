"use client";

/*
 * The interactive app preview that loads inside the landing's iframe, rebuilt
 * from the real /app-preview page of openbot.run: a small AtlasBot team
 * workspace scene with the same handshake — it announces
 * `atlasbot:landing-preview-ready` when mounted and waits for
 * `atlasbot:landing-preview-start` before it begins to animate.
 */

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const READY_MESSAGE = "atlasbot:landing-preview-ready";
const START_MESSAGE = "atlasbot:landing-preview-start";

interface PreviewAgent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  active?: boolean;
}

const AGENTS: readonly PreviewAgent[] = [
  { id: "chief", name: "Chief", role: "coordinates the team", avatar: "\u{1F7EA}", active: true },
  { id: "research", name: "Research", role: "finds evidence and cites", avatar: "\u{1F7E2}" },
  { id: "builder", name: "Builder", role: "produces the artifact", avatar: "\u{1F7E9}" },
  { id: "launch", name: "Launch", role: "orchestrates the rollout", avatar: "\u{1F7E4}" },
] as const;

const WORKSTREAMS = [
  { name: "Evidence", owner: "Research", ownerColor: "#31cf76", status: "7 of 8 claims verified" },
  { name: "Rebuild", owner: "Builder", ownerColor: "#ff9412", status: "Ready after rollback" },
  { name: "Release", owner: "Launch", ownerColor: "#41c9ff", status: "Ready after final claim" },
] as const;

/* The moving workflow under the brief: the same handoff the table describes,
   playing as a loop once the scene starts. */
const WORKFLOW_STEPS = ["Evidence", "Review", "Release"] as const;

export default function AppPreviewPage() {
  const [started, setStarted] = useState(false);
  const [typed, setTyped] = useState("");
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    window.parent?.postMessage({ type: READY_MESSAGE }, window.location.origin);
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if ((event.data as { type?: string } | null)?.type === START_MESSAGE) setStarted(true);
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // The composer types the final instruction while the scene is on screen.
  const FULL_TEXT = "Ready to publish when the last claim is confirmed. @Launch, take it from here.";
  useEffect(() => {
    if (!started) return;
    setCursorVisible(true);
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setTyped(FULL_TEXT.slice(0, index));
      if (index >= FULL_TEXT.length) window.clearInterval(timer);
    }, 55);
    return () => window.clearInterval(timer);
  }, [started]);

  return (
    <div className="preview-root" data-started={started ? "true" : "false"}>
      <aside className="preview-sidebar">
        <div className="preview-sidebar-brand">
          <span className="preview-sidebar-logo" aria-hidden="true">
            <svg viewBox="0 0 240 240" width="20" height="20">
              <rect width="240" height="240" rx="50" fill="#0c1730" />
              <defs>
                <linearGradient id="preview-logo-glyph" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#4a9dff" />
                  <stop offset="0.55" stopColor="#2f7bff" />
                  <stop offset="1" stopColor="#41c9ff" />
                </linearGradient>
              </defs>
              <path
                fillRule="evenodd"
                fill="url(#preview-logo-glyph)"
                d="M113.8 47.8 A13 13 0 0 1 126.2 47.8 L195.4 183.2 A13 13 0 0 1 184.1 196 L55.9 196 A13 13 0 0 1 44.6 183.2 Z M120 114 L139.2 189.4 A6.5 6.5 0 0 1 132.9 196 L107.1 196 A6.5 6.5 0 0 1 100.8 189.4 Z"
              />
              <g fill="none" stroke="#ffffff" strokeWidth="18" strokeLinecap="round">
                <path d="M89 112 Q97 121 105 112" />
                <path d="M135 112 Q143 121 151 112" />
              </g>
            </svg>
          </span>
          <strong>AtlasBot.team</strong>
        </div>
        <div className="preview-search">Search</div>
        <nav className="preview-agents" aria-label="Agents">
          {AGENTS.map((agent) => (
            <div key={agent.id} className="preview-agent" data-active={agent.active ? "true" : undefined}>
              <span className="preview-agent-avatar" aria-hidden="true">
                {agent.avatar}
              </span>
              <span className="preview-agent-copy">
                <span className="preview-agent-name">{agent.name}</span>
                <span className="preview-agent-role">{agent.role}</span>
              </span>
            </div>
          ))}
        </nav>
        <div className="preview-sidebar-footer">
          <span className="preview-dot" aria-hidden="true" />
          Norbert
        </div>
      </aside>

      <main className="preview-chat">
        <header className="preview-chat-header">
          <span className="preview-agent-avatar" aria-hidden="true">
            {AGENTS[0].avatar}
          </span>
          <strong>{AGENTS[0].name}</strong>
          <span className="preview-chat-model">GPT-5.6 La…</span>
        </header>

        <div className="preview-thread">
          <div className="preview-bubble preview-bubble-in">
            Research verified seven of eight claims. Builder added the test and rollback steps. The final review is
            ready.
          </div>
          <div className="preview-bubble preview-bubble-out">
            Turn this into the final launch brief. Use @Research&apos;s evidence, @Builder&apos;s rollout notes, and
            attach the source files.
          </div>

          <div className="preview-bubble preview-bubble-in preview-bubble-brief">
            <strong>Final launch brief</strong>
            <p>I merged @Research&apos;s evidence with @Builder&apos;s rollout notes.</p>
            <table className="preview-table">
              <thead>
                <tr>
                  <th>Workstream</th>
                  <th>Owner</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {WORKSTREAMS.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>
                      <span className="preview-owner" style={{ color: row.ownerColor }}>
                        <span className="preview-owner-dot" style={{ background: row.ownerColor }} />
                        {row.owner}
                      </span>
                    </td>
                    <td>{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="preview-workflow" aria-hidden="true">
              {WORKFLOW_STEPS.map((step, index) => (
                <span className="preview-workflow-pair" key={step}>
                  {index > 0 && <span className="preview-workflow-link" style={{ "--wfi": index - 1 } as CSSProperties} />}
                  <span className="preview-workflow-step" style={{ "--wfi": index } as CSSProperties}>
                    {step}
                  </span>
                </span>
              ))}
            </div>
            <p className="preview-files">
              Source files: <span className="preview-file">launch-brief.md</span> and{" "}
              <span className="preview-file">launch-metrics.csv</span> ·{" "}
              <span style={{ color: "#41c9ff" }}>Launch</span> can publish when the final claim is confirmed.
            </p>
          </div>

          <div className="preview-typing" data-visible={cursorVisible ? "true" : undefined}>
            Checking owners with @Research and @Builder, then preparing the release handoff.
          </div>
        </div>

        <footer className="preview-composer">
          <span className="preview-composer-plus" aria-hidden="true">
            +
          </span>
          <span className="preview-composer-input">
            {typed}
            {cursorVisible && <span className="preview-caret" aria-hidden="true" />}
          </span>
          <span className="preview-composer-send" aria-hidden="true">
            ↑
          </span>
        </footer>
      </main>
    </div>
  );
}
