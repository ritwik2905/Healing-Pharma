/**
 * A slim, auto-scrolling ticker of product names for the homepage.
 * Pure CSS animation (see `.animate-marquee` in globals.css). The track holds
 * two identical rows so the -50% translate loops seamlessly; it pauses on hover
 * and stops entirely for reduced-motion users (names stay visible either way).
 */
function Row({ names }: { names: string[] }) {
  return (
    <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden>
      {names.map((name, i) => (
        <span key={i} className="flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold text-foreground/70">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-accent to-primary" />
          {name}
        </span>
      ))}
    </div>
  )
}

export function ProductMarquee({ names }: { names: string[] }) {
  const list = names.map((n) => n.trim()).filter(Boolean)
  if (list.length === 0) return null

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-card/40 py-4" aria-label="Our products">
      {/* Soft edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-28" />
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Row names={list} />
        <Row names={list} />
      </div>
    </section>
  )
}
