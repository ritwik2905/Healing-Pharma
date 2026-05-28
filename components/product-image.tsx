import Image from "next/image"
import { Pill } from "lucide-react"
import { hasRealImage } from "@/lib/image-utils"
import { cn } from "@/lib/utils"

interface ProductImageProps {
  src?: string
  name: string
  sizes?: string
  priority?: boolean
  className?: string
  /** Compact fallback (e.g. small table thumbnails) hides the label and shrinks the icon. */
  compact?: boolean
}

/**
 * Renders an optimized product image, or a branded fallback when no real
 * photo has been provided. Must be placed inside a `relative` container.
 */
export function ProductImage({ src, name, sizes, priority, className, compact }: ProductImageProps) {
  if (hasRealImage(src)) {
    return <Image src={src as string} alt={name} fill sizes={sizes} priority={priority} className={className} />
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center bg-gradient-to-br from-primary/10 via-accent/5 to-surface">
      <div
        className={cn(
          "rounded-2xl bg-background/70 backdrop-blur flex items-center justify-center shadow-sm",
          compact ? "w-7 h-7 rounded-lg" : "w-16 h-16",
        )}
      >
        <Pill className={cn("text-primary", compact ? "w-4 h-4" : "w-8 h-8")} />
      </div>
      {!compact && (
        <span className="text-xs font-semibold text-foreground/70 line-clamp-2 max-w-[85%]">{name}</span>
      )}
    </div>
  )
}
