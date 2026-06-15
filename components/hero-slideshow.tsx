"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Full-bleed hero background that auto-crossfades through several images.
 * If a background video is supplied it takes precedence (the first image is kept
 * as a fallback that shows if the video fails to load). Renders clickable slide
 * indicators above the hero overlays.
 */
export function HeroSlideshow({
  images,
  videoSrc,
  videoType = "video/mp4",
  poster,
  interval = 5000,
}: {
  images: string[]
  videoSrc?: string
  videoType?: string
  poster?: string
  interval?: number
}) {
  const slides = images.map((s) => s?.trim()).filter(Boolean)
  const renderSlides = videoSrc ? slides.slice(0, 1) : slides
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (videoSrc || slides.length <= 1) return
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), interval)
    return () => clearInterval(id)
  }, [videoSrc, slides.length, interval])

  return (
    <>
      <div className="absolute inset-0 -z-30 overflow-hidden" aria-hidden>
        {renderSlides.map((src, i) => (
          <Image
            key={`${src}-${i}`}
            src={src}
            alt=""
            fill
            priority={i === 0}
            sizes="100vw"
            className={cn(
              "object-cover transition-opacity duration-1000 ease-in-out",
              videoSrc || i === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
        {videoSrc && (
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline poster={poster}>
            <source src={videoSrc} type={videoType} />
          </video>
        )}
      </div>

      {/* Slide indicators (hidden when a video plays or there's a single image) */}
      {!videoSrc && slides.length > 1 && (
        <div
          className="absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-2.5"
          role="tablist"
          aria-label="Hero slides"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-label={`Show slide ${i + 1}`}
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "h-2 rounded-full shadow shadow-black/30 transition-all duration-300",
                i === active ? "w-7 bg-white" : "w-2 bg-white/50 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      )}
    </>
  )
}
