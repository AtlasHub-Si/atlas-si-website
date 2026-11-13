"use client";

/*
 * Article media components, ported from components/content/ArticleMedia.tsx.
 * The WebGL card gradient of the original is replaced by a CSS aurora drawn
 * from the article title, but the API (alt, width/height, mountOn, mountPad,
 * caption, still/poster/captions, pause control, reduced-motion) is kept.
 */

import { useEffect, useRef, useState } from "react";

export type ArticleMountPad = "tight" | "roomy";

interface ArticleMediaBase {
  width: number;
  height: number;
  caption?: React.ReactNode;
  mountOn?: string;
  mountPad?: ArticleMountPad;
}

/* Deterministic hues from the title string, like the original generator. */
function titleHues(title: string): [number, number, number] {
  let hash = 0;
  for (let index = 0; index < title.length; index += 1) {
    hash = (hash * 31 + title.charCodeAt(index)) % 360;
  }
  return [hash, (hash + 42) % 360, (hash + 205) % 360];
}

const PALETTE_SATURATIONS: [string, string, string] = [
  "hsl(H 42% 58%)",
  "hsl(H 55% 62%)",
  "hsl(H 45% 55%)",
];

function gradientStyle(title: string): React.CSSProperties {
  const [h1, h2, h3] = titleHues(title);
  const fill = (template: string, hue: number) => template.replace("H", String(hue));
  return {
    "--gradient-a": fill(PALETTE_SATURATIONS[0], h1),
    "--gradient-b": fill(PALETTE_SATURATIONS[1], h2),
    "--gradient-c": fill(PALETTE_SATURATIONS[2], h3),
  } as React.CSSProperties;
}

export function PostGradient({ title, className }: { title: string; className?: string }) {
  return <div className={["post-gradient", className].filter(Boolean).join(" ")} style={gradientStyle(title)} />;
}

function Mount({
  title,
  pad,
  children,
}: {
  title: string | undefined;
  pad: ArticleMountPad | undefined;
  children: React.ReactNode;
}) {
  if (!title) return children;
  return (
    <div className="post-mount" data-pad={pad}>
      <PostGradient title={title} />
      {children}
    </div>
  );
}

function Caption({ caption }: { caption?: React.ReactNode }) {
  if (!caption) return null;
  return <figcaption className="post-figure-caption">{caption}</figcaption>;
}

export function ArticleImage({
  src,
  alt,
  width,
  height,
  caption,
  mountOn,
  mountPad,
}: ArticleMediaBase & { src: string; alt: string }) {
  return (
    <figure className="post-figure">
      <Mount title={mountOn} pad={mountPad}>
        <img className="post-media" src={src} alt={alt} width={width} height={height} loading="lazy" />
      </Mount>
      <Caption caption={caption} />
    </figure>
  );
}

export function ArticleGif({
  src,
  still,
  alt,
  width,
  height,
  caption,
  mountOn,
  mountPad,
}: ArticleMediaBase & { src: string; still: string; alt: string }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Hold the still until the picture is on screen, and hand reduced-motion
  // readers the still until they ask for the motion.
  useEffect(() => {
    const image = ref.current;
    if (!image || playing) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        if (!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) setPlaying(true);
        observer.disconnect();
      }
    });
    observer.observe(image);
    return () => observer.disconnect();
  }, [playing]);

  return (
    <figure className="post-figure">
      <Mount title={mountOn} pad={mountPad}>
        <div className="post-media-frame">
          <img
            ref={ref}
            className="post-media"
            src={playing ? src : still}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
          />
          <button
            type="button"
            className="post-media-toggle"
            data-state={playing ? "playing" : "paused"}
            onClick={() => setPlaying((value) => !value)}
          >
            <span className="post-media-toggle-icon" aria-hidden="true" />
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </Mount>
      <Caption caption={caption} />
    </figure>
  );
}

export function ArticleClip({
  src,
  poster,
  label,
  width,
  height,
  caption,
  mountOn,
  mountPad,
}: ArticleMediaBase & { src: string; poster: string; label: string }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
          video.play().catch(() => undefined);
          setPlaying(true);
        } else {
          video.pause();
          setPlaying(false);
        }
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className="post-figure">
      <Mount title={mountOn} pad={mountPad}>
        <div className="post-media-frame">
          <video
            ref={videoRef}
            className="post-media"
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            width={width}
            height={height}
            aria-label={label}
          >
            <source src={src} type="video/mp4" />
          </video>
          <button
            type="button"
            className="post-media-toggle"
            data-state={playing ? "playing" : "paused"}
            onClick={toggle}
          >
            <span className="post-media-toggle-icon" aria-hidden="true" />
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </Mount>
      <Caption caption={caption} />
    </figure>
  );
}

export function ArticleVideo({
  src,
  poster,
  captions,
  label,
  width,
  height,
  caption,
  mountOn,
  mountPad,
}: ArticleMediaBase & { src: string; poster: string; captions: string; label: string }) {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className="post-figure">
      <Mount title={mountOn} pad={mountPad}>
        <div className="post-media-frame">
          <video
            ref={videoRef}
            className="post-media"
            poster={poster}
            controls={undefined}
            preload="none"
            width={width}
            height={height}
            aria-label={label}
          >
            <source src={src} type="video/mp4" />
            <track kind="captions" src={captions} srcLang="en" label="English" default />
          </video>
          {!playing && (
            <button type="button" className="post-media-toggle" data-state="paused" onClick={toggle}>
              <span className="post-media-toggle-icon" aria-hidden="true" />
              Play
            </button>
          )}
        </div>
      </Mount>
      <Caption caption={caption} />
    </figure>
  );
}
