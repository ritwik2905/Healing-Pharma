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
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
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
  const logo = settings?.logo || { text: "Healing Doc Pharma", image: "/logo.jpeg" }

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
