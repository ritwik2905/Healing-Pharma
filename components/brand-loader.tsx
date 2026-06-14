import Image from "next/image"
import { cn } from "@/lib/utils"

/**
 * Branded loading indicator — the logo inside a spinning brand-gradient ring
 * with a soft glow, the gradient wordmark, and an indeterminate progress bar.
 * Pure presentational (no client hooks) so it can be used directly in a
 * route-level loading.tsx as well as inside the initial splash overlay.
 */
export function BrandLoader({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col items-center justify-center gap-7 text-center", className)}
      role="status"
      aria-live="polite"
    >
      <div className="relative h-28 w-28">
        {/* soft pulsing glow */}
        <span
          className="absolute inset-1 animate-pulse rounded-full bg-primary/25 blur-xl"
          aria-hidden="true"
        />
        {/* spinning brand-gradient ring */}
        <span
          className="absolute inset-0 animate-spin rounded-full [animation-duration:1.2s]"
          style={{
            background:
              "conic-gradient(from 90deg, transparent 0deg, color-mix(in oklch, var(--accent) 85%, transparent) 110deg, var(--primary) 300deg, transparent 360deg)",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 5px))",
          }}
          aria-hidden="true"
        />
        {/* logo disc */}
        <span className="absolute inset-[14px] flex items-center justify-center rounded-full bg-card shadow-lg shadow-primary/25 ring-1 ring-border">
          <Image
            src="/logo.jpeg"
            alt="Healingdoc Pharma"
            width={56}
            height={56}
            priority
            className="h-14 w-14 rounded-xl object-contain"
          />
        </span>
      </div>

      <div className="space-y-3">
        <div className="text-xl font-bold text-brand-gradient">Healingdoc Pharma</div>
        <div className="mx-auto h-1 w-40 overflow-hidden rounded-full bg-primary/15">
          <div className="animate-loader-bar h-full w-1/2 rounded-full bg-gradient-to-r from-accent to-primary" />
        </div>
      </div>
      <span className="sr-only">Loading, please wait…</span>
    </div>
  )
}
