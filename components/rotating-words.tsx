"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

/**
 * Cycles through a list of words with a soft fade/slide — a small interactive
 * accent for hero kickers. Falls back to the first word with no animation when
 * there's only one word (or for reduced-motion users, it simply still reads).
 */
export function RotatingWords({
  words,
  className,
  interval = 2200,
}: {
  words: string[]
  className?: string
  interval?: number
}) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (words.length <= 1) return
    const id = setInterval(() => {
      setVisible(false)
      const swap = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setVisible(true)
      }, 260)
      return () => clearTimeout(swap)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span
      className={cn(
        "inline-block transition-all duration-300 ease-out",
        visible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
        className,
      )}
    >
      {words[index]}
    </span>
  )
}
