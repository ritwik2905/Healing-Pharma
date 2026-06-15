import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { SiteFooter } from "@/components/site-footer"
import { InitialLoader } from "@/components/initial-loader"
import { RouteProgress } from "@/components/route-progress"
import { getSiteSettings } from "@/lib/site-settings-actions"
import { siteConfig, absoluteUrl } from "@/lib/seo"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.legalName} — Quality Healthcare Solutions`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "Health",
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, address: true, email: true },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.legalName} — Quality Healthcare Solutions`,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.legalName }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.legalName} — Quality Healthcare Solutions`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1e6fe0" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSiteSettings()
  const logo = settings?.logo || { text: "Healingdoc Pharma", image: "/logo.jpeg" }
  const contact = settings?.contact
  const social = settings?.social

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    alternateName: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.jpeg"),
    description: siteConfig.description,
    ...(contact?.address && {
      address: { "@type": "PostalAddress", streetAddress: contact.address, addressCountry: "IN" },
    }),
    ...(contact?.phone && {
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contact.phone.split(",")[0].trim(),
        contactType: "customer service",
        ...(contact.email && { email: contact.email }),
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    }),
  }

  return (
    <html lang="en">
      <body className={`font-sans antialiased flex min-h-screen flex-col`}>
        {/* Fixed brand-tinted gradient mesh behind everything — gives the
            frosted-glass surfaces a colourful backdrop to blur against. */}
        <div className="site-bg" aria-hidden="true" />
        <RouteProgress />
        <InitialLoader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <Navigation logo={logo} />
        <div className="flex-1">{children}</div>
        <SiteFooter logo={logo} contact={contact} social={social} />
        <Analytics />
      </body>
    </html>
  )
}
