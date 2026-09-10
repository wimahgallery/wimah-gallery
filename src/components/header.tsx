"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Menu, X } from "lucide-react";
import { WhatsApp } from "@/components/whatsapp-icon";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRefs = useRef<(HTMLDivElement | HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (headerRef.current) {
          const isScrolled = window.scrollY > 40;
          headerRef.current.classList.toggle("bg-glass/80", isScrolled);
          headerRef.current.classList.toggle("backdrop-blur-xl", isScrolled);
          headerRef.current.classList.toggle("border-b", isScrolled);
          headerRef.current.classList.toggle("border-glass-border", isScrolled);
          headerRef.current.classList.toggle(
            "shadow-[0_1px_24px_rgba(84,82,77,0.08)]",
            isScrolled,
          );
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      const els = navRefs.current.filter(Boolean) as HTMLElement[];
      gsap.fromTo(
        els,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.05,
          duration: 0.4,
          ease: "power2.out",
        },
      );
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const totalItems = siteConfig.navLinks.length + 1;

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] will-change-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        )}
      >
        <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-14 sm:h-16 items-center md:justify-between">
            <Link
              href="#home"
              className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center group"
            >
              <div className="flex w-auto h-14 sm:h-16 items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/wimah.png"
                  width={1024}
                  height={1024}
                  alt="Wimah Gallery"
                  className="h-full w-auto object-contain invert"
                />
              </div>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {siteConfig.navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-body font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 rounded-full bg-accent/[0.06] scale-90 opacity-0 transition-[transform,opacity] duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100" />
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center h-9 w-9 rounded-3xl text-text-secondary transition-colors duration-300 hover:text-accent hover:bg-accent/[0.06]"
                aria-label="Instagram"
              >
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={siteConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center h-9 w-9 rounded-3xl text-text-secondary transition-colors duration-300 hover:text-accent hover:bg-accent/[0.06]"
                aria-label="TikTok"
              >
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .54.04.79.1V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.07 4.8 4.8 0 01-.38-.52z" />
                </svg>
              </a>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center h-9 w-9 rounded-3xl text-text-secondary transition-colors duration-300 hover:text-accent hover:bg-accent/[0.06]"
                aria-label="Facebook"
              >
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href={siteConfig.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center h-9 w-9 rounded-3xl text-text-secondary transition-colors duration-300 hover:text-accent hover:bg-accent/[0.06]"
                aria-label="Threads"
              >
                <svg
                  className="h-[18px] w-[18px]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.34-.776-.963-1.393-1.813-1.8-.203 1.352-.656 2.446-1.353 3.258-.94 1.095-2.159 1.564-3.484 1.498-1.044-.052-1.925-.458-2.607-1.197-.564-.61-.887-1.412-.91-2.266-.022-.85.263-1.67.807-2.333.697-.85 1.752-1.358 3.054-1.484.846-.082 1.658-.045 2.425.11-.14-.777-.464-1.397-.97-1.856-.648-.586-1.512-.88-2.573-.876l.013-.164c1.14-.006 2.158.324 3.02.985.78.6 1.294 1.446 1.535 2.521.842-.266 1.638-.393 2.372-.381 1.143.02 2.152.357 2.995 1.002 1.138.87 1.82 2.155 2.015 3.777.208 1.724-.235 3.27-1.315 4.593C18.162 22.557 15.616 23.976 12.186 24z" />
                </svg>
              </a>
              <a
                href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking WIMAH Photobooth untuk acara saya.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2.5 bg-accent text-background text-sm font-body font-medium rounded-full px-5 py-2 transition-all will-change-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:bg-accent-light hover:shadow-[0_4px_20px_rgba(124,132,114,0.25)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <WhatsApp className="h-4 w-4" />
                Cek Ketersediaan
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex lg:hidden h-10 w-10 items-center justify-center rounded-3xl border border-border text-text-secondary transition-colors duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:border-accent/30 hover:text-accent hover:bg-accent/[0.06]"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5 transition-transform duration-300" />
                ) : (
                  <Menu className="h-5 w-5 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      <div
        className={`fixed inset-0 z-40 bg-accent-dark lg:hidden transition-[opacity] duration-300 ease-out ${mobileOpen ? "opacity-100 backdrop-blur-xl pointer-events-auto" : "opacity-0 backdrop-blur-0 pointer-events-none"}`}
        aria-hidden={!mobileOpen}
      >
        {mobileOpen && (
          <nav className="flex flex-col items-center justify-center h-full gap-2 px-4">
            {siteConfig.navLinks.map((item, i) => (
              <div
                key={item.href}
                ref={(el) => {
                  navRefs.current[i] = el;
                }}
                style={{ opacity: 0 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    document.body.style.overflow = "";
                    setMobileOpen(false);
                    const id = item.href.replace("#", "");
                    const el = document.getElementById(id);
                    if (el) {
                      const y =
                        el.getBoundingClientRect().top + window.scrollY - 64;
                      window.scrollTo({ top: y, behavior: "smooth" });
                    }
                  }}
                  className="font-heading text-2xl sm:text-3xl font-normal text-background transition-colors duration-300 hover:text-white hover:scale-105 inline-block"
                >
                  {item.label}
                </a>
              </div>
            ))}
            <div
              ref={(el) => {
                navRefs.current[totalItems - 1] = el;
              }}
              style={{ opacity: 0 }}
            >
              <a
                href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking WIMAH Photobooth untuk acara saya.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="mt-6 flex items-center gap-2 bg-background text-text-primary font-body font-semibold rounded-3xl px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base transition-all duration-300 hover:shadow-[0_4px_24px_rgba(245,243,238,0.2)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <WhatsApp className="h-4 w-4 sm:h-5 sm:w-5" />
                Cek Ketersediaan
              </a>
            </div>
            <div
              ref={(el) => {
                navRefs.current[totalItems] = el;
              }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-6"
              style={{ opacity: 0 }}
            >
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-3xl border border-white/20 text-white/80 transition-all duration-300 hover:text-background hover:border-background/40 hover:bg-white/[0.06]"
                aria-label="Instagram"
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={siteConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-3xl border border-white/20 text-white/80 transition-all duration-300 hover:text-background hover:border-background/40 hover:bg-white/[0.06]"
                aria-label="TikTok"
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .54.04.79.1V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.07 4.8 4.8 0 01-.38-.52z" />
                </svg>
              </a>
              <a
                href={siteConfig.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-3xl border border-white/20 text-white/80 transition-all duration-300 hover:text-background hover:border-background/40 hover:bg-white/[0.06]"
                aria-label="Facebook"
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href={siteConfig.threads}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-3xl border border-white/20 text-white/80 transition-all duration-300 hover:text-background hover:border-background/40 hover:bg-white/[0.06]"
                aria-label="Threads"
              >
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.34-.776-.963-1.393-1.813-1.8-.203 1.352-.656 2.446-1.353 3.258-.94 1.095-2.159 1.564-3.484 1.498-1.044-.052-1.925-.458-2.607-1.197-.564-.61-.887-1.412-.91-2.266-.022-.85.263-1.67.807-2.333.697-.85 1.752-1.358 3.054-1.484.846-.082 1.658-.045 2.425.11-.14-.777-.464-1.397-.97-1.856-.648-.586-1.512-.88-2.573-.876l.013-.164c1.14-.006 2.158.324 3.02.985.78.6 1.294 1.446 1.535 2.521.842-.266 1.638-.393 2.372-.381 1.143.02 2.152.357 2.995 1.002 1.138.87 1.82 2.155 2.015 3.777.208 1.724-.235 3.27-1.315 4.593C18.162 22.557 15.616 23.976 12.186 24z" />
                </svg>
              </a>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 rounded-3xl border border-white/20 text-white/80 transition-all duration-300 hover:text-background hover:border-background/40 hover:bg-white/[0.06]"
                aria-label="WhatsApp"
              >
                <WhatsApp className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </nav>
        )}
      </div>
    </>
  );
}
