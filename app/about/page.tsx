import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, ShieldCheck, Heart, Handshake, Target, Quote } from "lucide-react"
import { getSiteSettings } from "@/lib/site-settings-actions"
import { COLOR_CLASSES, type ThemeColor } from "@/lib/site-content"
import { hasRealImage } from "@/lib/image-utils"

export const metadata = {
  title: "About Us - Healingdoc Pharma",
  description:
    "Healingdoc Pharma Pvt. Ltd. is a rapidly growing pharmaceutical company committed to quality, affordable medicines manufactured at WHO-GMP certified facilities.",
}

const STATS = [
  { value: "WHO-GMP", label: "Certified Manufacturing" },
  { value: "24+", label: "Quality Products" },
  { value: "Pan-India", label: "Distribution Network" },
]

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
    <main className="bg-background">
      {/* Hero band */}
      <section className="relative bg-gradient-to-br from-primary via-primary to-primary-dark text-white pt-16 lg:pt-24 pb-28 lg:pb-36 overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-wider text-white/80 mb-4">
            About Healingdoc Pharma
          </span>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance leading-[1.1]">
            Caring for Life, Every Day
          </h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            A rapidly growing pharmaceutical company built on trust, quality and ethical business practices — delivering
            affordable, innovative medicines across India.
          </p>
        </div>
      </section>

      {/* Overlapping stats */}
      <section className="relative z-10 -mt-20 lg:-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {STATS.map((s) => (
              <Card key={s.label} className="p-6 text-center shadow-xl">
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">{s.value}</div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Managing Director's message */}
      {chairman && (
        <section className="py-16 lg:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="glass-card relative overflow-hidden p-8 lg:p-12">
              {/* Brand-tinted glow behind the frosted card */}
              <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
                <div className="absolute -top-16 -right-10 w-72 h-72 rounded-full bg-primary/15 blur-3xl" />
                <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
              </div>
              <Quote className="absolute top-6 right-6 w-20 h-20 text-primary/10" />
              <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-center">
                <div className="flex flex-col items-center text-center shrink-0">
                  <div className="relative w-44 h-56 lg:w-52 lg:h-64 rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 ring-1 ring-white/50 bg-gradient-to-br from-primary/15 to-accent/15">
                    <Image
                      src={chairmanImage}
                      alt={chairman.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 176px, 208px"
                    />
                    {/* gradient brand strip at the base of the portrait */}
                    <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-primary to-accent" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-foreground">{chairman.name}</h3>
                  <p className="text-primary font-semibold text-sm">{chairman.title}</p>
                </div>
                <div>
                  <span className="inline-block text-sm font-semibold uppercase tracking-wider text-brand-gradient mb-3">
                    From the Desk of Our Leadership
                  </span>
                  <p className="text-lg lg:text-xl text-foreground/90 leading-relaxed italic">
                    “{chairman.description}”
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Who we are — narrative + image */}
      <section className="pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Who We Are
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 text-balance">
                A Trusted Name in the Pharmaceutical Industry
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Healingdoc Pharma Pvt. Ltd. is dedicated to delivering quality pharmaceutical and healthcare products
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
                <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <p className="text-sm text-foreground/80">
                  All products are manufactured in <strong>WHO-GMP certified facilities</strong> under strict quality
                  control standards.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/pharmacy-retail-store-medicine.jpg"
                alt="Healingdoc Pharma quality medicines"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Commitments — list style (distinct from home's icon-card grid) */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10 lg:mb-14">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Our Commitments
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">
              The Principles That Guide Us
            </h2>
          </div>
          <div className="divide-y divide-border rounded-2xl border border-border bg-background">
            {COMMITMENTS.map((c) => (
              <div key={c.title} className="flex items-start gap-5 p-6 lg:p-7">
                <div className={`w-12 h-12 shrink-0 rounded-xl ${COLOR_CLASSES[c.color].softBg} flex items-center justify-center`}>
                  <c.icon className={`w-6 h-6 ${COLOR_CLASSES[c.color].text}`} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{c.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{c.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Directors (only if present) */}
      {directors.length > 0 && (
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mx-auto max-w-2xl mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Our Leadership Team</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {directors.map((director) => {
                const color = (["primary", "accent", "success", "warning"].includes(director.color)
                  ? director.color
                  : "primary") as ThemeColor
                return (
                  <Card key={director.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-56 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      {hasRealImage(director.image) ? (
                        <Image src={director.image} alt={director.name} fill className="object-cover" sizes="(max-width: 1024px) 50vw, 33vw" />
                      ) : (
                        <div className={`w-24 h-24 ${COLOR_CLASSES[color].solidBg} rounded-full flex items-center justify-center`}>
                          <span className="text-white text-3xl font-bold">{director.initials}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="text-lg font-bold text-foreground mb-1">{director.name}</h3>
                      <p className={`${COLOR_CLASSES[color].text} font-semibold text-sm mb-2`}>{director.title}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">{director.description}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Mission + CTA band */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-wider text-white/80 mb-3">
            Our Mission
          </span>
          <p className="text-2xl lg:text-3xl font-semibold leading-relaxed text-balance mb-8">
            To create a healthier future through quality medicines, strong partnerships and continuous growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                Explore Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white/10 bg-transparent">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
