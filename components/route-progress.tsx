"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

/**
 * A thin brand-gradient progress bar shown at the top of the viewport during
 * page navigation. It starts when an internal link is clicked and completes
 * when the new route's pathname takes effect — giving instant "it's loading"
 * feedback even before the new page's own loading.tsx (BrandLoader) appears.
 */
export function RouteProgress() {
  const pathname = usePathname()
  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const firstRender = useRef(true)

  const stop = () => {
    if (timer.current) {
      clearInterval(timer.current)
      timer.current = null
    }
  }

  const start = () => {
    if (timer.current) return
    setActive(true)
    setProgress(10)
    timer.current = setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.max(0.6, (90 - p) * 0.08) : p))
    }, 180)
  }

  const finish = () => {
    stop()
    setProgress(100)
    window.setTimeout(() => {
      setActive(false)
      setProgress(0)
    }, 320)
  }

  // Start on clicks that lead to a different internal route.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const anchor = (e.target as HTMLElement | null)?.closest?.("a")
      if (!anchor) return
      const href = anchor.getAttribute("href")
      const target = anchor.getAttribute("target")
      if (!href || target === "_blank") return
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return
      if (anchor.origin === window.location.origin && anchor.pathname !== window.location.pathname) {
        start()
      }
    }
    document.addEventListener("click", onClick, true)
    return () => document.removeEventListener("click", onClick, true)
  }, [])

  // Complete the bar once the route has actually changed.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    finish()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => () => stop(), [])

  if (!active) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-0.5" aria-hidden>
      <div
        className="h-full bg-gradient-to-r from-accent via-primary to-primary-dark shadow-[0_0_10px] shadow-primary/60 transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
