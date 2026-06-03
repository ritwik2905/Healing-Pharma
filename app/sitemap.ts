import type { MetadataRoute } from "next"
import { absoluteUrl } from "@/lib/seo"
import { getProducts } from "@/lib/product-actions"
import { getBlogPosts } from "@/lib/blog-actions"

export const dynamic = "force-dynamic"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/products"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/testimonials"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ]

  let productRoutes: MetadataRoute.Sitemap = []
  let blogRoutes: MetadataRoute.Sitemap = []

  try {
    const products = await getProducts()
    productRoutes = products.map((p) => ({
      url: absoluteUrl(`/products/${p.id}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }))
  } catch {
    // DB unavailable at generation time — ship static routes only.
  }

  try {
    const posts = await getBlogPosts()
    blogRoutes = posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.createdAt ? new Date(post.createdAt) : now,
      changeFrequency: "monthly",
      priority: 0.6,
    }))
  } catch {
    // ignore
  }

  return [...staticRoutes, ...productRoutes, ...blogRoutes]
}
