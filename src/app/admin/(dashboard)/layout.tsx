"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized")
        return res.json()
      })
      .then(() => setAuthorized(true))
      .catch(() => router.push("/admin/login"))
  }, [router, pathname])

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
  }

  if (!authorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F3EE]">
        <div className="text-sm text-[#8D8A82]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F3EE]">
      <header className="border-b border-[rgba(84,82,77,0.12)] bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link href="/admin" className="font-heading text-lg text-[#54524D]">
            Wimah Gallery
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/admin"
              className={`text-sm transition-colors ${pathname === "/admin" ? "font-medium text-[#54524D]" : "text-[#8D8A82] hover:text-[#54524D]"}`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/testimonials"
              className={`text-sm transition-colors ${pathname === "/admin/testimonials" ? "font-medium text-[#54524D]" : "text-[#8D8A82] hover:text-[#54524D]"}`}
            >
              Testimonials
            </Link>
            <Link
              href="/"
              className="text-sm text-[#8D8A82] transition-colors hover:text-[#54524D]"
            >
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-[rgba(84,82,77,0.12)] px-3 py-1.5 text-sm text-[#8D8A82] transition-colors hover:border-[#7C8472] hover:text-[#54524D]"
            >
              Sign Out
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  )
}
