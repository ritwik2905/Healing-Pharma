"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
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
  { href: "/products", label: "Product Catalogue" },
  { href: "/admin/login", label: "Admin" },
]

export function SiteFooter({ logo, contact, social }: SiteFooterProps) {
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

  const socialLinks = [
    { href: social?.facebook, label: "Facebook", icon: Facebook },
    { href: social?.instagram, label: "Instagram", icon: Instagram },
    { href: social?.youtube, label: "YouTube", icon: Youtube },
    { href: social?.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: social?.twitter, label: "X", icon: Twitter },
    { href: social?.whatsapp, label: "WhatsApp", icon: MessageCircle },
  ].filter((s): s is { href: string; label: string; icon: typeof Facebook } => Boolean(s.href && s.href.trim()))

  return (
    <footer className="relative overflow-hidden bg-brand-gradient text-white">
      {/* Logo watermark — large, centred, behind everything */}
      <div className="pointer-events-none absolute inset-0 -z-0 flex items-center justify-center overflow-hidden" aria-hidden>
        <Image
          src={logoSrc}
          alt=""
          width={900}
          height={900}
          className="w-[min(94%,760px)] max-w-none object-contain opacity-[0.05] brightness-0 invert"
        />
      </div>
      {/* Decorative glow for depth */}
      <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden>
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>
      {/* Bright top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top ribbon: brand + social + CTA */}
        <div className="flex flex-col gap-6 border-b border-white/15 py-10 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="group flex w-fit items-center gap-3">
            <span className="rounded-xl bg-white p-1.5 shadow-lg shadow-black/10 ring-1 ring-white/40 transition-transform group-hover:scale-105">
              <Image src={logoSrc} alt={brand} width={44} height={44} className="h-10 w-10 rounded-lg object-contain" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-xl font-bold leading-tight">{brandMain}</span>
              {brandSub && (
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/75">{brandSub}</span>
              )}
            </span>
          </Link>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2.5">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white hover:text-primary"
                  >
                    <s.icon className="h-[18px] w-[18px]" />
                  </a>
                ))}
              </div>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-primary shadow-lg shadow-black/10 transition-transform hover:scale-105"
            >
              Become a Partner
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand blurb */}
          <div className="lg:col-span-4">
            <p className="max-w-xs text-sm leading-relaxed text-white/85">
              Delivering trust through quality healthcare. WHO-GMP certified pharmaceutical products for a healthier
              tomorrow.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              WHO-GMP Certified
            </span>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
                  >
                    <span className="transition-transform group-hover:translate-x-0.5">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              {RESOURCE_LINKS.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
                  >
                    <span className="transition-transform group-hover:translate-x-0.5">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Get in Touch</h4>
            <ul className="space-y-3.5 text-sm">
              {contact?.address && (
                <li className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 shrink-0 rounded-lg bg-white/15 p-1.5 ring-1 ring-white/20">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span className="leading-relaxed">{contact.address}</span>
                </li>
              )}
              {phones.length > 0 && (
                <li className="flex items-start gap-3 text-white/85">
                  <span className="mt-0.5 shrink-0 rounded-lg bg-white/15 p-1.5 ring-1 ring-white/20">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span className="flex flex-wrap gap-x-2 leading-relaxed">
                    {phones.map((num, i) => (
                      <a
                        key={num}
                        href={`tel:${num.replace(/\s+/g, "")}`}
                        className="whitespace-nowrap transition-colors hover:text-white"
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
                    <Mail className="h-4 w-4" />
                  </span>
                  <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-white">
                    {contact.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/15 py-7 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-white/80">
            &copy; {year} {brand}. All rights reserved.
          </p>
          <p className="text-xs text-white/70">Manufactured at WHO-GMP certified facilities under strict quality control.</p>
        </div>
      </div>
    </footer>
  )
}
