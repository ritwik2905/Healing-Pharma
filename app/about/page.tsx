import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ShieldCheck, Heart, Handshake, Target, Quote, Building2 } from "lucide-react"
import { getSiteSettings } from "@/lib/site-settings-actions"
import { COLOR_CLASSES, type ThemeColor } from "@/lib/site-content"
import { hasRealImage } from "@/lib/image-utils"
import { PageHero } from "@/components/page-hero"
import { SITE_IMAGES } from "@/lib/site-images"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Healingdoc Pharma Private Limited is a rapidly growing pharmaceutical company committed to quality, affordable medicines manufactured at WHO-GMP certified facilities.",
  path: "/about",
})

const COMMITMENTS: { icon: typeof Heart; title: string; description: string; color: ThemeColor }[] = [
  { icon: ShieldCheck, title: "Uncompromising Quality", description: "Every product is manufactured under strict WHO-GMP standards, tested batch after batch for safety and consistency.", color: "primary" },
  { icon: Heart, title: "Patient Well-being First", description: "Patient health and customer satisfaction sit at the centre of every product and partnership decision we make.", color: "accent" },
  { icon: Handshake, title: "Ethical & Transparent", description: "We build long-term relationships with doctors, distributors and retailers through honest, transparent dealing.", color: "success" },
  { icon: Target, title: "Innovation & Growth", description: "We continuously expand our portfolio to meet the evolving needs of modern healthcare across India.", color: "warning" },
]

export default async function AboutPage() {
  const settings = await getSiteSettings()
  const chairman = settings?.chairman
  const directors: any[] = settings?.directors || []
  // Show the catalogue photo even if the stored value is still empty.
  const chairmanImage = hasRealImage(chairman?.image) ? chairman.image : "/team/managing-director.jpg"

  return (
    <main>
      <PageHero
        image={SITE_IMAGES.about.hero}
        imageAlt="Team of healthcare professionals at Healingdoc Pharma"
        eyebrow="About Healingdoc Pharma"
        eyebrowIcon={<Building2 className="h-4 w-4" />}
        imagePosition="center 28%"
        title="Care for Life, Every Day"
        description="A rapidly growing pharmaceutical company built on trust, quality and ethical business practices — delivering affordable, innovative medicines across India."
        stats={[
          { value: "WHO-GMP", label: "Certified Manufacturing" },
          { value: "24+", label: "Quality Products" },
          { value: "Pan-India", label: "Distribution Network" },
        ]}
        size="lg"
        priority
      />

      {/* Managing Director's message */}
      {chairman && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Card className="reveal glass-card relative overflow-hidden border-0 p-8 lg:p-12">
              {/* Brand-tinted glow behind the frosted card */}
              <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
                <div className="absolute -top-16 -right-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
              </div>
              <Quote className="absolute right-6 top-6 h-20 w-20 text-primary/10" />
              <div className="grid items-center gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
                <div className="flex shrink-0 flex-col items-center text-center">
                  <div className="relative h-56 w-44 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 shadow-2xl shadow-primary/20 ring-1 ring-white/50 lg:h-64 lg:w-52">
                    <Image
                      src={chairmanImage}
                      alt={chairman.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 176px, 208px"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-primary to-accent" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">{chairman.name}</h3>
                  <p className="text-sm font-semibold text-primary">{chairman.title}</p>
                </div>
                <div>
                  <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-brand-gradient">
                    From the Desk of Our Leadership
                  </span>
                  <p className="text-lg italic leading-relaxed text-foreground/90 lg:text-xl">
                    &ldquo;{chairman.description}&rdquo;
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Who we are — narrative + image */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="reveal">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-primary" />
                Who We Are
              </span>
              <h2 className="mb-5 text-balance text-3xl font-bold text-brand-gradient lg:text-4xl">
                A Trusted Name in the Pharmaceutical Industry
              </h2>
              <div className="space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  Healingdoc Pharma Private Limited is dedicated to delivering quality pharmaceutical and healthcare products
                  with a commitment to excellence, innovation and customer satisfaction. We continuously work towards
                  providing affordable and effective medicines that support better healthcare outcomes.
                </p>
                <p>
                  We collaborate with reputed WHO-GMP certified manufacturing units to ensure superior product quality
                  and consistency. With a growing portfolio and an ethical business approach, we are steadily expanding
                  our presence across the pharmaceutical market.
                </p>
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <p className="text-sm text-foreground/80">
                  All products are manufactured in <strong>WHO-GMP certified facilities</strong> under strict quality
                  control standards.
                </p>
              </div>
            </div>
            <div className="reveal glass-card relative aspect-[4/3] overflow-hidden rounded-3xl border-0 p-2.5">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  src={SITE_IMAGES.about.story}
                  alt="Quality control at a Healingdoc Pharma laboratory"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/15" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitments — list style */}
      <section className="section-frost py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-2xl lg:mb-14">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-accent to-primary" />
              Our Commitments
            </span>
            <h2 className="text-balance text-3xl font-bold text-brand-gradient lg:text-4xl">
              The Principles That Guide Us
            </h2>
          </div>
          <div className="glass-card divide-y divide-border/70 overflow-hidden rounded-3xl border-0">
            {COMMITMENTS.map((c) => (
              <div key={c.title} className="reveal group flex items-start gap-5 p-6 lg:p-7">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${COLOR_CLASSES[c.color].softBg} transition-transform duration-300 group-hover:scale-110`}>
                  <c.icon className={`h-6 w-6 ${COLOR_CLASSES[c.color].text}`} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-foreground">{c.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directors (only if present) */}
      {directors.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <h2 className="mx-auto text-balance text-3xl font-bold text-brand-gradient lg:text-4xl">Our Leadership Team</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {directors.map((director) => {
                const color = (["primary", "accent", "success", "warning"].includes(director.color)
                  ? director.color
                  : "primary") as ThemeColor
                return (
                  <Card key={director.id} className="reveal hover-lift glass-card overflow-hidden border-0">
                    <div className="relative flex h-56 items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                      {hasRealImage(director.image) ? (
                        <Image src={director.image} alt={director.name} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
                      ) : (
                        <div className={`flex h-24 w-24 items-center justify-center rounded-full ${COLOR_CLASSES[color].solidBg}`}>
                          <span className="text-3xl font-bold text-white">{director.initials}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="mb-1 text-lg font-bold text-foreground">{director.name}</h3>
                      <p className={`${COLOR_CLASSES[color].text} mb-2 text-sm font-semibold`}>{director.title}</p>
                      <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">{director.description}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Mission + CTA band */}
      <section className="relative isolate overflow-hidden bg-brand-gradient py-16 text-white lg:py-24">
        <div className="absolute inset-0 -z-10 bg-dot-grid opacity-20" aria-hidden />
        <div className="pointer-events-none absolute -top-20 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-blob" aria-hidden />
        <div className="reveal mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-white/80">
            Our Mission
          </span>
          <p className="mb-8 text-balance text-2xl font-semibold leading-relaxed lg:text-3xl">
            To create a healthier future through quality medicines, strong partnerships and continuous growth.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/products">
              <Button size="lg" variant="secondary" className="w-full gap-2 bg-white text-primary hover:bg-white/90 sm:w-auto">
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full border-white bg-transparent text-white hover:bg-white/10 sm:w-auto">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
