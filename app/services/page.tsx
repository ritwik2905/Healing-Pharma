import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Layers } from "lucide-react"
import { SERVICES, COLOR_CLASSES } from "@/lib/site-content"
import { PageHero } from "@/components/page-hero"
import { SITE_IMAGES } from "@/lib/site-images"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Our Services",
  description:
    "Government supplies, institutional sales, GeM registered procurement and general trade — comprehensive pharmaceutical supply solutions from Healingdoc Pharma.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        image={SITE_IMAGES.services.hero}
        imageAlt="Pharmaceutical warehouse and logistics"
        eyebrow="What We Do"
        eyebrowIcon={<Layers className="h-4 w-4" />}
        title="Our Services"
        description="Comprehensive pharmaceutical supply solutions tailored for government, institutions and trade partners."
        actions={[{ label: "Get in Touch", href: "/contact", variant: "primary", icon: <ArrowRight className="h-4 w-4" /> }]}
        stats={[
          { value: "Govt", label: "Approved Vendor" },
          { value: "GeM", label: "Registered Seller" },
          { value: "Pan-India", label: "Distribution" },
          { value: "Bulk", label: "Institutional Supply" },
        ]}
        priority
      />

      {/* Services */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className="reveal group grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
              >
                <div className={`glass-card relative aspect-[16/10] overflow-hidden rounded-3xl border-0 p-2.5 ${index % 2 === 1 ? "lg:order-last" : ""}`}>
                  <div className="relative h-full w-full overflow-hidden rounded-2xl">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/15" />
                  </div>
                </div>
                <div>
                  <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${COLOR_CLASSES[service.color].solidBg} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                    <service.icon className="h-7 w-7 text-white" />
                  </div>
                  <h2 className="mb-4 text-2xl font-bold text-brand-gradient lg:text-3xl">{service.title}</h2>
                  <p className="mb-6 leading-relaxed text-muted-foreground">{service.description}</p>
                  <ul className="space-y-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${COLOR_CLASSES[service.color].softBg}`}>
                          <Check className={`h-4 w-4 ${COLOR_CLASSES[service.color].text}`} />
                        </span>
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-brand-gradient py-16 text-white lg:py-24">
        <div className="absolute inset-0 -z-10 bg-dot-grid opacity-20" aria-hidden />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-blob" aria-hidden />
        <div className="reveal mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-5 text-balance text-3xl font-bold lg:text-4xl">Let&apos;s Work Together</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90">
            Whether you represent a government body, hospital, or retail network, we have a supply solution for you.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
