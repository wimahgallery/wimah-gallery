"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useQuery } from "@tanstack/react-query"
import { siteConfig } from "@/lib/config"
import { Star, Crown, Zap, ChevronDown } from "lucide-react"
import { WhatsApp } from "@/components/whatsapp-icon"

gsap.registerPlugin(ScrollTrigger)

interface PricingPackage {
  id: string
  type: string
  hours: number
  price: number
  discount: number
  discounted_price: number
  print_count_limit: number | null
  sort_order: number
  visible: boolean
}

const TABS = [
  { key: "file_only", label: "File Only", icon: Zap, desc: "Digital gallery & softcopy" },
  { key: "limited_print", label: "Limited Print", icon: Star, desc: "Limited prints included" },
  { key: "unlimited_print", label: "Unlimited Print", icon: Crown, desc: "Unlimited prints" },
] as const

type TabKey = (typeof TABS)[number]["key"]

const includedItems = [
  "Crew Operator Profesional",
  "Alat Box Photobooth",
  "Monitor 24 inch besar untuk live preview & selfie",
  "Kamera Mirrorless hasil foto jernih dan profesional",
  "Printer tercepat 15 detik per lembar (khusus paket print)",
  "Lighting flash studio 400 watt untuk cahaya terang & tajam",
  "Lampu LED tambahan 100 watt untuk cahaya stabil",
  "Sistem photobooth modern, cepat, dan lancar",
  "Gratis scan QR file foto & GIF",
  "Gratis Flashdisk semua File Foto & GIF untuk paket UNLIMITED Print",
  "Transport gratis tersedia untuk area tertentu sesuai radius layanan kami. Kirimkan lokasi anda untuk kami check",
  "Gratis desain template & watermark custom",
  "Sistem photobooth modern, cepat, dan lancar",
  "Aksesoris foto lucu seperti kacamata dan kata-kata lucu",
]

const typeLabels: Record<string, string> = {
  file_only: "File Only",
  limited_print: "Limited Print",
  unlimited_print: "Unlimited Print",
}

function formatPrice(price: number) {
  return `Rp ${price.toLocaleString("id-ID")}`
}

function PackageCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return
      gsap.fromTo(ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: index * 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [index])

  const hasDiscount = pkg.discount > 0

  return (
    <div
      ref={ref}
      className="group relative rounded-3xl border border-border bg-surface/40 p-6 lg:p-8 transition-[transform,colors] duration-500 hover:border-accent/20 hover:bg-surface/60 hover:shadow-[0_8px_32px_rgba(124,132,114,0.06)] hover:scale-[1.02] active:scale-[0.98]"
    >
      <h3 className="mb-2 font-heading text-xl font-normal text-text-primary">{pkg.hours} Hours</h3>
      {pkg.print_count_limit != null && (
        <p className="mb-6 text-xs text-text-secondary">{pkg.print_count_limit} prints</p>
      )}
      {pkg.print_count_limit == null && <div className="mb-6" />}

      <div className="mb-8">
        {hasDiscount ? (
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-sm text-text-secondary line-through">{formatPrice(pkg.price)}</span>
            <span className="font-heading text-3xl font-normal tracking-tight text-accent">{formatPrice(pkg.discounted_price)}</span>
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">-{pkg.discount}%</span>
          </div>
        ) : (
          <span className="font-heading text-3xl font-normal tracking-tight text-text-primary">{formatPrice(pkg.price)}</span>
        )}
      </div>

      <a
        href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik dengan paket ${typeLabels[pkg.type] || pkg.type} (${pkg.hours}h) dari Wimah Gallery.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2.5 rounded-2xl border border-border bg-background/50 py-3.5 text-sm font-semibold text-text-primary transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:shadow-[0_4px_20px_rgba(124,132,114,0.1)] hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
      >
        <WhatsApp className="h-4 w-4" />Book via WhatsApp
      </a>
    </div>
  )
}

export default function Pricing() {
  const titleRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<TabKey>("file_only")
  const [openDropdown, setOpenDropdown] = useState(false)

  const { data: response, isLoading, isError, isFetching } = useQuery({
    queryKey: ["pricing-packages-public"],
    queryFn: async () => {
      const res = await fetch("/api/pricing/packages?limit=50")
      if (!res.ok) throw new Error("Failed to fetch")
      return res.json() as Promise<{ data: PricingPackage[] }>
    },
  })

  const allPackages = response?.data ?? []
  const visiblePackages = allPackages.filter((p) => p.visible)
  const filteredPackages = visiblePackages.filter((p) => p.type === activeTab)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current) return
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: titleRef.current, start: "top 90%", once: true } }
      )
    }, titleRef)
    return () => ctx.revert()
  }, [])

  const activeTabData = TABS.find((t) => t.key === activeTab)!

  return (
    <section id="pricing" className="relative py-20 lg:py-32 texture-diagonal">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
      <div className="absolute inset-0 bg-accent/5 blur-3xl" />
      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div ref={titleRef} className="mb-16 text-center">
          <p className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">Pricing</p>
          <h2 className="mb-6 font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            Simple, transparent <span className="font-elegant italic text-accent">pricing</span>
          </h2>
          <p className="mx-auto max-w-[480px] text-base text-text-secondary leading-relaxed">
            Choose the perfect package for your event. All packages include professional setup and premium equipment.
          </p>
        </div>

        {/* Dropdown selector — mobile & desktop */}
        <div className="mb-12 flex justify-center">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex w-full items-center justify-between gap-3 rounded-2xl border border-border bg-surface/60 px-6 py-4 text-left backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-surface/80"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <activeTabData.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{activeTabData.label}</p>
                  <p className="text-xs text-text-secondary">{activeTabData.desc}</p>
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 text-text-secondary transition-transform duration-300 ${openDropdown ? "rotate-180" : ""}`} />
            </button>

            {openDropdown && (
              <div className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
                {TABS.map((tab) => {
                  const Icon = tab.icon
                  const isActive = tab.key === activeTab
                  const count = visiblePackages.filter((p) => p.type === tab.key).length
                  return (
                    <button
                      key={tab.key}
                      onClick={() => { setActiveTab(tab.key); setOpenDropdown(false) }}
                      className={`flex w-full items-center gap-3 px-6 py-4 text-left transition-colors duration-200 ${isActive ? "bg-accent/10 text-accent" : "text-text-primary hover:bg-surface-secondary/50"}`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isActive ? "bg-accent/15 text-accent" : "bg-surface-secondary/50 text-text-secondary"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{tab.label}</p>
                        <p className="text-xs text-text-secondary">{tab.desc}</p>
                      </div>
                      <span className="text-xs text-text-secondary">{count} {count === 1 ? "pkg" : "pkgs"}</span>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Packages grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-3xl bg-[#E8E3D8]/30 h-72"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="py-16 text-center">
            <p className="text-sm text-text-secondary">Failed to load. Please try again.</p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-text-secondary">No packages available for this category.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {filteredPackages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        )}

        {/* What's Included */}
        <div className="mt-20 rounded-3xl border border-border bg-surface/40 p-8 lg:p-12">
          <div className="mb-8 text-center">
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-accent">Every Package</p>
            <h3 className="font-heading text-2xl font-normal text-text-primary">What&apos;s Included</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {includedItems.map((item, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl px-4 py-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-semibold text-accent">{i + 1}</span>
                <span className="text-sm leading-relaxed text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs text-text-secondary italic">
            * Paket tidak termasuk Backdrop atau Dekorasi Photo
          </p>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-text-secondary">
            Need a custom package?{" "}
            <a href={`${siteConfig.whatsappLink}?text=Halo! Saya ingin konsultasi paket custom dari Wimah Gallery.`} target="_blank" rel="noopener noreferrer" className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-light hover:decoration-accent/50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  )
}
