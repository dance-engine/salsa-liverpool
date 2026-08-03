import Image from "next/image";
import type { GalleryMedia } from "./Data";

type GalleryMasonryProps = {
  media: GalleryMedia[];
};

function getFrameClassName(item: GalleryMedia, index: number) {
  if (index === 0) {
    return "md:col-span-2";
  }

  if (item.aspect === "portrait") {
    return "mx-auto max-w-[26rem]";
  }

  return "";
}

function getAspectClassName(item: GalleryMedia, index: number) {
  if (index === 0) {
    return "aspect-[16/10] sm:aspect-[16/9]";
  }

  if (item.aspect === "portrait") {
    return "aspect-[4/5]";
  }

  if (item.aspect === "square") {
    return "aspect-square";
  }

  return "aspect-[4/3]";
}

export default function GalleryMasonry({ media }: GalleryMasonryProps) {
  return (
    <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
      {media.map((item, index) => (
        <figure
          key={item.src}
          className={`overflow-hidden rounded-[1.75rem] border border-white/12 bg-white/6 shadow-[0_16px_40px_rgba(8,16,46,0.24)] ${getFrameClassName(
            item,
            index
          )}`}
        >
          <div className={`relative w-full bg-white/5 ${getAspectClassName(item, index)}`}>
            {item.kind === "image" ? (
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 767px) 100vw, (max-width: 1023px) 100vw, 66vw"
                    : item.aspect === "portrait"
                    ? "(max-width: 767px) 100vw, 33vw"
                    : "(max-width: 767px) 100vw, 50vw"
                }
                className="object-cover"
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
