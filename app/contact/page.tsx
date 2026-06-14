import { MapPin, Phone, Mail, Printer, Clock, MessageSquare } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getSiteSettings } from "@/lib/site-settings-actions"
import { ContactForm } from "@/components/contact-form"
import { PageHero } from "@/components/page-hero"
import { SITE_IMAGES } from "@/lib/site-images"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with Healingdoc Pharma Pvt. Ltd. for product enquiries, distribution partnerships, institutional and government supplies. Call, email or visit our Delhi office.",
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

  return (
    <main>
      <PageHero
        image={SITE_IMAGES.contact.hero}
        imageAlt="Business partnership handshake in a modern office"
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
                      <p className="text-muted-foreground">{contact.phone}</p>
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
                      <p className="break-all text-muted-foreground">{contact.email}</p>
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

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}
