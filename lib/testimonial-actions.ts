"use server"

import { revalidatePath } from "next/cache"
import { isAdminAuthenticated } from "./admin-auth"
import { db } from "./db"
import { testimonials } from "./schema"
import { eq, desc } from "drizzle-orm"

export interface Testimonial {
  id: string
  name: string
  role: string
  message: string
  rating: number
  image: string
  featured: boolean
}

function mapRow(r: typeof testimonials.$inferSelect): Testimonial {
  return {
    id: r.id.toString(),
    name: r.name,
    role: r.role,
    message: r.message,
    rating: r.rating,
    image: r.image,
    featured: r.featured,
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const rows = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt))
    return rows.map(mapRow)
  } catch (error) {
    console.error("Failed to fetch testimonials:", error)
    return []
  }
}

export async function addTestimonial(data: Omit<Testimonial, "id">): Promise<{ success: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) return { success: false, error: "Unauthorized" }
  try {
    await db.insert(testimonials).values({
      name: data.name,
      role: data.role,
      message: data.message,
      rating: data.rating,
      image: data.image,
      featured: data.featured,
    })
    revalidatePath("/testimonials")
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Failed to add testimonial:", error)
    return { success: false, error: "Failed to add testimonial" }
  }
}

export async function updateTestimonial(
  id: string,
  data: Omit<Testimonial, "id">,
): Promise<{ success: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) return { success: false, error: "Unauthorized" }
  try {
    await db
      .update(testimonials)
      .set({
        name: data.name,
        role: data.role,
        message: data.message,
        rating: data.rating,
        image: data.image,
        featured: data.featured,
      })
      .where(eq(testimonials.id, parseInt(id)))
    revalidatePath("/testimonials")
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Failed to update testimonial:", error)
    return { success: false, error: "Failed to update testimonial" }
  }
}

export async function deleteTestimonial(id: string): Promise<{ success: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) return { success: false, error: "Unauthorized" }
  try {
    await db.delete(testimonials).where(eq(testimonials.id, parseInt(id)))
    revalidatePath("/testimonials")
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete testimonial:", error)
    return { success: false, error: "Failed to delete testimonial" }
  }
}
