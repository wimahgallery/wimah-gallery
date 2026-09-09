"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" })
    router.push("/admin/login")
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
