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
        "reveal mb-10 lg:mb-14",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm",
            align === "center" && "mx-auto",
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-primary" />
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl lg:text-4xl font-bold text-brand-gradient text-balance",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </h2>
      {description && <p className="text-lg text-muted-foreground mt-4 leading-relaxed">{description}</p>}
    </div>
  )
}
