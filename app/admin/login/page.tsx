import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { LoginForm } from "@/components/login-form"

export const metadata = {
  title: "Admin Login - Healingdoc Pharma",
  description: "Login to admin panel",
}

export const dynamic = "force-dynamic"

export default async function AdminLoginPage() {
  console.log("Login page accessed")

  const isAuthenticated = await isAdminAuthenticated()
  console.log("Already authenticated:", isAuthenticated)

  if (isAuthenticated) {
    console.log("Already authenticated, redirecting to admin")
    redirect("/admin")
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/5 to-background flex items-center justify-center p-4">
      <LoginForm />
    </main>
  )
}
