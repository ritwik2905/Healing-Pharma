import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquareQuote } from "lucide-react"
import { getTestimonials } from "@/lib/testimonial-actions"
import { TestimonialCard } from "@/components/testimonial-card"
import { PageHero } from "@/components/page-hero"
import { SITE_IMAGES } from "@/lib/site-images"
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
    <main>
      <PageHero
        image={SITE_IMAGES.testimonials.hero}
        imageAlt="Confident team of healthcare professionals"
        eyebrow="Testimonials"
        eyebrowIcon={<MessageSquareQuote className="h-4 w-4" />}
        title="What Our Partners Say"
        description="Trusted by healthcare professionals, distributors and institutions across India."
        priority
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {testimonials.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <MessageSquareQuote className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-foreground">No testimonials yet</h2>
              <p className="text-muted-foreground">Check back soon to hear from our partners.</p>
            </div>
          )}

          <div className="mt-16 text-center">
            <p className="mb-5 text-muted-foreground">Want to share your experience with us?</p>
            <Link href="/contact">
              <Button size="lg" className="gap-2">
                Share Your Feedback
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
