"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import type { TeamMember } from "./Data";

type TeamCarouselProps = {
  members: TeamMember[];
  intervalMs?: number;
};

export default function TeamCarousel({
  members,
  intervalMs = 15000,
}: TeamCarouselProps) {
  const length = members.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);
  const [autoScrollResetKey, setAutoScrollResetKey] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCount(3);
        return;
      }

      if (window.innerWidth >= 768) {
        setVisibleCount(2);
        return;
      }

      setVisibleCount(1);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(viewportRef.current?.clientWidth ?? 0);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => window.removeEventListener("resize", updateViewportWidth);
  }, []);

  useEffect(() => {
    if (length <= visibleCount) {
      return;
    }

    const timer = setInterval(() => {
      setIsTransitionEnabled(true);
      setActiveIndex((current) => current + 1);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [autoScrollResetKey, intervalMs, length, visibleCount]);

  const canRotate = length > visibleCount;
  const displayCount = Math.min(visibleCount, Math.max(length, 1));
  const bufferCount = Math.min(displayCount + 1, Math.max(length, 1));
  const gapPx = 20;
  const peekPx = canRotate ? 84 : 0;
  const cardWidth =
    viewportWidth > 0
      ? (viewportWidth - gapPx * (displayCount - 1) - peekPx) / displayCount
      : 0;
  const trackOffset = activeIndex * (cardWidth + gapPx);

  const renderedMembers = useMemo(() => {
    if (length === 0) {
      return [] as TeamMember[];
    }

    return [...members, ...members.slice(0, bufferCount)];
  }, [bufferCount, length, members]);

  const statusLabel = useMemo(() => {
    if (length === 0) {
      return "0 / 0";
    }

    return `${(activeIndex % length) + 1} / ${length}`;
  }, [activeIndex, length]);

  const showPrevious = () => {
    if (!canRotate) {
      return;
    }

    setAutoScrollResetKey((current) => current + 1);
    setActiveIndex((current) => {
      if (current === 0) {
        setIsTransitionEnabled(false);
        return length - 1;
      }

      setIsTransitionEnabled(true);
      return current - 1;
    });
  };

  const showNext = () => {
    if (!canRotate) {
      return;
    }

    setAutoScrollResetKey((current) => current + 1);
    setIsTransitionEnabled(true);
    setActiveIndex((current) => current + 1);
  };

  const handleTrackTransitionEnd = () => {
    if (length === 0 || !canRotate) {
      return;
    }

    if (activeIndex >= length) {
      setIsTransitionEnabled(false);
      setActiveIndex(0);
    }
  };

  useEffect(() => {
    if (isTransitionEnabled) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [isTransitionEnabled]);

  if (length === 0) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="relative">
        <div ref={viewportRef} className="overflow-hidden rounded-3xl">
          <div
            className={`flex gap-5 ${
              isTransitionEnabled
                ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                : "transition-none"
            }`}
            style={{ transform: `translateX(-${trackOffset}px)` }}
            onTransitionEnd={handleTrackTransitionEnd}
          >
            {renderedMembers.map((member, index) => (
              <div
                key={`${member.name}-${index}`}
                className="min-w-0 flex-shrink-0"
                style={{ width: cardWidth > 0 ? `${cardWidth}px` : undefined }}
              >
                <div className="skeuo-card rounded-3xl overflow-hidden h-full">
                  <div className="relative h-52 w-full bg-white/5 sm:h-60">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      loading="eager"
                    />
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="font-bold text-lg">{member.name}</div>
                    <div className="text-sm text-white/80">{member.role}</div>

                    {member.bio?.trim() ? (
                      <p className="mt-3 text-sm text-white/85 leading-relaxed">
                        {member.bio}
                      </p>
                    ) : (
                      <p className="mt-3 text-sm text-white/65 italic">
                        Bio coming soon.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-white/75"></div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={showPrevious}
              disabled={!canRotate}
              aria-label="Show previous team member"
              className="skeuo-chip inline-flex h-10 w-10 items-center justify-center rounded-full disabled:opacity-40"
            >
              <MdChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={showNext}
              disabled={!canRotate}
              aria-label="Show next team member"
              className="skeuo-chip inline-flex h-10 w-10 items-center justify-center rounded-full disabled:opacity-40"
            >
              <MdChevronRight className="h-5 w-5" />
            </button>
            <div className="skeuo-chip rounded-full px-3 py-2 text-xs text-white/80">
              {statusLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
