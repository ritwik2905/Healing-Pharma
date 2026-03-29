"use server"

import { revalidatePath } from "next/cache"
import { db } from "./db"
import { siteSettings } from "./schema"
import { eq } from "drizzle-orm"

const DEFAULT_SETTINGS = {
  logo: {
    text: "Healing Doc Pharma",
    image: "",
  },
  hero: {
    title: "Quality Healthcare Solutions for Everyone",
    description:
      "Healing Doc Pharma is committed to delivering high-quality pharmaceutical products that improve lives and promote wellness across communities.",
    image: "/modern-pharmacy-healthcare-professional.jpg",
  },
  directors: [],
  chairman: {
    name: "Mr Aryan Chaubey",
    title: "Chairman & Founder",
    description:
      "Mr. Aryan Chaubey is the founder and visionary behind Healing Doc Pharma. With 30+ years of pharmaceutical industry experience, he has established the company as a trusted name in quality healthcare solutions.",
    image: "",
  },
  contact: {
    address: "123 Pharmaceutical Park, Medical District, New Delhi - 110001, India",
    phone: "+91 11 1234 5678",
    email: "info@Healingdocpharma.com",
    fax: "+91 11 1234 5679",
    hours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM\nSunday: Closed",
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

export async function updateHeroSection(hero: { title: string; description: string; image: string }) {
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
