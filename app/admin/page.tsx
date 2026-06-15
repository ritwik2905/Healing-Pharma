import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminDashboard } from "@/components/admin-dashboard"
import { getInquiries } from "@/lib/inquiry-actions"
import { getProducts } from "@/lib/product-actions"
import { getTestimonials } from "@/lib/testimonial-actions"
import { getBlogPosts } from "@/lib/blog-actions"
import { getCategories } from "@/lib/category-actions"

export const metadata = {
  title: "Admin Panel - Healingdoc Pharma",
  description: "Manage products and inventory",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  const [products, inquiries, testimonials, blogPosts, categories] = await Promise.all([
    getProducts(),
    getInquiries(),
    getTestimonials(),
    getBlogPosts({ includeUnpublished: true }),
    getCategories(),
  ])

  return (
    <main className="min-h-screen bg-background">
      <AdminDashboard
        products={products}
        inquiries={inquiries}
        testimonials={testimonials}
        blogPosts={blogPosts}
        categories={categories}
      />
    </main>
  )
}
