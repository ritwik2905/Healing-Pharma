"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MapPin, Phone, Mail } from "lucide-react"

interface SiteFooterProps {
  logo?: { text: string; image: string }
  contact?: { address?: string; phone?: string; email?: string }
}

export function SiteFooter({ logo, contact }: SiteFooterProps) {
  const pathname = usePathname()
  const brand = logo?.text || "Healingdoc Pharma"
  const year = new Date().getFullYear()

  // The admin panel has its own chrome — hide the public footer there.
  if (pathname.startsWith("/admin")) return null

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={logo?.image || "/logo.jpeg"}
                alt={brand}
                width={40}
                height={40}
                className="w-10 h-10 object-contain rounded"
              />
              <span className="font-bold text-lg text-foreground">{brand}</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Delivering trust through quality healthcare. WHO-GMP certified pharmaceutical products for a healthier
              tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">Our Services</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Products</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">Testimonials</Link></li>
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">Product Catalogue</Link></li>
              <li><Link href="/admin/login" className="text-muted-foreground hover:text-primary transition-colors">Admin</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              {contact?.address && (
                <li className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </li>
              )}
              {contact?.phone && (
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{contact.phone}</span>
                </li>
              )}
              {contact?.email && (
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors break-all">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-sm text-muted-foreground">&copy; {year} {brand}. All rights reserved.</p>
          <p className="text-xs text-muted-foreground">
            Manufactured at WHO-GMP certified facilities under strict quality control.
          </p>
        </div>
      </div>
    </footer>
  )
}
