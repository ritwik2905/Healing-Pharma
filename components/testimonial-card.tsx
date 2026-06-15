import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { StarRating } from "@/components/star-rating"
import type { Testimonial } from "@/lib/testimonial-actions"

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="reveal hover-lift glass-card relative flex h-full flex-col gap-3 border-0 p-5 ring-1 ring-transparent transition hover:ring-2 hover:ring-primary/25">
      <Quote className="absolute right-4 top-4 h-7 w-7 text-primary/15" />

      {/* Person */}
      <div className="flex items-center gap-3">
        {testimonial.image ? (
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-primary/15"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-accent/15 ring-2 ring-primary/15">
            <span className="font-bold text-primary">{initials(testimonial.name)}</span>
          </div>
        )}
        <div className="min-w-0 flex-1 pr-6">
          <p className="truncate font-semibold leading-tight text-foreground">{testimonial.name}</p>
          <p className="truncate text-xs text-muted-foreground">{testimonial.role}</p>
          <StarRating rating={testimonial.rating} className="mt-1" />
        </div>
      </div>

      {/* Message */}
      <p className="text-sm leading-relaxed text-muted-foreground">{testimonial.message}</p>
    </Card>
  )
}
