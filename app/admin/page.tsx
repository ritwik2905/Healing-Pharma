import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminDashboard } from "@/components/admin-dashboard"
import { getInquiries } from "@/lib/inquiry-actions"
import { getProducts } from "@/lib/product-actions"
import { getTestimonials } from "@/lib/testimonial-actions"
import { getBlogPosts } from "@/lib/blog-actions"

export const metadata = {
  title: "Admin Panel - Healingdoc Pharma",
  description: "Manage products and inventory",
}

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  const [products, inquiries, testimonials, blogPosts] = await Promise.all([
    getProducts(),
    getInquiries(),
    getTestimonials(),
    getBlogPosts({ includeUnpublished: true }),
  ])

  return (
    <main className="min-h-screen bg-background">
      <AdminDashboard
        products={products}
        inquiries={inquiries}
        testimonials={testimonials}
        blogPosts={blogPosts}
      />
    </main>
  )
}
