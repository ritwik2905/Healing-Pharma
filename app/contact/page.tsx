import { MapPin, Phone, Mail, Fan as Fax, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"
import { getSiteSettings } from "@/lib/site-settings-actions"
import { ContactForm } from "@/components/contact-form"
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
    email: "info@Healingdocpharma.com",
    fax: "+91 11 1234 5679",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Get in touch with us for any queries or assistance
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Get In Touch</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We're here to help and answer any questions you might have. We look forward to hearing from you.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Address</h3>
                    <p className="text-muted-foreground leading-relaxed">{contact.address}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                    <p className="text-muted-foreground">{contact.phone}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground">{contact.email}</p>
                  </div>
                </div>
              </Card>

              {contact.fax && (
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Fax className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Fax</h3>
                      <p className="text-muted-foreground">{contact.fax}</p>
                    </div>
                  </div>
                </Card>
              )}

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{contact.hours}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </div>
  )
}
