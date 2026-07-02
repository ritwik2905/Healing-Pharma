"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  MessageCircle,
} from "lucide-react"
import { brandParts } from "@/lib/utils"

interface SiteFooterProps {
  logo?: { text: string; image: string }
  contact?: { address?: string; phone?: string; email?: string }
  social?: {
    facebook?: string
    instagram?: string
    youtube?: string
    linkedin?: string
    twitter?: string
    whatsapp?: string
  }
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
  { href: "/products", label: "Catalogue" },
]

export function SiteFooter({ logo, contact, social }: SiteFooterProps) {
  const pathname = usePathname()
  const { main: brandMain, sub: brandSub } = brandParts(logo?.text)
  const brand = brandSub ? `${brandMain} ${brandSub}` : brandMain
  const logoSrc = logo?.image || "/logo.jpeg"
  const year = new Date().getFullYear()

  // The admin panel has its own chrome — hide the public footer there.
  if (pathname.startsWith("/admin")) return null

  const phones = (contact?.phone || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)

  // An admin may paste a bare handle ("healingdoc"), a scheme-less domain
  // ("facebook.com/healingdoc") or, for WhatsApp, just a phone number. Without a
  // scheme the browser resolves these relative to the current page and 404s, so
  // normalise every value into an absolute URL before it becomes an href.
  const normalizeSocialHref = (label: string, value: string) => {
    const v = value.trim()
    if (/^https?:\/\//i.test(v)) return v
    if (label === "WhatsApp") {
      const digits = v.replace(/[^\d]/g, "")
      if (digits) return `https://wa.me/${digits}`
    }
    return `https://${v.replace(/^\/+/, "")}`
  }

  const socialLinks = [
    { href: social?.facebook, label: "Facebook", icon: Facebook },
    { href: social?.instagram, label: "Instagram", icon: Instagram },
    { href: social?.youtube, label: "YouTube", icon: Youtube },
    { href: social?.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: social?.twitter, label: "X", icon: Twitter },
    { href: social?.whatsapp, label: "WhatsApp", icon: MessageCircle },
  ]
    .filter((s): s is { href: string; label: string; icon: typeof Facebook } => Boolean(s.href && s.href.trim()))
    .map((s) => ({ ...s, href: normalizeSocialHref(s.label, s.href) }))

  return (
    <footer className="relative overflow-hidden bg-[#0b1b3c] text-white">
      {/* Logo watermark — large, centred, faint */}
      <div
        className="pointer-events-none absolute inset-0 -z-0 flex items-center justify-center overflow-hidden"
        aria-hidden
      >
        <Image
          src={logoSrc}
          alt=""
          width={760}
          height={760}
          className="w-[min(82%,600px)] max-w-none object-contain opacity-[0.04] brightness-0 invert"
        />
      </div>
      {/* Bright top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-12 md:gap-6">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="group flex w-fit items-center gap-3">
              <span className="rounded-xl bg-white p-1.5 ring-1 ring-white/30 transition-transform group-hover:scale-105">
                <Image src={logoSrc} alt={brand} width={40} height={40} className="h-9 w-9 rounded-lg object-contain" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-lg font-bold leading-tight">{brandMain}</span>
                {brandSub && (
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">{brandSub}</span>
                )}
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Delivering trust through quality healthcare — WHO-GMP certified medicines for a healthier tomorrow.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/15">
              <ShieldCheck className="h-3.5 w-3.5" />
              WHO-GMP Certified
            </span>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white/90">Company</h4>
            <ul className="space-y-2 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white/90">Resources</h4>
            <ul className="space-y-2 text-sm">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-white/70 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-white/90">Get in Touch</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              {contact?.address && (
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
                  <span className="leading-relaxed">{contact.address}</span>
                </li>
              )}
              {phones.length > 0 && (
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
                  <span className="flex flex-wrap gap-x-2">
                    {phones.map((num) => (
                      <a key={num} href={`tel:${num.replace(/\s+/g, "")}`} className="whitespace-nowrap hover:text-white">
                        {num}
                      </a>
                    ))}
                  </span>
                </li>
              )}
              {contact?.email && (
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
                  <a href={`mailto:${contact.email}`} className="break-all hover:text-white">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar: copyright + social */}
        <div className="mt-9 flex flex-col items-center gap-4 border-t border-white/12 pt-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-white/60">
            &copy; {year} {brand}. All rights reserved.
          </p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/90 ring-1 ring-white/15 transition-all hover:scale-105 hover:bg-white hover:text-[#0b1b3c]"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
