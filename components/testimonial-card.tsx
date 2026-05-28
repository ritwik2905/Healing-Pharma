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
    <Card className="p-6 h-full flex flex-col hover:shadow-lg transition-shadow">
      <Quote className="w-8 h-8 text-primary/30 mb-3" />
      <StarRating rating={testimonial.rating} className="mb-4" />
      <p className="text-muted-foreground leading-relaxed flex-1">{testimonial.message}</p>
      <div className="flex items-center gap-3 mt-6 pt-6 border-t border-border">
        {testimonial.image ? (
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary font-bold">{initials(testimonial.name)}</span>
          </div>
        )}
        <div>
          <p className="font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </Card>
  )
}
