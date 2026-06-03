import type { Metadata } from "next"

// Set NEXT_PUBLIC_SITE_URL in the environment (e.g. on Vercel) to your real
// production domain. The fallback is derived from the company email domain.
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.healingdocpharma.com"

export const siteConfig = {
  name: "Healingdoc Pharma",
  legalName: "Healingdoc Pharma Pvt. Ltd.",
  url: rawUrl.replace(/\/$/, ""),
  description:
    "Healingdoc Pharma Pvt. Ltd. is a WHO-GMP certified pharmaceutical company delivering quality, affordable and innovative medicines across India — covering pain relief, anti-infectives, dermatology, gastro, respiratory care and nutraceuticals.",
  ogImage: "/modern-pharmacy-healthcare-professional.jpg",
  keywords: [
    "Healingdoc Pharma",
    "pharmaceutical company India",
    "WHO-GMP medicines",
    "pharma distributor",
    "government pharmaceutical supplies",
    "GEM registered pharma",
    "PCD pharma franchise",
    "quality affordable medicines",
  ],
}

export function absoluteUrl(path = "/"): string {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`
}

/** Build consistent per-page metadata (title, description, canonical, OG, Twitter). */
export function pageMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}): Metadata {
  const canonical = absoluteUrl(path)
  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: siteConfig.name,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}
