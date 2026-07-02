"use server"

import { cookies } from "next/headers"

// Credentials come from environment variables in production. The literals are
// only a local-dev fallback — set ADMIN_USERNAME / ADMIN_PASSWORD in the Vercel
// project (and rotate the password) so they are never shipped in the bundle.
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Vipul@1124"
const AUTH_COOKIE = "admin_authenticated"
// The cookie stores an unguessable token, not a literal "true": a hard-coded
// "true" can be forged by anyone who sets the cookie by hand, bypassing every
// admin check. Comparing against a secret means a forged cookie cannot pass.
// Set ADMIN_SESSION_SECRET in the Vercel project for a rotatable secret.
const AUTH_TOKEN = process.env.ADMIN_SESSION_SECRET || `hd-session-${ADMIN_PASSWORD}`

export async function loginAdmin(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const cookieStore = await cookies()
    cookieStore.set(AUTH_COOKIE, AUTH_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    })
    return { success: true }
  }

  return { success: false, error: "Invalid username or password" }
}

export async function logoutAdmin() {
  const cookieStore = await cookies()
  cookieStore.delete(AUTH_COOKIE)
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const authCookie = cookieStore.get(AUTH_COOKIE)
  return authCookie?.value === AUTH_TOKEN
}
