import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navigation } from "@/components/navigation"
import { getSiteSettings } from "@/lib/site-settings-actions"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Healing Doc Pharma - Quality Healthcare Solutions",
  description:
    "Leading pharmaceutical company providing quality medicines and healthcare solutions. Government supplies, institutional sales, GEM registered, and general trade.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSiteSettings()
  const logo = settings?.logo || { text: "Healing Doc Pharma", image: "" }

  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <Navigation logo={logo} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
