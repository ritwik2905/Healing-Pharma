"use server"

import { revalidatePath } from "next/cache"
import { isAdminAuthenticated } from "./admin-auth"
import { db } from "./db"
import { products } from "./schema"
import { eq } from "drizzle-orm"

export interface Product {
  id: string
  name: string
  category: string
  description: string
  detailedDescription: string
  manufactureDate: string
  expiryDate: string
  batchNumber: string
  composition: string
  dosage: string
  image: string
  price: string
  inStock: boolean
}

export async function getProducts(): Promise<Product[]> {
  const rows = await db.select().from(products)
  return rows.map((r) => ({
    id: r.id.toString(),
    name: r.name,
    category: r.category,
    description: r.description,
    detailedDescription: r.detailedDescription,
    manufactureDate: r.manufactureDate,
    expiryDate: r.expiryDate,
    batchNumber: r.batchNumber,
    composition: r.composition,
    dosage: r.dosage,
    image: r.image,
    price: r.price,
    inStock: r.inStock,
  }))
}

export async function getProductById(id: string): Promise<Product | null> {
  const rows = await db.select().from(products).where(eq(products.id, parseInt(id)))
  if (rows.length === 0) return null
  const r = rows[0]
  return {
    id: r.id.toString(),
    name: r.name,
    category: r.category,
    description: r.description,
    detailedDescription: r.detailedDescription,
    manufactureDate: r.manufactureDate,
    expiryDate: r.expiryDate,
    batchNumber: r.batchNumber,
    composition: r.composition,
    dosage: r.dosage,
    image: r.image,
    price: r.price,
    inStock: r.inStock,
  }
}

export async function addProduct(product: Omit<Product, "id">): Promise<{ success: boolean; error?: string }> {
  const isAuthenticated = await isAdminAuthenticated()
  if (!isAuthenticated) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    await db.insert(products).values({
      name: product.name,
      category: product.category,
      description: product.description,
      detailedDescription: product.detailedDescription,
      manufactureDate: product.manufactureDate,
      expiryDate: product.expiryDate,
      batchNumber: product.batchNumber,
      composition: product.composition,
      dosage: product.dosage,
      image: product.image,
      price: product.price,
      inStock: product.inStock,
    })
    revalidatePath("/products")
    revalidatePath("/admin")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Failed to add product:", error)
    return { success: false, error: "Failed to add product" }
  }
}

export async function updateProduct(
  id: string,
  product: Omit<Product, "id">,
): Promise<{ success: boolean; error?: string }> {
  const isAuthenticated = await isAdminAuthenticated()
  if (!isAuthenticated) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    await db
      .update(products)
      .set({
        name: product.name,
        category: product.category,
        description: product.description,
        detailedDescription: product.detailedDescription,
        manufactureDate: product.manufactureDate,
        expiryDate: product.expiryDate,
        batchNumber: product.batchNumber,
        composition: product.composition,
        dosage: product.dosage,
        image: product.image,
        price: product.price,
        inStock: product.inStock,
      })
      .where(eq(products.id, parseInt(id)))
    revalidatePath("/products")
    revalidatePath(`/products/${id}`)
    revalidatePath("/admin")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Failed to update product:", error)
    return { success: false, error: "Failed to update product" }
  }
}

export async function deleteProduct(id: string): Promise<{ success: boolean; error?: string }> {
  const isAuthenticated = await isAdminAuthenticated()
  if (!isAuthenticated) {
    return { success: false, error: "Unauthorized" }
  }

  try {
    await db.delete(products).where(eq(products.id, parseInt(id)))
    revalidatePath("/products")
    revalidatePath("/admin")
    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete product:", error)
    return { success: false, error: "Failed to delete product" }
  }
}
