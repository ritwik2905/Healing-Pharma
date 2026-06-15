import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface HeroAction {
  label: string
  href: string
  /** "primary" = solid white pill, "ghost" = frosted, "outline" = bordered. */
  variant?: "primary" | "ghost" | "outline"
  icon?: React.ReactNode
}

export interface HeroStat {
  value: string
  label: string
}

interface PageHeroProps {
  /** Background photograph (object-cover). */
  image: string
  imageAlt?: string
  /** Small label above the title (rendered as a frosted pill). */
  eyebrow?: string
  eyebrowIcon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  actions?: HeroAction[]
  stats?: HeroStat[]
  align?: "center" | "left"
  size?: "md" | "lg"
  /** CSS object-position for the photo (e.g. "center", "top"). */
  imagePosition?: string
  /** Whether to eager-load the image (use on the first hero a visitor sees). */
  priority?: boolean
  children?: React.ReactNode
  className?: string
}

const ACTION_STYLES: Record<NonNullable<HeroAction["variant"]>, string> = {
  primary: "bg-white text-primary hover:bg-white/90 shadow-lg shadow-black/10",
  ghost: "glass-dark text-white hover:bg-white/20 border-transparent",
  outline: "border border-white/70 text-white hover:bg-white/15 bg-transparent",
}

/**
 * Image-backed page hero with a brand-tinted scrim, frosted glass chips and a
 * soft landing into the page below. Used on every inner page so each one opens
 * with relevant photography while staying on-theme (logo green → blue).
 */
export function PageHero({
  image,
  imageAlt = "",
  eyebrow,
  eyebrowIcon,
  title,
  description,
  actions,
  stats,
  align = "center",
  size = "md",
  imagePosition = "center",
  priority = false,
  children,
  className,
}: PageHeroProps) {
  const centered = align === "center"

  return (
    <section
      className={cn(
        "relative isolate flex min-h-[440px] flex-col justify-center overflow-hidden sm:min-h-[520px]",
        className,
      )}
    >
      {/* Background photograph */}
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority={priority}
        sizes="100vw"
        className="-z-20 object-cover"
        style={{ objectPosition: imagePosition }}
      />
      {/* Brand-tinted scrim for legibility + on-theme colour */}
      <div className={cn("absolute inset-0 -z-10", centered ? "hero-scrim" : "hero-scrim-left")} aria-hidden />
      {/* Subtle dot-grid texture */}
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-25" aria-hidden />
      {/* Decorative floating glows */}
      <div
        className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-white/15 blur-3xl animate-blob"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-16 h-80 w-80 rounded-full bg-accent/25 blur-3xl animate-blob"
        aria-hidden
      />

      {/* Content */}
      <div
        className={cn(
          "relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
          size === "lg" ? "py-20 sm:py-24 lg:py-32" : "py-16 sm:py-20 lg:py-24",
          centered ? "text-center" : "",
        )}
      >
        <div className={cn(centered ? "mx-auto max-w-3xl" : "max-w-2xl")}>
          {eyebrow && (
            <span className="glass-dark animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold text-white">
              {eyebrowIcon}
              {eyebrow}
            </span>
          )}
          <h1 className="drop-hero animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-100 text-balance text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p
              className={cn(
                "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-200 mt-5 text-lg leading-relaxed text-white drop-hero sm:text-xl",
                centered ? "mx-auto max-w-2xl" : "",
              )}
            >
              {description}
            </p>
          )}

          {actions && actions.length > 0 && (
            <div
              className={cn(
                "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-300 mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4",
                centered ? "sm:justify-center" : "",
              )}
            >
              {actions.map((a) => (
                <Link key={a.label} href={a.href} className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className={cn("w-full gap-2 sm:w-auto", ACTION_STYLES[a.variant ?? "primary"])}
                  >
                    {a.label}
                    {a.icon}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {children}
        </div>

        {stats && stats.length > 0 && (
          <div
            className={cn(
              "animate-in fade-in fill-mode-both duration-700 delay-500 mt-12 grid grid-cols-2 gap-3 sm:gap-4",
              stats.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3",
              centered ? "mx-auto max-w-3xl" : "max-w-2xl",
            )}
          >
            {stats.map((s) => (
              <div key={s.label} className="glass-dark rounded-2xl px-4 py-3.5 text-center">
                <div className="text-xl font-bold text-white sm:text-2xl">{s.value}</div>
                <div className="mt-0.5 text-xs text-white/90 sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Soft landing into the page background — taller, 3-stop fade so the photo
          blends all the way to its bottom edge with no visible seam. */}
      <div
        className="absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent via-background/50 to-background sm:h-28"
        aria-hidden
      />
    </section>
  )
}
