import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { AdminDashboard } from "@/components/admin-dashboard"
import { getInquiries } from "@/lib/inquiry-actions"
import { getProducts } from "@/lib/product-actions"

export const metadata = {
  title: "Admin Panel - Healing Doc Pharma",
  description: "Manage products and inventory",
}

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const isAuthenticated = await isAdminAuthenticated()

  if (!isAuthenticated) {
    redirect("/admin/login")
  }

  const [products, inquiries] = await Promise.all([getProducts(), getInquiries()])

  return (
    <main className="min-h-screen bg-background">
      <AdminDashboard products={products} inquiries={inquiries} />
    </main>
  )
}
