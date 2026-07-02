import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ShieldCheck, BadgeCheck, Truck, Globe } from "lucide-react"
import { getSiteSettings } from "@/lib/site-settings-actions"
import { getProducts } from "@/lib/product-actions"
import { getTestimonials } from "@/lib/testimonial-actions"
import { getBlogPosts } from "@/lib/blog-actions"
import { FEATURES, SERVICES, COLOR_CLASSES } from "@/lib/site-content"
import { SITE_IMAGES } from "@/lib/site-images"
import { IMAGE_BLUR } from "@/lib/image-utils"
import { ProductCard } from "@/components/product-card"
import { ProductImage } from "@/components/product-image"
import { ProductMarquee } from "@/components/product-marquee"
import { RotatingWords } from "@/components/rotating-words"
import { HeroSlideshow } from "@/components/hero-slideshow"
import { TestimonialCard } from "@/components/testimonial-card"
import { BlogCard } from "@/components/blog-card"
import { SectionHeading } from "@/components/section-heading"
import { pageMetadata } from "@/lib/seo"

// The home page renders Featured Product cards whose links use live DB product
// IDs. Those IDs advance whenever the catalogue is re-seeded, so a static build
// would bake stale links that 404. Render per request to stay in sync with the DB.
export const dynamic = "force-dynamic"

export const metadata = pageMetadata({
  title: "Quality, Affordable Medicines — WHO-GMP Certified",
  description:
    "Healingdoc Pharma Private Limited delivers WHO-GMP certified, affordable medicines across India — pain relief, anti-infectives, gastro, anti-allergy, dermatology and nutraceuticals. Government supplies, institutional sales & GEM registered.",
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
    title: "Better Medicines. Healthier Lives.",
    description:
      "WHO-GMP certified formulations across pain relief, anti-infectives, dermatology, gastro and nutraceuticals — crafted with uncompromising quality and made affordable for the people we serve.",
    image: SITE_IMAGES.home.hero,
  }
  const heroImage = hero.image || SITE_IMAGES.home.hero
  const aboutImage = (hero as { secondaryImage?: string }).secondaryImage || SITE_IMAGES.home.about
  const heroVideo = (hero as { video?: string }).video || ""
  const videoType = /\.webm(\?|$)/i.test(heroVideo)
    ? "video/webm"
    : /\.ogg(\?|$)/i.test(heroVideo)
      ? "video/ogg"
      : "video/mp4"
  const logoSrc = settings?.logo?.image || "/logo.jpeg"
  // Real medicine images to feature in the hero collage.
  const heroProducts = allProducts.slice(0, 3)
  // Background slideshow: admin-supplied slides, else a curated set of pharma photos.
  const heroSlideSetting = Array.isArray((hero as { slides?: string[] }).slides)
    ? (hero as { slides?: string[] }).slides!.map((s) => s?.trim()).filter(Boolean)
    : []
  const heroSlides = Array.from(
    new Set(
      (heroSlideSetting.length
        ? heroSlideSetting
        : [heroImage, SITE_IMAGES.products.hero, SITE_IMAGES.about.story, SITE_IMAGES.services.hero]
      ).filter(Boolean),
    ),
  )

  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[600px] items-center overflow-hidden lg:min-h-[86vh]">
        {/* Full-bleed background: auto-sliding image slideshow (or a video if set) */}
        <HeroSlideshow images={heroSlides} videoSrc={heroVideo} videoType={videoType} poster={heroImage} />

        {/* Brand-tinted overlays for strong, photo-independent white-text legibility
            across every (possibly bright) slideshow image. */}
        <div className="absolute inset-0 -z-20 bg-primary-dark/65" aria-hidden />
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-primary-dark/95 via-primary-dark/60 to-primary-dark/25" aria-hidden />
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-primary-dark/45 via-transparent to-primary-dark/70" aria-hidden />

        {/* Soft animated colour blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-accent/25 blur-3xl animate-blob" />
          <div className="absolute bottom-0 -right-24 h-[28rem] w-[28rem] rounded-full bg-primary/25 blur-3xl animate-blob" />
        </div>

        {/* Logo watermark — visible on all breakpoints, scaled down on small screens */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.06]"
          aria-hidden
        >
          <Image
            src={logoSrc}
            alt=""
            width={620}
            height={620}
            className="h-72 w-72 object-contain brightness-0 invert sm:h-96 sm:w-96 lg:h-[34rem] lg:w-[34rem]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-20">
          {/* Copy */}
          <div className="max-w-2xl">
            <span className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-success" />
              WHO-GMP Certified Manufacturing
            </span>
            <p className="drop-hero animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-700 delay-75 mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Trusted across{" "}
              <RotatingWords
                words={["Pain Relief", "Anti-Infectives", "Gastro Care", "Anti-Allergy", "Dermatology", "Nutraceuticals"]}
                className="text-success"
              />
            </p>
            <h1 className="drop-hero animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-100 mb-5 text-balance text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              {hero.title}
            </h1>
            <p className="drop-hero animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-200 mb-7 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              {hero.description}
            </p>
            <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 delay-300 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href="/products">
                <Button size="lg" className="w-full gap-2 bg-white text-primary shadow-xl shadow-black/20 hover:bg-white/90 sm:w-auto">
                  Explore Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-white/70 bg-white/5 text-white backdrop-blur-sm hover:bg-white/15 hover:text-white sm:w-auto"
                >
                  Become a Partner
                </Button>
              </Link>
            </div>
            <div className="drop-hero animate-in fade-in fill-mode-both duration-700 delay-500 mt-9 flex flex-wrap gap-x-7 gap-y-2 text-sm text-white/90">
              <span className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-white" /> Quality Assured</span>
              <span className="flex items-center gap-2"><Truck className="h-4 w-4 text-white" /> Pan-India Supply</span>
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-white" /> Ethical Practices</span>
            </div>
          </div>

          {/* Framed image on the right + floating medicine cards (desktop) */}
          <div className="animate-in fade-in zoom-in-95 fill-mode-both duration-1000 delay-200 relative mx-auto hidden w-full max-w-[19rem] xl:max-w-sm lg:block">
            <div className="glass-card relative rounded-[2rem] p-3 shadow-2xl shadow-black/40 ring-1 ring-white/20">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <Image
                  src={aboutImage}
                  alt="Quality medicines at Healingdoc Pharma Private Limited"
                  fill
                  sizes="(max-width: 1024px) 0vw, 40vw"
                  placeholder="blur"
                  blurDataURL={IMAGE_BLUR}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating medicine product cards */}
            {heroProducts[0] && (
              <div className="absolute -bottom-6 -left-6 w-36 rotate-[-5deg] animate-float">
                <div className="glass-card rounded-2xl p-2.5 shadow-2xl shadow-black/40 ring-1 ring-white/30">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white">
                    <ProductImage src={heroProducts[0].image} name={heroProducts[0].name} sizes="180px" className="object-contain p-3" />
                  </div>
                  <p className="mt-1.5 truncate px-1 text-xs font-bold text-foreground">{heroProducts[0].name}</p>
                </div>
              </div>
            )}
            {heroProducts[1] && (
              <div className="absolute -right-4 -top-4 w-28 rotate-[6deg] animate-float-slow">
                <div className="glass-card rounded-2xl p-2 shadow-2xl shadow-black/40 ring-1 ring-white/30">
                  <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-white">
                    <ProductImage src={heroProducts[1].image} name={heroProducts[1].name} sizes="150px" className="object-contain p-2.5" />
                  </div>
                  <p className="mt-1.5 truncate px-1 text-[11px] font-bold text-foreground">{heroProducts[1].name}</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </section>

      {/* ── Product ticker ───────────────────────────────────────────── */}
      <ProductMarquee names={allProducts.map((p) => p.name)} />

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
              <Card key={f.title} className="reveal hover-lift soft-card group border-0 p-6 text-center ring-1 ring-transparent transition hover:ring-2 hover:ring-primary/30">
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
              <Card key={s.title} className="reveal hover-lift soft-card group border-0 p-6 ring-1 ring-transparent transition hover:ring-2 hover:ring-accent/30">
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
                    { value: "18+", label: "Quality Products" },
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
