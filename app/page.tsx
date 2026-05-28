import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ShieldCheck, BadgeCheck, Truck } from "lucide-react"
import { getSiteSettings } from "@/lib/site-settings-actions"
import { getProducts } from "@/lib/product-actions"
import { getTestimonials } from "@/lib/testimonial-actions"
import { getBlogPosts } from "@/lib/blog-actions"
import { FEATURES, SERVICES, COLOR_CLASSES } from "@/lib/site-content"
import { ProductCard } from "@/components/product-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { BlogCard } from "@/components/blog-card"
import { SectionHeading } from "@/components/section-heading"

export default async function Home() {
  const [allProducts, settings, testimonials, posts] = await Promise.all([
    getProducts(),
    getSiteSettings(),
    getTestimonials(),
    getBlogPosts(),
  ])

  const featuredProducts = allProducts.slice(0, 3)
  const featuredTestimonials = (testimonials.filter((t) => t.featured).length
    ? testimonials.filter((t) => t.featured)
    : testimonials
  ).slice(0, 3)
  const latestPosts = posts.slice(0, 3)

  const hero = settings?.hero || {
    title: "Delivering Trust Through Quality Healthcare",
    description:
      "Healingdoc Pharma Pvt. Ltd. is committed to high-quality, affordable and innovative medicines, manufactured at WHO-GMP certified facilities.",
    image: "/modern-pharmacy-healthcare-professional.jpg",
  }

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-background py-16 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <Badge variant="outline" className="mb-5 gap-2 py-1.5">
                <ShieldCheck className="w-4 h-4 text-success" />
                WHO-GMP Certified Manufacturing
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance leading-[1.1]">
                {hero.title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">{hero.description}</p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    Explore Products
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                    Become a Partner
                  </Button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><BadgeCheck className="w-4 h-4 text-primary" /> Quality Assured</span>
                <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-primary" /> Pan-India Supply</span>
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> Ethical Practices</span>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={hero.image || "/modern-pharmacy-healthcare-professional.jpg"}
                alt="Healthcare professionals at Healingdoc Pharma"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Healthcare You Can Trust"
            description="We are dedicated to excellence in pharmaceutical manufacturing and distribution."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f) => (
              <Card key={f.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${COLOR_CLASSES[f.color].softBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <f.icon className={`w-7 h-7 ${COLOR_CLASSES[f.color].text}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Products"
            title="Featured Products"
            description="A glimpse of our comprehensive range of quality pharmaceutical formulations."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            description="Comprehensive pharmaceutical supply solutions for every channel."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <Card key={s.title} className="p-6 hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 ${COLOR_CLASSES[s.color].solidBg} rounded-lg flex items-center justify-center mb-4`}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{s.description}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" className="gap-2">
                Explore Our Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl order-last lg:order-first">
              <Image
                src="/hospital-healthcare-institution.jpg"
                alt="About Healingdoc Pharma"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                About Us
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 text-balance">
                A Rapidly Growing Name in Quality Healthcare
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Healingdoc Pharma Pvt. Ltd. believes healthcare is not just a business — it is a responsibility towards
                society. Driven by innovation and integrity, we deliver trusted pharmaceutical formulations that
                healthcare professionals and patients can rely upon.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                With WHO-GMP certified manufacturing, ethical business practices and a pan-India distribution network, we
                aim to make healthcare more accessible and reliable for everyone.
              </p>
              <Link href="/about">
                <Button variant="outline" className="gap-2 bg-transparent">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials teaser */}
      {featuredTestimonials.length > 0 && (
        <section className="py-16 lg:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Testimonials"
              title="Trusted by Healthcare Professionals"
              description="What doctors, distributors and partners say about working with us."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/testimonials">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                  Read All Testimonials
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Blog teaser */}
      {latestPosts.length > 0 && (
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="From Our Blog"
              title="Health Insights & Updates"
              description="Practical health tips, awareness articles and company news."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/blog">
                <Button size="lg" className="gap-2">
                  Visit Our Blog
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-5 text-balance">Ready to Partner With Us?</h2>
          <p className="text-lg lg:text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Join the healthcare providers, distributors and institutions who trust Healingdoc Pharma for quality
            pharmaceutical solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 bg-transparent">
                View Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
