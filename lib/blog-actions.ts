"use server"

import { revalidatePath } from "next/cache"
import { isAdminAuthenticated } from "./admin-auth"
import { db } from "./db"
import { blogPosts } from "./schema"
import { eq, desc } from "drizzle-orm"

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  author: string
  category: string
  published: boolean
  createdAt: string
}

function mapRow(r: typeof blogPosts.$inferSelect): BlogPost {
  return {
    id: r.id.toString(),
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    coverImage: r.coverImage,
    author: r.author,
    category: r.category,
    published: r.published,
    createdAt: r.createdAt ? r.createdAt.toISOString() : new Date().toISOString(),
  }
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
}

export async function getBlogPosts(options?: { includeUnpublished?: boolean }): Promise<BlogPost[]> {
  try {
    const rows = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt))
    const posts = rows.map(mapRow)
    return options?.includeUnpublished ? posts : posts.filter((p) => p.published)
  } catch (error) {
    console.error("Failed to fetch blog posts:", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const rows = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug))
    if (rows.length === 0) return null
    return mapRow(rows[0])
  } catch (error) {
    console.error("Failed to fetch blog post:", error)
    return null
  }
}

export async function addBlogPost(
  data: Omit<BlogPost, "id" | "createdAt">,
): Promise<{ success: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) return { success: false, error: "Unauthorized" }
  try {
    const slug = data.slug ? slugify(data.slug) : slugify(data.title)
    await db.insert(blogPosts).values({
      slug,
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      author: data.author,
      category: data.category,
      published: data.published,
    })
    revalidatePath("/blog")
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Failed to add blog post:", error)
    return { success: false, error: "Failed to add blog post (slug may already exist)" }
  }
}

export async function updateBlogPost(
  id: string,
  data: Omit<BlogPost, "id" | "createdAt">,
): Promise<{ success: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) return { success: false, error: "Unauthorized" }
  try {
    const slug = data.slug ? slugify(data.slug) : slugify(data.title)
    await db
      .update(blogPosts)
      .set({
        slug,
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        coverImage: data.coverImage,
        author: data.author,
        category: data.category,
        published: data.published,
      })
      .where(eq(blogPosts.id, parseInt(id)))
    revalidatePath("/blog")
    revalidatePath(`/blog/${slug}`)
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Failed to update blog post:", error)
    return { success: false, error: "Failed to update blog post (slug may already exist)" }
  }
}

export async function deleteBlogPost(id: string): Promise<{ success: boolean; error?: string }> {
  if (!(await isAdminAuthenticated())) return { success: false, error: "Unauthorized" }
  try {
    await db.delete(blogPosts).where(eq(blogPosts.id, parseInt(id)))
    revalidatePath("/blog")
    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    console.error("Failed to delete blog post:", error)
    return { success: false, error: "Failed to delete blog post" }
  }
}
