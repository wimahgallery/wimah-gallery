"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { siteConfig, packages, faqs } from "@/lib/config"

interface User {
  email: string
  role: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized")
        return res.json()
      })
      .then((data) => setUser(data.user))
      .catch(() => router.push("/admin/login"))
  }, [router])

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-sm text-[#8D8A82]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl text-[#54524D]">Dashboard</h1>
        <p className="mt-1 text-sm text-[#8D8A82]">
          Welcome back, {user.email}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Site"
          value={siteConfig.name}
          description="Your photobooth business"
        />
        <StatCard
          label="Packages"
          value={`${packages.length}`}
          description="Active pricing packages"
        />
        <StatCard
          label="FAQ Items"
          value={`${faqs.length}`}
          description="Frequently asked questions"
        />
      </div>

      <div className="rounded-xl border border-[rgba(84,82,77,0.12)] bg-white p-6">
        <h2 className="mb-4 font-heading text-lg text-[#54524D]">Quick Links</h2>
        <div className="space-y-2">
          <QuickLink href="/" label="View live site" />
          <QuickLink href={siteConfig.whatsappLink} label="WhatsApp business" external />
          <QuickLink href={siteConfig.instagram} label="Instagram profile" external />
        </div>
      </div>
    </div>
  )
}

function StatCard({
  label,
  value,
  description,
}: {
  label: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-xl border border-[rgba(84,82,77,0.12)] bg-white p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-[#8D8A82]">{label}</p>
      <p className="mt-2 font-heading text-xl text-[#54524D]">{value}</p>
      <p className="mt-1 text-xs text-[#8D8A82]">{description}</p>
    </div>
  )
}

function QuickLink({
  href,
  label,
  external,
}: {
  href: string
  label: string
  external?: boolean
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-2 rounded-lg border border-[rgba(84,82,77,0.12)] px-4 py-2.5 text-sm text-[#54524D] transition-colors hover:border-[#7C8472] hover:bg-[#7C8472]/5"
    >
      {label}
      {external && (
        <svg className="ml-auto h-3.5 w-3.5 text-[#8D8A82]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )}
    </a>
  )
}
