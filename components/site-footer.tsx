"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MapPin, Phone, Mail, ArrowUpRight, ShieldCheck } from "lucide-react"
import { brandParts } from "@/lib/utils"

interface SiteFooterProps {
  logo?: { text: string; image: string }
  contact?: { address?: string; phone?: string; email?: string }
}

const COMPANY_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
]

const RESOURCE_LINKS = [
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/products", label: "Product Catalogue" },
  { href: "/admin/login", label: "Admin" },
]

export function SiteFooter({ logo, contact }: SiteFooterProps) {
  const pathname = usePathname()
  const { main: brandMain, sub: brandSub } = brandParts(logo?.text)
  const brand = brandSub ? `${brandMain} ${brandSub}` : brandMain
  const logoSrc = logo?.image || "/logo.jpeg"
  const year = new Date().getFullYear()

  // The admin panel has its own chrome — hide the public footer there.
  if (pathname.startsWith("/admin")) return null

  // Phone field may hold several comma-separated numbers — render each as a tel: link.
  const phones = (contact?.phone || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <footer className="relative overflow-hidden bg-brand-gradient text-white">
      {/* Decorative glows for depth */}
      <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden>
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 right-0 w-[28rem] h-[28rem] rounded-full bg-white/10 blur-3xl" />
      </div>
      {/* Logo watermark */}
      <div
        className="pointer-events-none absolute -bottom-10 -right-6 -z-0 select-none opacity-[0.06] sm:bottom-0 sm:right-6"
        aria-hidden
      >
        <Image
          src={logoSrc}
          alt=""
          width={420}
          height={420}
          className="h-56 w-56 object-contain brightness-0 invert sm:h-80 sm:w-80"
        />
      </div>
      {/* Bright top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-5 w-fit group">
              <span className="rounded-xl bg-white p-1.5 shadow-lg shadow-black/10 ring-1 ring-white/40 transition-transform group-hover:scale-105">
                <Image
                  src={logoSrc}
                  alt={brand}
                  width={40}
                  height={40}
                  className="w-9 h-9 object-contain rounded-lg"
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-bold text-lg leading-tight">{brandMain}</span>
                {brandSub && (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
                    {brandSub}
                  </span>
                )}
              </span>
            </Link>
            <p className="text-white/85 text-sm leading-relaxed max-w-xs">
              Delivering trust through quality healthcare. WHO-GMP certified pharmaceutical products for a healthier
              tomorrow.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              WHO-GMP Certified
            </span>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
                  >
                    <span className="transition-transform group-hover:translate-x-0.5">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
                  >
                    <span className="transition-transform group-hover:translate-x-0.5">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Get in Touch</h4>
            <ul className="space-y-3.5 text-sm">
              {contact?.address && (
                <li className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 shrink-0 rounded-lg bg-white/15 p-1.5 ring-1 ring-white/20">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <span className="leading-relaxed">{contact.address}</span>
                </li>
              )}
              {phones.length > 0 && (
                <li className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 shrink-0 rounded-lg bg-white/15 p-1.5 ring-1 ring-white/20">
                    <Phone className="w-4 h-4" />
                  </span>
                  <span className="flex flex-wrap gap-x-2 leading-relaxed">
                    {phones.map((num, i) => (
                      <a
                        key={num}
                        href={`tel:${num.replace(/\s+/g, "")}`}
                        className="hover:text-white transition-colors whitespace-nowrap"
                      >
                        {num}
                        {i < phones.length - 1 ? "," : ""}
                      </a>
                    ))}
                  </span>
                </li>
              )}
              {contact?.email && (
                <li className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 shrink-0 rounded-lg bg-white/15 p-1.5 ring-1 ring-white/20">
                    <Mail className="w-4 h-4" />
                  </span>
                  <a
                    href={`mailto:${contact.email}`}
                    className="hover:text-white transition-colors break-all"
                  >
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-lg shadow-black/10 transition-transform hover:scale-105"
            >
              Become a Partner
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="border-t border-white/15 mt-12 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="text-sm text-white/80">&copy; {year} {brand}. All rights reserved.</p>
          <p className="text-xs text-white/70">
            Manufactured at WHO-GMP certified facilities under strict quality control.
          </p>
        </div>
      </div>
    </footer>
  )
}
