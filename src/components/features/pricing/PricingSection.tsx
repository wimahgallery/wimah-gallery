"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/lib/config";
import { Star, Crown, Zap, ChevronDown, Check } from "lucide-react";
import { WhatsApp } from "@/components/ui/WhatsAppIcon";
import { usePublicPricing } from "@/hooks/queries/use-pricing";
import type { PricingPackage } from "@/types";

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  {
    key: "file_only",
    label: "File Only",
    icon: Zap,
    desc: "Digital gallery & softcopy",
  },
  {
    key: "limited_print",
    label: "Limited Print",
    icon: Star,
    desc: "Limited prints included",
  },
  {
    key: "unlimited_print",
    label: "Unlimited Print",
    icon: Crown,
    desc: "Unlimited prints",
  },
] as const;

type TabKey = (typeof TABS)[number]["key"];

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
  "Transport gratis tersedia untuk area tertentu sesuai radius layanan kami",
  "Gratis desain template & watermark custom",
  "Sistem photobooth modern, cepat, dan lancar",
  "Aksesoris foto lucu seperti kacamata dan kata-kata lucu",
];

const typeLabels: Record<string, string> = {
  file_only: "File Only",
  limited_print: "Limited Print",
  unlimited_print: "Unlimited Print",
};

function formatPrice(price: number) {
  return `Rp ${price.toLocaleString("id-ID")}`;
}

function PackageCard({ pkg, index }: { pkg: PricingPackage; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: { trigger: ref.current, start: "top 90%", once: true },
        },
      );
    }, ref);
    return () => ctx.revert();
  }, [index]);

  const hasDiscount = pkg.discount > 0;

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border p-2.5 sm:p-4 lg:p-5 transition-[transform,colors] duration-500 hover:scale-[1.02] active:scale-[0.98] ${
        pkg.favorite
          ? "border-[#D4A853]/40 bg-surface shadow-[0_8px_32px_rgba(212,168,83,0.12)] hover:border-[#D4A853]/60 hover:shadow-[0_12px_40px_rgba(212,168,83,0.18)]"
          : "border-border bg-surface hover:border-accent/20 hover:bg-surface-secondary hover:shadow-[0_8px_32px_rgba(124,132,114,0.06)]"
      }`}
    >
      {pkg.favorite && (
        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#D4A853] text-background shadow-md z-10">
          <Star className="h-3 w-3" fill="currentColor" />
        </div>
      )}
      {pkg.favorite && (
        <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-[#D4A853]/10 px-2 py-0.5">
          <Star className="h-2.5 w-2.5 text-[#D4A853]" fill="currentColor" />
          <span className="text-[9px] font-semibold tracking-wide uppercase text-[#D4A853]">
            Favorite
          </span>
        </div>
      )}

      <h3 className="mb-0.5 font-heading text-sm sm:text-base lg:text-lg font-normal text-text-primary">
        {pkg.hours} Hours
      </h3>
      {pkg.print_count_limit != null && (
        <p className="mb-1.5 sm:mb-3 text-[10px] sm:text-xs text-text-secondary">
          {pkg.print_count_limit} prints
        </p>
      )}
      {pkg.print_count_limit == null && <div className="mb-1.5 sm:mb-3" />}

      <div className="mb-2 sm:mb-4">
        {hasDiscount ? (
          <div className="flex flex-wrap items-baseline gap-1">
            <span className="text-[10px] sm:text-xs text-text-secondary line-through">
              {formatPrice(pkg.price)}
            </span>
            <span className="font-heading text-base sm:text-xl lg:text-2xl font-normal tracking-tight text-accent">
              {formatPrice(pkg.discounted_price)}
            </span>
            <span className="rounded-full bg-accent/10 px-1.5 py-0.5 text-[8px] sm:text-[10px] font-medium text-accent">
              -{pkg.discount}%
            </span>
          </div>
        ) : (
          <span className="font-heading text-base sm:text-xl lg:text-2xl font-normal tracking-tight text-text-primary">
            {formatPrice(pkg.price)}
          </span>
        )}
      </div>

      <a
        href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik dengan paket ${typeLabels[pkg.type] || pkg.type} (${pkg.hours}h) dari WIMAH Photobooth.`}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex w-full items-center justify-center gap-1.5 rounded-lg border py-1.5 sm:py-2.5 text-[10px] sm:text-xs font-semibold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          pkg.favorite
            ? "border-[#D4A853]/30 bg-[#D4A853]/10 text-[#D4A853] hover:bg-[#D4A853]/20 hover:border-[#D4A853]/50 hover:shadow-[0_4px_20px_rgba(212,168,83,0.15)]"
            : "border-border bg-background text-text-primary hover:border-accent/30 hover:bg-accent/5 hover:shadow-[0_4px_20px_rgba(124,132,114,0.1)]"
        }`}
      >
        <WhatsApp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
        Book via WhatsApp
      </a>
    </div>
  );
}

export default function Pricing() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("file_only");
  const [openDropdown, setOpenDropdown] = useState(false);

  const { data: response, isLoading, isError } = usePublicPricing();

  const allPackages = response?.data ?? [];
  const visiblePackages = allPackages.filter((p) => p.visible);
  const filteredPackages = visiblePackages.filter((p) => p.type === activeTab);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!titleRef.current) return;
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, titleRef);
    return () => ctx.revert();
  }, []);

  const activeTabData = TABS.find((t) => t.key === activeTab)!;

  return (
    <section
      id="pricing"
      className="relative py-10 sm:py-20 lg:py-32 texture-diagonal"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
      <div className="absolute inset-0 bg-accent/5 blur-3xl" />
      <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-6 sm:mb-16 text-center">
          <p className="mb-2 sm:mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
            Packages
          </p>
          <h2 className="mb-3 sm:mb-6 font-heading text-[24px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
            Simple, transparent{" "}
            <span className="font-elegant italic text-accent">pricing</span>
          </h2>
          <p className="mx-auto max-w-[480px] text-xs sm:text-base text-text-secondary leading-relaxed">
            Choose the perfect package for your event.
          </p>
        </div>

        {/* Dropdown selector */}
        <div className="mb-5 sm:mb-12 flex justify-center">
          <div className="relative w-full max-w-md">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex w-full items-center justify-between gap-3 rounded-xl sm:rounded-2xl border border-border bg-surface px-3 sm:px-6 py-2.5 sm:py-4 text-left backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-surface"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <activeTabData.icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium text-text-primary">
                    {activeTabData.label}
                  </p>
                  <p className="text-[10px] sm:text-xs text-text-secondary">
                    {activeTabData.desc}
                  </p>
                </div>
              </div>
              <ChevronDown
                className={`h-3.5 w-3.5 sm:h-5 sm:w-5 text-text-secondary transition-transform duration-300 ${openDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {openDropdown && (
              <div className="absolute top-full left-0 z-50 mt-2 w-full overflow-hidden rounded-xl sm:rounded-2xl border border-border bg-surface shadow-[0_16px_48px_rgba(0,0,0,0.12)]">
                {TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = tab.key === activeTab;
                  const count = visiblePackages.filter(
                    (p) => p.type === tab.key,
                  ).length;
                  return (
                    <button
                      key={tab.key}
                      onClick={() => {
                        setActiveTab(tab.key);
                        setOpenDropdown(false);
                      }}
                      className={`flex w-full items-center gap-3 px-3 sm:px-6 py-2.5 sm:py-4 text-left transition-colors duration-200 ${isActive ? "bg-accent/10 text-accent" : "text-text-primary hover:bg-surface-secondary/50"}`}
                    >
                      <div
                        className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl ${isActive ? "bg-accent/15 text-accent" : "bg-surface-secondary/50 text-text-secondary"}`}
                      >
                        <Icon className="h-3.5 w-3.5 sm:h-5 sm:w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium">
                          {tab.label}
                        </p>
                        <p className="text-[10px] sm:text-xs text-text-secondary">
                          {tab.desc}
                        </p>
                      </div>
                      <span className="text-[10px] sm:text-xs text-text-secondary">
                        {count} {count === 1 ? "pkg" : "pkgs"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Packages grid */}
        {isLoading ? (
          <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl bg-[#E8E3D8]/30 h-40 sm:h-52"
              />
            ))}
          </div>
        ) : isError ? (
          <div className="py-10 sm:py-16 text-center">
            <p className="text-xs sm:text-sm text-text-secondary">
              Failed to load. Please try again.
            </p>
          </div>
        ) : filteredPackages.length === 0 ? (
          <div className="py-10 sm:py-16 text-center">
            <p className="text-xs sm:text-sm text-text-secondary">
              No packages available for this category.
            </p>
          </div>
        ) : (
          <div className="grid gap-2 sm:gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {filteredPackages.map((pkg, i) => (
              <PackageCard key={pkg.id} pkg={pkg} index={i} />
            ))}
          </div>
        )}

        {/* What's Included */}
        <div className="mt-8 sm:mt-20 rounded-2xl sm:rounded-3xl border border-border bg-surface p-4 sm:p-8 lg:p-12">
          <div className="mb-4 sm:mb-8 text-center">
            <p className="mb-1.5 sm:mb-3 text-[10px] sm:text-xs font-medium tracking-[0.2em] uppercase text-accent">
              Every Package
            </p>
            <h3 className="font-heading text-lg sm:text-2xl font-normal text-text-primary">
              What&apos;s Included
            </h3>
          </div>
          <div className="grid gap-1 sm:gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {includedItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-2 sm:gap-3 rounded-lg sm:rounded-xl px-2.5 sm:px-4 py-1.5 sm:py-3"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-accent" />
                <span className="text-[11px] sm:text-sm leading-relaxed text-text-secondary">
                  {item}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 sm:mt-8 text-center text-[10px] sm:text-xs text-text-secondary italic">
            * Paket tidak termasuk Backdrop atau Dekorasi Photo
          </p>
        </div>

        <div className="mt-5 sm:mt-12 text-center">
          <p className="text-xs sm:text-sm text-text-secondary">
            Need a custom package?{" "}
            <a
              href={`${siteConfig.whatsappLink}?text=Halo! Saya ingin konsultasi paket custom dari WIMAH Photobooth.`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-light hover:decoration-accent/50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
