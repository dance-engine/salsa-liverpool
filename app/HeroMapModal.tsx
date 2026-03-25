"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useId, useRef, useState } from "react";
import { MdClose, MdLocationOn } from "react-icons/md";

const LazyMap = dynamic(() => import("./MapClient"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[300px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-white/75">
      Loading map...
    </div>
  ),
});

type HeroMapModalProps = {
  title: string;
  venue: string;
  address: string;
  directionsHref: string;
  lat: number;
  lng: number;
};

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class MapErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.children !== this.props.children && this.state.hasError) {
      this.setState({ hasError: false });
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default function HeroMapModal({
  title,
  venue,
  address,
  directionsHref,
  lat,
  lng,
}: HeroMapModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wasOpenRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (wasOpenRef.current && !isOpen) {
      triggerRef.current?.focus();
    }

    wasOpenRef.current = isOpen;
  }, [isOpen]);

  const handleModalKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !modalRef.current) {
      return;
    }

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
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

  const fallback = (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="font-semibold">Map unavailable right now</div>
      <p className="mt-2 text-sm text-white/80">
        You can still head straight to directions for {venue}.
      </p>
      <Link
        href={directionsHref}
        target="_blank"
        rel="noreferrer"
        className="salsa-button mt-4 inline-flex rounded-2xl px-4 py-2 text-sm font-semibold"
      >
        Get directions
      </Link>
    </div>
  );

  return (
    <>
      <div className="skeuo-chip-nested mt-5 rounded-3xl border border-white/10 bg-white/10 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="skeuo-chip mt-0.5 rounded-2xl p-2">
            <MdLocationOn className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="text-sm text-white/75">Location</div>
            <div className="mt-1 font-semibold">{venue}</div>
            <div className="mt-1 text-sm text-white/85">{address}</div>
            <div className="mt-2 text-sm text-white/75">
              Open directions in Google Maps.
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={directionsHref}
            target="_blank"
            rel="noreferrer"
            className="salsa-button rounded-2xl px-4 py-2 text-sm font-semibold"
          >
            Get directions
          </Link>
          {/* <button
            ref={triggerRef}
            type="button"
            onClick={() => setIsOpen(true)}
            className="skeuo-chip inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/15"
          >
            <MdMap className="h-4 w-4" />
            View map
          </button> */}
        </div>
      </div>

      {isOpen ? (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-[oklch(5%_0.020_255)]/80 p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
            onKeyDown={handleModalKeyDown}
            className="skeuo-card-strong relative max-h-[min(85vh,44rem)] w-full max-w-3xl overflow-hidden rounded-[2rem] p-4 sm:p-6"
          >
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close map"
              onClick={() => setIsOpen(false)}
              className="skeuo-chip absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/15"
            >
              <MdClose className="h-5 w-5" />
            </button>

            <div className="pr-12">
              <div id={titleId} className="text-2xl font-bold">
                {title}
              </div>
              <div className="mt-1 text-sm text-white/80">
                {venue} - {address}
              </div>
            </div>

            <div className="mt-5">
              <MapErrorBoundary fallback={fallback}>
                <LazyMap width={600} height={300} lat={lat} lng={lng} />
              </MapErrorBoundary>
              <div className="mt-3 text-sm text-white/80">
                Click the map marker to open directions in Google Maps.
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
