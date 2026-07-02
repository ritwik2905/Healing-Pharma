"use server"

import { revalidatePath } from "next/cache"
import { db } from "./db"
import { inquiries } from "./schema"
import { eq } from "drizzle-orm"
import { isAdminAuthenticated } from "./admin-auth"

export interface Inquiry {
  id: string
  type: "contact" | "purchase"
  name: string
  email: string
  phone: string
  message: string
  productId?: string
  productName?: string
  timestamp: string
}

export async function getInquiries(): Promise<Inquiry[]> {
  // Inquiries contain customer PII (name, email, phone, message). Only the
  // authenticated admin dashboard may read them.
  if (!(await isAdminAuthenticated())) return []
  const rows = await db.select().from(inquiries)
  return rows.map((r) => ({
    id: r.id.toString(),
    type: r.type as "contact" | "purchase",
    name: r.name,
    email: r.email,
    phone: r.phone,
    message: r.message,
    productId: r.productId ?? undefined,
    productName: r.productName ?? undefined,
    timestamp: r.timestamp ? r.timestamp.toISOString() : new Date().toISOString(),
  }))
}

export async function addInquiry(inquiry: Omit<Inquiry, "id" | "timestamp">) {
  try {
    await db.insert(inquiries).values({
      type: inquiry.type,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      message: inquiry.message,
      productId: inquiry.productId ?? null,
      productName: inquiry.productName ?? null,
    })

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error adding inquiry:", error)
    return { success: false, error: "Failed to save inquiry" }
  }
}

export async function deleteInquiry(id: string) {
  // Deleting an enquiry is an admin-only action; addInquiry stays public so the
  // contact / purchase forms work for anonymous visitors.
  if (!(await isAdminAuthenticated())) return { success: false, error: "Unauthorized" }
  try {
    await db.delete(inquiries).where(eq(inquiries.id, parseInt(id)))

    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Error deleting inquiry:", error)
    return { success: false, error: "Failed to delete inquiry" }
  }
}
