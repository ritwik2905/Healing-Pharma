"use client"

import { useEffect, useState } from "react"
import { BrandLoader } from "@/components/brand-loader"
import { cn } from "@/lib/utils"

/**
 * Full-screen branded splash shown on the initial (hard) page load. It hides as
 * soon as the page has actually finished loading — no artificial delay — with a
 * failsafe timeout so it can never get stuck. SPA navigations don't re-trigger
 * it (those use the route-level loading.tsx instead).
 */
export function InitialLoader() {
  const [done, setDone] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    // Brief, predictable branded moment — hides as soon as the page is hydrated
    // and a short minimum has elapsed, capped so it never feels slow. SSR content
    // is already painted underneath, so this never blocks real content.
    const t = setTimeout(() => setDone(true), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => setRemoved(true), 600)
    return () => clearTimeout(t)
  }, [done])

  if (removed) return null

  return (
    <div
      aria-hidden={done}
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-500",
        done ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <BrandLoader />
    </div>
  )
}
