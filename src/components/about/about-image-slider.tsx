"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type AboutImageSliderProps = {
  images: string[];
};

export function AboutImageSlider({ images }: AboutImageSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="flex h-full min-h-[22rem] items-center justify-center rounded-[26px] bg-[var(--color-surface-muted)] text-center text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
        About gallery
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-[var(--color-surface-muted)]">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={image}
            alt={`About TreTrip ${index + 1}`}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
            priority={index === 0}
          />
        </div>
      ))}

      {images.length > 1 ? (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/25 px-3 py-2 backdrop-blur-sm">
          {images.map((image, index) => (
            <button
              key={`${image}-dot`}
              type="button"
              aria-label={`Show slide ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition ${index === activeIndex ? "bg-white" : "bg-white/45"}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
