"use server"

import { revalidatePath } from "next/cache"
import { isAdminAuthenticated } from "./admin-auth"
import { db } from "./db"
import { siteSettings, products } from "./schema"
import { eq } from "drizzle-orm"

// Categories are stored as a JSON string[] under a single site_settings row.
// This avoids a schema migration and keeps everything in the table the app
// already uses for editable content.
const KEY = "categories"

async function readStored(): Promise<string[]> {
  const rows = await db.select().from(siteSettings).where(eq(siteSettings.key, KEY))
  if (rows.length === 0) return []
  const value = rows[0].value
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : []
}

async function writeStored(list: string[]) {
  const existing = await db.select().from(siteSettings).where(eq(siteSettings.key, KEY))
  if (existing.length > 0) {
    await db.update(siteSettings).set({ value: list }).where(eq(siteSettings.key, KEY))
  } else {
    await db.insert(siteSettings).values({ key: KEY, value: list })
  }
}

/**
 * The full category list: admin-managed categories unioned with any category
 * already used by a product. The union means existing free-text categories keep
 * working and never silently disappear from the catalogue.
 */
export async function getCategories(): Promise<string[]> {
  try {
    const [stored, productRows] = await Promise.all([
      readStored(),
      db.select({ category: products.category }).from(products),
    ])
    const set = new Set<string>()
    for (const c of stored) if (c?.trim()) set.add(c.trim())
    for (const r of productRows) if (r.category?.trim()) set.add(r.category.trim())
    return Array.from(set).sort((a, b) => a.localeCompare(b))
  } catch (error) {
    console.error("Failed to get categories:", error)
    return []
  }
}

export async function addCategory(name: string): Promise<{ success: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) return { success: false, error: "Unauthorized" }
  const clean = name.trim()
  if (!clean) return { success: false, error: "Category name is required" }

  try {
    const stored = await readStored()
    if (stored.some((c) => c.toLowerCase() === clean.toLowerCase())) {
      return { success: false, error: "Category already exists" }
    }
    await writeStored([...stored, clean])
    revalidatePath("/admin")
    revalidatePath("/products")
    return { success: true }
  } catch (error) {
    console.error("Failed to add category:", error)
    return { success: false, error: "Failed to add category" }
  }
}

export async function deleteCategory(name: string): Promise<{ success: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) return { success: false, error: "Unauthorized" }

  try {
    const stored = await readStored()
    await writeStored(stored.filter((c) => c.toLowerCase() !== name.trim().toLowerCase()))
    revalidatePath("/admin")
    revalidatePath("/products")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete category:", error)
    return { success: false, error: "Failed to delete category" }
  }
}
