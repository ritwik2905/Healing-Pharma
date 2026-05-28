import { Building2, Hospital, Globe, ShoppingCart, Shield, Award, Users, Package, type LucideIcon } from "lucide-react"

export type ThemeColor = "primary" | "accent" | "success" | "warning"

// Full class strings so Tailwind's scanner always generates them (no dynamic interpolation).
export const COLOR_CLASSES: Record<ThemeColor, { softBg: string; text: string; solidBg: string }> = {
  primary: { softBg: "bg-primary/10", text: "text-primary", solidBg: "bg-primary" },
  accent: { softBg: "bg-accent/10", text: "text-accent", solidBg: "bg-accent" },
  success: { softBg: "bg-success/10", text: "text-success", solidBg: "bg-success" },
  warning: { softBg: "bg-warning/10", text: "text-warning", solidBg: "bg-warning" },
}

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  color: ThemeColor
}

export const FEATURES: Feature[] = [
  {
    icon: Shield,
    title: "Quality Assured",
    description: "All products meet stringent WHO-GMP quality standards and regulations.",
    color: "primary",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    description: "Manufactured at WHO-GMP compliant facilities with strict quality control.",
    color: "accent",
  },
  {
    icon: Users,
    title: "Trusted Partner",
    description: "Serving doctors, distributors and institutions across India.",
    color: "success",
  },
  {
    icon: Package,
    title: "Wide Range",
    description: "A growing portfolio covering pain relief, anti-infectives, derma and more.",
    color: "warning",
  },
]

export interface Service {
  icon: LucideIcon
  title: string
  description: string
  image: string
  color: ThemeColor
  points: string[]
}

export const SERVICES: Service[] = [
  {
    icon: Building2,
    title: "Government Supplies",
    description:
      "An approved vendor for government healthcare programs, providing reliable pharmaceutical supplies to public health institutions across the country.",
    image: "/government-building-healthcare.jpg",
    color: "primary",
    points: [
      "Tender participation and fulfillment",
      "Timely delivery to government facilities",
      "Compliance with all regulatory requirements",
    ],
  },
  {
    icon: Hospital,
    title: "Institutional Sales",
    description:
      "Partnering with hospitals, clinics, and healthcare facilities to provide bulk pharmaceutical supplies with competitive pricing and consistent quality.",
    image: "/hospital-healthcare-institution.jpg",
    color: "accent",
    points: [
      "Bulk order discounts and flexible payment terms",
      "Dedicated account management",
      "Regular stock availability assurance",
    ],
  },
  {
    icon: Globe,
    title: "GEM Registered",
    description:
      "Registered on the Government e-Marketplace (GeM) portal, enabling seamless procurement for government departments and PSUs.",
    image: "/gem-portal-ecommerce-platform.jpg",
    color: "success",
    points: [
      "Direct procurement through GeM portal",
      "Transparent pricing and quick order processing",
      "Verified seller with quality certifications",
    ],
  },
  {
    icon: ShoppingCart,
    title: "General Trade",
    description:
      "Supplying to retail pharmacies, medical stores, and distributors with efficient logistics and comprehensive product support.",
    image: "/pharmacy-retail-store-medicine.jpg",
    color: "warning",
    points: [
      "Wide distribution network coverage",
      "Marketing and promotional support",
      "Competitive margins for retail partners",
    ],
  },
]
