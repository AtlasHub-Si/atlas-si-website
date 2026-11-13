"use client";

/*
 * The interactive app preview that loads inside the landing's iframe, rebuilt
 * from the real /app-preview page of openbot.run: a small OpenBot team
 * workspace scene with the same handshake — it announces
 * `openbot:landing-preview-ready` when mounted and waits for
 * `openbot:landing-preview-start` before it begins to animate.
 */

import { useEffect, useState } from "react";

const READY_MESSAGE = "openbot:landing-preview-ready";
const START_MESSAGE = "openbot:landing-preview-start";

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
  { name: "Release", owner: "Launch", ownerColor: "#d6adf2", status: "Ready after final claim" },
] as const;

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
              <rect width="240" height="240" rx="50" fill="#d6adf2" />
              <g fill="none" stroke="#040007" strokeWidth="14" strokeLinecap="round">
                <polyline points="43.55 93.61 64.69 81.41 36.48 108.04 79.67 83.11 35.93 122.88 91.58 90.74 38.9 132.69 97.66 98.76 42.44 138.88 100.43 105.4 46.9 143.83 101.97 112.04 55.08 149.51 101.83 122.52 73.01 152.43 94.14 140.23" />
                <polyline points="145.65 93.61 166.79 81.41 140.83 101.52 175.58 81.46 138.3 109.53 183.18 83.63 137.55 117.43 189.67 87.33 139.67 129.39 197.88 95.78 142.92 136.32 201.52 102.48 149.03 143.86 204.07 112.08 159.14 150.37 203.51 124.75 169.28 152.61 199.82 134.98" />
              </g>
            </svg>
          </span>
          <strong>OpenBot.team</strong>
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
            <p className="preview-files">
              Source files: <span className="preview-file">launch-brief.md</span> and{" "}
              <span className="preview-file">launch-metrics.csv</span> ·{" "}
              <span style={{ color: "#d6adf2" }}>Launch</span> can publish when the final claim is confirmed.
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
