import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquareQuote } from "lucide-react"
import { getTestimonials } from "@/lib/testimonial-actions"
import { TestimonialCard } from "@/components/testimonial-card"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Testimonials",
  description:
    "Hear from the doctors, distributors and healthcare partners who trust Healingdoc Pharma for quality pharmaceutical products.",
  path: "/testimonials",
})

export const dynamic = "force-dynamic"

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <main className="bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">What Our Partners Say</h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Trusted by healthcare professionals, distributors and institutions across India.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {testimonials.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <MessageSquareQuote className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">No testimonials yet</h2>
              <p className="text-muted-foreground">Check back soon to hear from our partners.</p>
            </div>
          )}

          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-5">Want to share your experience with us?</p>
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Share Your Feedback
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
