import { MapPin, Phone, Mail, Printer, Clock, MessageSquare, Navigation as NavigationIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getSiteSettings } from "@/lib/site-settings-actions"
import { ContactForm } from "@/components/contact-form"
import { PageHero } from "@/components/page-hero"
import { SITE_IMAGES } from "@/lib/site-images"
import { pageMetadata } from "@/lib/seo"
import { toMapEmbedSrc } from "@/lib/map-utils"

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Healingdoc Pharma Private Limited for product enquiries, distribution partnerships, institutional and government supplies. Call, email or visit our Delhi office.",
  path: "/contact",
})

export default async function ContactPage() {
  const settings = await getSiteSettings()
  const contact = settings?.contact || {
    address: "123 Pharmaceutical Park, Medical District, New Delhi - 110001, India",
    phone: "+91 11 1234 5678",
    email: "healingdocpharma@gmail.com",
    fax: "+91 11 1234 5679",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed",
  }

  // Admin sets the location ("lat,lng", an embed link/iframe, or an address);
  // fall back to embedding the postal address so a map always shows.
  const mapSrc = toMapEmbedSrc(contact.mapUrl) || toMapEmbedSrc(contact.address)

  // Split the (possibly comma-separated) phone value into individually dialable numbers.
  const phones = (contact.phone || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <main>
      <PageHero
        image={SITE_IMAGES.contact.hero}
        imageAlt="Business partnership handshake in a modern office"
        imagePosition="center 15%"
        eyebrow="Contact Us"
        eyebrowIcon={<MessageSquare className="h-4 w-4" />}
        title="Let's Start a Conversation"
        description="Get in touch with us for product enquiries, partnerships or any assistance you need."
        priority
      />

      {/* Contact Information */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="reveal">
                <h2 className="mb-4 text-3xl font-bold text-brand-gradient">Get In Touch</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  We&apos;re here to help and answer any questions you might have. We look forward to hearing from you.
                </p>
              </div>

              <div className="space-y-5">
                <Card className="reveal hover-lift soft-card border-0 p-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">Address</h3>
                      <p className="leading-relaxed text-muted-foreground">{contact.address}</p>
                    </div>
                  </div>
                </Card>

                <Card className="reveal hover-lift soft-card border-0 p-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-success/10">
                      <Phone className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">Phone</h3>
                      <p className="flex flex-wrap gap-x-3 text-muted-foreground">
                        {phones.length > 0
                          ? phones.map((num) => (
                              <a key={num} href={`tel:${num.replace(/\s+/g, "")}`} className="hover:text-primary">
                                {num}
                              </a>
                            ))
                          : contact.phone}
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="reveal hover-lift soft-card border-0 p-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">Email</h3>
                      <p className="break-all text-muted-foreground">
                        <a href={`mailto:${contact.email}`} className="hover:text-accent">
                          {contact.email}
                        </a>
                      </p>
                    </div>
                  </div>
                </Card>

                {contact.fax && (
                  <Card className="reveal hover-lift soft-card border-0 p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Printer className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-2 font-semibold text-foreground">Fax</h3>
                        <p className="text-muted-foreground">{contact.fax}</p>
                      </div>
                    </div>
                  </Card>
                )}

                <Card className="reveal hover-lift soft-card border-0 p-6">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-success/10">
                      <Clock className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h3 className="mb-2 font-semibold text-foreground">Business Hours</h3>
                      <p className="whitespace-pre-line leading-relaxed text-muted-foreground">{contact.hours}</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Map — in place of the form, beside the contact details */}
            <div className="reveal flex flex-col">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <NavigationIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brand-gradient">Find Us</h2>
                  <p className="text-sm text-muted-foreground">Visit our office</p>
                </div>
              </div>
              {mapSrc ? (
                <Card className="glass-card flex-1 overflow-hidden border-0 p-1.5">
                  <div className="relative h-full min-h-[420px] w-full overflow-hidden rounded-2xl">
                    <iframe
                      title="Healingdoc Pharma Private Limited location"
                      src={mapSrc}
                      className="absolute inset-0 h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                    />
                  </div>
                </Card>
              ) : (
                <Card className="soft-card flex flex-1 items-center justify-center border-0 p-8 text-center text-muted-foreground">
                  Map location will appear here once set in the admin panel.
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact form — below the details + map */}
      <section className="pb-16 lg:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}
