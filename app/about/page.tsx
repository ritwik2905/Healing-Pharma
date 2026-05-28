import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Target, Heart, ShieldCheck, Handshake } from "lucide-react"
import { getSiteSettings } from "@/lib/site-settings-actions"
import { COLOR_CLASSES, type ThemeColor } from "@/lib/site-content"

export const metadata = {
  title: "About Us - Healingdoc Pharma",
  description:
    "Healingdoc Pharma Pvt. Ltd. is a rapidly growing pharmaceutical company committed to quality, affordable medicines manufactured at WHO-GMP certified facilities.",
}

const VALUES = [
  { icon: ShieldCheck, title: "Quality", description: "Every product is manufactured under strict WHO-GMP quality standards.", color: "primary" as ThemeColor },
  { icon: Heart, title: "Patient First", description: "Patient well-being and customer satisfaction guide every decision.", color: "accent" as ThemeColor },
  { icon: Handshake, title: "Integrity", description: "Ethical, transparent business practices with every partner.", color: "success" as ThemeColor },
  { icon: Target, title: "Innovation", description: "Continuously evolving to meet the needs of modern healthcare.", color: "warning" as ThemeColor },
]

export default async function AboutPage() {
  const settings = await getSiteSettings()
  const chairman = settings?.chairman
  const directors: any[] = settings?.directors || []

  return (
    <main className="bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">About Healingdoc Pharma</h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Delivering trust through quality healthcare — committed to high-quality, affordable and innovative medicines.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/modern-pharmacy-healthcare-professional.jpg"
                alt="Healingdoc Pharma"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-3">
                Who We Are
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5 text-balance">
                A Trusted Name in the Pharmaceutical Industry
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Healingdoc Pharma Pvt. Ltd. is a rapidly growing pharmaceutical company focused on providing
                  high-quality and affordable medicines. We are committed to excellence in healthcare through
                  innovation, ethical practices, and customer satisfaction.
                </p>
                <p>
                  Our company collaborates with reputed WHO-GMP certified manufacturing units to ensure superior product
                  quality and consistency. With a growing portfolio and an ethical business approach, we are steadily
                  expanding our presence across the pharmaceutical market.
                </p>
                <p>
                  We believe that trust and long-term relationships are the pillars of success. Through dedicated
                  service, transparent dealings and a customer-focused approach, we aim to become a preferred healthcare
                  partner nationwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mx-auto max-w-3xl mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">Our Core Values</h2>
            <p className="text-lg text-muted-foreground mt-4">The principles that drive everything we do.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <Card key={v.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${COLOR_CLASSES[v.color].softBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <v.icon className={`w-7 h-7 ${COLOR_CLASSES[v.color].text}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mx-auto max-w-3xl mb-12">
            <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-3">
              Leadership
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground text-balance">From the Desk of Our Leadership</h2>
          </div>

          {chairman && (
            <div className="max-w-3xl mx-auto mb-12">
              <Card className="overflow-hidden">
                <div className="grid sm:grid-cols-3">
                  <div className="relative h-64 sm:h-auto bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    {chairman.image ? (
                      <Image src={chairman.image} alt={chairman.name} fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" />
                    ) : (
                      <div className="w-28 h-28 bg-primary rounded-full flex items-center justify-center my-8">
                        <span className="text-white text-4xl font-bold">{chairman.initials || "MD"}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 sm:p-8 sm:col-span-2">
                    <h3 className="text-2xl font-bold text-foreground">{chairman.name}</h3>
                    <p className="text-primary font-semibold mb-4">{chairman.title}</p>
                    <p className="text-muted-foreground leading-relaxed text-sm">{chairman.description}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {directors.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {directors.map((director) => {
                const color = (["primary", "accent", "success", "warning"].includes(director.color)
                  ? director.color
                  : "primary") as ThemeColor
                return (
                  <Card key={director.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-56 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      {director.image ? (
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
          )}
        </div>
      </section>

      {/* Mission + stats */}
      <section className="py-16 lg:py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-5">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At Healingdoc Pharma Pvt. Ltd., we believe healthcare is not just a business — it is a responsibility
              towards society. Our mission is to create a healthier future through quality medicines, strong partnerships
              and continuous growth.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">WHO-GMP</div>
              <p className="text-sm text-muted-foreground">Certified Manufacturing</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">24+</div>
              <p className="text-sm text-muted-foreground">Quality Products</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-success mb-2">Pan-India</div>
              <p className="text-sm text-muted-foreground">Distribution Network</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 lg:p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Partner with Healingdoc Pharma</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore our product range or reach out to discuss distribution, institutional supply and government
              tenders.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  View Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                  Contact Us
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>
    </main>
  )
}
