"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { GalleryMedia } from "./Data";

type GalleryMasonryProps = {
  media: GalleryMedia[];
};

export default function GalleryMasonry({ media }: GalleryMasonryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const masonryRef = useRef<{ destroy: () => void; layout: () => void } | null>(
    null
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const videos = Array.from(container.querySelectorAll("video"));
    let isCancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const [{ default: Masonry }, { default: imagesLoaded }] = await Promise.all(
        [import("masonry-layout"), import("imagesloaded")]
      );

      if (isCancelled) {
        return;
      }

      const masonry = new Masonry(container, {
        itemSelector: ".gallery-masonry-item",
        columnWidth: ".gallery-masonry-sizer",
        gutter: ".gallery-masonry-gutter",
        percentPosition: true,
        horizontalOrder: false,
        transitionDuration: "0.25s",
      });

      masonryRef.current = masonry;

      const imgLoad = imagesLoaded(container);
      const relayout = () => masonry.layout();

      imgLoad.on("progress", relayout);
      imgLoad.on("always", relayout);

      for (const video of videos) {
        video.addEventListener("loadedmetadata", relayout);
        video.addEventListener("loadeddata", relayout);
        video.addEventListener("canplay", relayout);
      }

      const resizeObserver = new ResizeObserver(() => {
        masonry.layout();
      });
      resizeObserver.observe(container);

      cleanup = () => {
        imgLoad.off("progress", relayout);
        imgLoad.off("always", relayout);

        for (const video of videos) {
          video.removeEventListener("loadedmetadata", relayout);
          video.removeEventListener("loadeddata", relayout);
          video.removeEventListener("canplay", relayout);
        }

        resizeObserver.disconnect();
        masonry.destroy();
        masonryRef.current = null;
      };
    })();

    return () => {
      isCancelled = true;
      cleanup?.();
    };
  }, [media]);

  return (
    <div ref={containerRef} className="gallery-masonry mt-6">
      <div className="gallery-masonry-sizer" />
      <div className="gallery-masonry-gutter" />

      {media.map((item) => (
        <figure
          key={item.src}
          className={`gallery-masonry-item gallery-masonry-item-${item.aspect} group relative isolate overflow-hidden rounded-3xl border border-white/12 bg-white/6 shadow-[0_16px_40px_rgba(8,16,46,0.24)]`}
        >
          <div
            className={`relative w-full ${
              item.aspect === "portrait"
                ? "aspect-[4/5.4]"
                : item.aspect === "square"
                ? "aspect-square"
                : "aspect-[4/3]"
            }`}
          >
            {item.kind === "image" ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 767px) 50vw, (max-width: 1279px) 32vw, 28vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <video
                className="h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={item.poster}
                aria-label={item.alt}
              >
                <source src={item.src} type="video/mp4" />
              </video>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(7,12,28,0.18)] via-transparent to-[rgba(255,255,255,0.04)] opacity-80" />
          </div>
        </figure>
      ))}
    </div>
  );
}
