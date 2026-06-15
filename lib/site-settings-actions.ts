"use server"

import { revalidatePath } from "next/cache"
import { db } from "./db"
import { siteSettings } from "./schema"
import { eq } from "drizzle-orm"

const DEFAULT_SETTINGS = {
  logo: {
    text: "Healingdoc Pharma",
    image: "",
  },
  hero: {
    title: "Delivering Trust Through Quality Healthcare",
    description:
      "Healingdoc Pharma Private Limited is a rapidly growing pharmaceutical company committed to high-quality, affordable and innovative medicines, manufactured at WHO-GMP certified facilities under strict quality control.",
    image: "/heroes/home-hero.jpg",
    secondaryImage: "/heroes/home-about.jpg",
    video: "",
  },
  directors: [],
  chairman: {
    name: "Mr. Sumen Ranjan Sen Gupta",
    title: "Managing Director",
    initials: "SS",
    description:
      "It gives me immense pleasure to present the product portfolio of Healingdoc Pharma Private Limited. Our company is committed to delivering high-quality, affordable and innovative healthcare solutions with a strong focus on patient well-being and customer satisfaction. We believe that trust, quality and ethical business practices are the foundation of long-term success.",
    image: "/team/managing-director.jpg",
  },
  contact: {
    address: "136, 1st Floor, Block AW, Sanjay Gandhi Transport Nagar, Delhi - 110042",
    phone: "9667949517, 7903521151",
    email: "healingdocpharma@gmail.com",
    fax: "",
    hours: "Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed",
    mapUrl: "",
  },
}

async function getSetting(key: string) {
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, key))
  if (rows.length === 0) return null
  return rows[0].value
}

async function upsertSetting(key: string, value: any) {
  const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, key))
  if (existing.length > 0) {
    await db.update(siteSettings).set({ value }).where(eq(siteSettings.key, key))
  } else {
    await db.insert(siteSettings).values({ key, value })
  }
}

export async function getSiteSettings() {
  try {
    const rows = await db.select().from(siteSettings)
    if (rows.length === 0) {
      return DEFAULT_SETTINGS
    }
    const settings: any = { ...DEFAULT_SETTINGS }
    for (const row of rows) {
      settings[row.key] = row.value
    }
    return settings
  } catch (error) {
    console.error("Error reading site settings:", error)
    return DEFAULT_SETTINGS
  }
}

export async function updateHeroSection(hero: {
  title: string
  description: string
  image: string
  secondaryImage?: string
  video?: string
}) {
  try {
    await upsertSetting("hero", hero)
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating hero section:", error)
    return { success: false, error: "Failed to update hero section" }
  }
}

export async function updateDirectors(data: any) {
  try {
    if (data.directors && data.chairman) {
      await upsertSetting("directors", data.directors)
      await upsertSetting("chairman", data.chairman)
    } else {
      const directors = Array.isArray(data) ? data : data.directors || []
      await upsertSetting("directors", directors)
    }
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error updating directors:", error)
    return { success: false, error: "Failed to update directors" }
  }
}

export async function updateContactInfo(contact: any) {
  try {
    await upsertSetting("contact", contact)
    revalidatePath("/contact")
    return { success: true }
  } catch (error) {
    console.error("Error updating contact info:", error)
    return { success: false, error: "Failed to update contact info" }
  }
}

export async function updateLogo(logo: { text: string; image: string }) {
  try {
    await upsertSetting("logo", logo)
    revalidatePath("/", "layout")
    return { success: true }
  } catch (error) {
    console.error("Error updating logo:", error)
    return { success: false, error: "Failed to update logo" }
  }
}
