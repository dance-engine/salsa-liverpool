"use client";

import Link from "next/link";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import { FilledButtonLink, OutlinedButtonLink } from "./ButtonLink";

type NavLink = {
  href: string;
  label: string;
};

type MobileNavProps = {
  links: NavLink[];
  instagramHref: string;
  primaryHref: string;
  primaryLabel: string;
};

export default function MobileNav({
  links,
  instagramHref,
  primaryHref,
  primaryLabel,
}: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wasOpenRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const panelId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      firstLinkRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }

      setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      buttonRef.current?.focus();
    }

    wasOpenRef.current = isOpen;
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const handlePanelKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panelRef.current) {
      return;
    }

    const focusableElements = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        onClick={() => setIsOpen((current) => !current)}
        className="skeuo-chip inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/15"
      >
        {isOpen ? <MdClose className="h-5 w-5" /> : <MdMenu className="h-5 w-5" />}
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-full z-30 mt-3 w-[min(20rem,calc(100vw-2rem))]">
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-label="Mobile navigation"
            onKeyDown={handlePanelKeyDown}
            className="skeuo-card rounded-3xl p-4"
            style={{backgroundColor: "oklch(15% 0.05 255 / 0.98)"}}
          >
            <div className="flex flex-col gap-3">
              <FilledButtonLink
                ref={firstLinkRef}
                href={primaryHref}
                onClick={closeMenu}
                className="px-4 py-3 text-center text-sm"
              >
                {primaryLabel}
              </FilledButtonLink>

              <OutlinedButtonLink
                href={instagramHref}
                target="_blank"
                rel="noreferrer"
                onClick={closeMenu}
                className="px-4 py-3 text-center text-sm"
              >
                Instagram
              </OutlinedButtonLink>

              <div className="h-px bg-white/10" />

              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-2xl px-2 py-2 text-sm text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
