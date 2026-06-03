import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Check } from "lucide-react"
import { SERVICES, COLOR_CLASSES } from "@/lib/site-content"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Our Services",
  description:
    "Government supplies, institutional sales, GeM registered procurement and general trade — comprehensive pharmaceutical supply solutions from Healingdoc Pharma.",
  path: "/services",
})

export default function ServicesPage() {
  return (
    <main className="bg-background">
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Our Services</h1>
          <p className="text-lg lg:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Comprehensive pharmaceutical supply solutions tailored for government, institutions and trade partners.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {SERVICES.map((service, index) => (
              <div
                key={service.title}
                className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
              >
                <div className={`relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl ${index % 2 === 1 ? "lg:order-last" : ""}`}>
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className={`w-14 h-14 ${COLOR_CLASSES[service.color].solidBg} rounded-xl flex items-center justify-center mb-5`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className={`w-6 h-6 rounded-full ${COLOR_CLASSES[service.color].softBg} flex items-center justify-center shrink-0 mt-0.5`}>
                          <Check className={`w-4 h-4 ${COLOR_CLASSES[service.color].text}`} />
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
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-5 text-balance">Let's Work Together</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Whether you represent a government body, hospital, or retail network, we have a supply solution for you.
          </p>
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="gap-2 bg-white text-primary hover:bg-white/90">
              Get in Touch
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  )
}
