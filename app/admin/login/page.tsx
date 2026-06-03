import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { LoginForm } from "@/components/login-form"

export const metadata = {
  title: "Admin Login - Healingdoc Pharma",
  description: "Login to admin panel",
  robots: { index: false, follow: false },
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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      {/* Decorative blurred brand blobs — give the frosted card something to refract */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 w-[28rem] h-[28rem] rounded-full bg-accent/30 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-success/20 blur-3xl" />
      </div>
      <LoginForm />
    </main>
  )
}
