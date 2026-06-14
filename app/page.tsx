import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ShieldCheck, BadgeCheck, Truck, Globe, Sparkles } from "lucide-react"
import { getSiteSettings } from "@/lib/site-settings-actions"
import { getProducts } from "@/lib/product-actions"
import { getTestimonials } from "@/lib/testimonial-actions"
import { getBlogPosts } from "@/lib/blog-actions"
import { FEATURES, SERVICES, COLOR_CLASSES } from "@/lib/site-content"
import { SITE_IMAGES } from "@/lib/site-images"
import { ProductCard } from "@/components/product-card"
import { TestimonialCard } from "@/components/testimonial-card"
import { BlogCard } from "@/components/blog-card"
import { SectionHeading } from "@/components/section-heading"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Quality, Affordable Medicines — WHO-GMP Certified",
  description:
    "Healingdoc Pharma Pvt. Ltd. delivers WHO-GMP certified, affordable medicines across India — pain relief, anti-infectives, dermatology, gastro, respiratory care and nutraceuticals. Government supplies, institutional sales & GEM registered.",
  path: "/",
})

const CREDENTIALS = [
  { icon: ShieldCheck, value: "WHO-GMP", label: "Certified Manufacturing" },
  { icon: Globe, value: "GeM", label: "Government Registered" },
  { icon: Truck, value: "Pan-India", label: "Supply Network" },
  { icon: BadgeCheck, value: "100%", label: "Ethical Practices" },
]

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
    image: SITE_IMAGES.home.hero,
  }
  const heroImage = hero.image || SITE_IMAGES.home.hero
  const aboutImage = (hero as { secondaryImage?: string }).secondaryImage || SITE_IMAGES.home.about

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl animate-blob" />
          <div className="absolute top-10 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-blob" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            {/* Copy */}
            <div>
              <span className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-success" />
                WHO-GMP Certified Manufacturing
              </span>
              <h1 className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-100 mb-6 text-balance text-4xl font-bold leading-[1.1] text-brand-gradient sm:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
              <p className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-200 mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                {hero.description}
              </p>
              <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-300 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href="/products">
                  <Button size="lg" className="w-full gap-2 sm:w-auto">
                    Explore Products
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="w-full bg-transparent sm:w-auto">
                    Become a Partner
                  </Button>
                </Link>
              </div>
              <div className="animate-in fade-in fill-mode-both duration-700 delay-500 mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-primary" /> Quality Assured</span>
                <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> Pan-India Supply</span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Ethical Practices</span>
              </div>
            </div>

            {/* Framed photo + floating glass stats */}
            <div className="animate-in fade-in zoom-in-95 fill-mode-both duration-1000 delay-200 relative">
              <div className="glass-card relative rounded-[2rem] p-3">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] sm:aspect-[16/11] lg:aspect-[4/5]">
                  <Image
                    src={heroImage}
                    alt="Healthcare professionals at Healingdoc Pharma"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />
                </div>
              </div>
              <div className="glass-card animate-float absolute bottom-3 left-3 flex max-w-[14rem] items-center gap-3 rounded-2xl px-4 py-3 lg:-bottom-5 lg:-left-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success/15">
                  <ShieldCheck className="h-5 w-5 text-success" />
                </span>
                <div>
                  <div className="text-sm font-bold text-foreground">WHO-GMP Certified</div>
                  <div className="text-xs text-muted-foreground">Quality you can trust</div>
                </div>
              </div>
              <div className="glass-card animate-float-slow absolute right-3 top-3 hidden max-w-[12rem] items-center gap-2.5 rounded-2xl px-3.5 py-2.5 sm:flex lg:-top-5 lg:-right-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                  <Sparkles className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <div className="text-base font-bold text-primary">24+</div>
                  <div className="text-[11px] text-muted-foreground">Quality Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credentials strip ────────────────────────────────────────── */}
      <section className="section-frost">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4">
            {CREDENTIALS.map((c) => (
              <div key={c.label} className="flex items-center justify-center gap-3 sm:justify-start">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <c.icon className="h-5 w-5 text-primary" />
                </span>
                <div className="leading-tight">
                  <div className="text-base font-bold text-foreground">{c.value}</div>
                  <div className="text-xs text-muted-foreground">{c.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Healthcare You Can Trust"
            description="We are dedicated to excellence in pharmaceutical manufacturing and distribution."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => (
              <Card key={f.title} className="reveal hover-lift soft-card group border-0 p-6 text-center">
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl ${COLOR_CLASSES[f.color].softBg} transition-transform duration-300 group-hover:scale-110`}>
                  <f.icon className={`h-7 w-7 ${COLOR_CLASSES[f.color].text}`} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Products"
            title="Featured Products"
            description="A glimpse of our comprehensive range of quality pharmaceutical formulations."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/products">
              <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Services teaser ──────────────────────────────────────────── */}
      <section className="section-frost py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What We Do"
            title="Our Services"
            description="Comprehensive pharmaceutical supply solutions for every channel."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <Card key={s.title} className="reveal hover-lift soft-card group border-0 p-6">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${COLOR_CLASSES[s.color].solidBg} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                  <s.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{s.title}</h3>
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services">
              <Button size="lg" className="gap-2">
                Explore Our Services
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── About teaser ─────────────────────────────────────────────── */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="reveal glass-card overflow-hidden rounded-3xl border-0 p-6 sm:p-8 lg:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={aboutImage}
                  alt="Quality medicines at Healingdoc Pharma"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/15" />
              </div>
              <div>
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-primary" />
                  About Us
                </span>
                <h2 className="mb-5 text-balance text-3xl font-bold text-brand-gradient lg:text-4xl">
                  A Rapidly Growing Name in Quality Healthcare
                </h2>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  We believe healthcare is not just a business — it is a responsibility towards society. With WHO-GMP
                  certified manufacturing, ethical practices and a pan-India network, we make healthcare more accessible
                  and reliable for everyone.
                </p>
                <div className="mb-7 grid grid-cols-2 gap-4">
                  {[
                    { value: "WHO-GMP", label: "Certified Facilities" },
                    { value: "24+", label: "Quality Products" },
                    { value: "Pan-India", label: "Distribution" },
                    { value: "100%", label: "Ethical Practices" },
                  ].map((s) => (
                    <div key={s.label} className="rounded-2xl border border-border/70 bg-card/90 p-4 text-center shadow-sm">
                      <div className="text-xl font-bold text-primary lg:text-2xl">{s.value}</div>
                      <p className="text-xs text-muted-foreground sm:text-sm">{s.label}</p>
                    </div>
                  ))}
                </div>
                <Link href="/about">
                  <Button className="gap-2">
                    Learn More About Us
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials teaser ──────────────────────────────────────── */}
      {featuredTestimonials.length > 0 && (
        <section className="section-frost py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Testimonials"
              title="Trusted by Healthcare Professionals"
              description="What doctors, distributors and partners say about working with us."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/testimonials">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                  Read All Testimonials
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Blog teaser ──────────────────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="From Our Blog"
              title="Health Insights & Updates"
              description="Practical health tips, awareness articles and company news."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/blog">
                <Button size="lg" className="gap-2">
                  Visit Our Blog
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-gradient-hero py-16 text-white lg:py-24">
        <div className="absolute inset-0 -z-10 bg-dot-grid opacity-20" aria-hidden />
        <div className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-blob" aria-hidden />
        <div className="reveal mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-5 text-balance text-3xl font-bold lg:text-5xl">Ready to Partner With Us?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90 lg:text-xl">
            Join the healthcare providers, distributors and institutions who trust Healingdoc Pharma for quality
            pharmaceutical solutions.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="w-full gap-2 bg-white text-primary hover:bg-white/90 sm:w-auto">
                Contact Us
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button size="lg" variant="outline" className="w-full border-white bg-transparent text-white hover:bg-white/10 sm:w-auto">
                View Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
