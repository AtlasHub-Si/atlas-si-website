"use client";

/*
 * The hero download split-button, ported from HeroDownloadSelector.tsx:
 * platform detection, dropdown menu, full keyboard navigation.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { PlatformLogo } from "@/components/brand";
import { LandingIcon } from "@/components/icons";
import {
  DOWNLOAD_PLATFORMS,
  DOWNLOAD_PLATFORM_ORDER,
  detectDownloadPlatform,
  type PlatformLogoVariant,
} from "@/lib/site";

export function HeroDownloadSelector() {
  const [platform, setPlatform] = useState<PlatformLogoVariant>("macos");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const current = DOWNLOAD_PLATFORMS[platform];

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }, []);

  const openMenu = useCallback((focus: "first" | "last" | false = false) => {
    setOpen(true);
    if (!focus) return;
    queueMicrotask(() => {
      const items = Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [],
      );
      (focus === "first" ? items[0] : items.at(-1))?.focus();
    });
  }, []);

  const selectPlatform = useCallback(
    (next: PlatformLogoVariant) => {
      setPlatform(next);
      closeMenu(true);
    },
    [closeMenu],
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.target === triggerRef.current && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
        event.preventDefault();
        openMenu(event.key === "ArrowDown" ? "first" : "last");
        return;
      }

      if (!open || !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      const items = Array.from(rootRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
      const activeElement = document.activeElement;
      const activeIndex = activeElement instanceof HTMLElement ? items.indexOf(activeElement) : -1;
      const nextIndex =
        event.key === "Home"
          ? 0
          : event.key === "End"
            ? items.length - 1
            : (activeIndex + (event.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      event.preventDefault();
      items[nextIndex]?.focus();
    },
    [open, closeMenu, openMenu],
  );

  useEffect(() => {
    const detected = detectDownloadPlatform(window.navigator);
    if (detected) setPlatform(detected);

    const handleOutsidePointer = (event: PointerEvent) => {
      if (open && event.target instanceof Node && !rootRef.current?.contains(event.target)) closeMenu();
    };
    document.addEventListener("pointerdown", handleOutsidePointer);
    return () => document.removeEventListener("pointerdown", handleOutsidePointer);
  }, [open, closeMenu]);

  return (
    <div
      ref={rootRef}
      className="landing-download-selector"
      data-detected-platform={platform}
      data-open={open ? "true" : "false"}
      onKeyDown={handleKeyDown}
    >
      <div className="landing-download-split">
        {current.available && current.href ? (
          <a className="landing-download-primary" href={current.href} data-state="available">
            <PlatformLogo platform={platform} />
            {current.action}
          </a>
        ) : (
          <span className="landing-download-primary" data-state="coming-soon" aria-disabled="true">
            <PlatformLogo platform={platform} />
            {current.action}
          </span>
        )}
        <button
          ref={triggerRef}
          className="landing-download-trigger"
          type="button"
          aria-label="Choose download platform"
          aria-haspopup="menu"
          aria-expanded={open ? "true" : "false"}
          onClick={() => (open ? closeMenu() : openMenu())}
        >
          <LandingIcon name="chevron-down" />
        </button>
      </div>

      {open && (
        <div className="landing-download-menu" role="menu" aria-label="Download platforms">
          {DOWNLOAD_PLATFORM_ORDER.map((menuPlatform) => {
            const details = DOWNLOAD_PLATFORMS[menuPlatform];
            return (
              <a
                key={menuPlatform}
                className="landing-download-menu-item"
                href={details.href}
                role="menuitem"
                data-state="available"
                data-selected={platform === menuPlatform ? "true" : undefined}
                onClick={() => selectPlatform(menuPlatform)}
              >
                <PlatformLogo platform={menuPlatform} />
                <span>{details.label}</span>
                <small>{details.status}</small>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
