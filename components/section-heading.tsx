import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "left"
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = "center", className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 lg:mb-14",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">{title}</h2>
      {description && <p className="text-lg text-muted-foreground mt-4 leading-relaxed">{description}</p>}
    </div>
  )
}
