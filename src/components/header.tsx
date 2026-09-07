"use client";

import { useState, useEffect } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          "[transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          scrolled
            ? "bg-glass/80 backdrop-blur-xl border-b border-glass-border shadow-[0_1px_24px_rgba(0,0,0,0.15)]"
            : "bg-transparent shadow-none"
        )}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-accent/10 border border-accent/20 transition-all duration-300 group-hover:bg-accent/20 group-hover:border-accent/30 group-hover:scale-105">
                <span className="font-heading text-sm font-bold text-accent">
                  W
                </span>
              </div>
              <span className="font-heading text-base font-semibold tracking-tight text-text-primary hidden sm:block transition-colors duration-300 group-hover:text-accent-light">
                {siteConfig.name}
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {siteConfig.navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary group"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 rounded-full bg-white/[0.04] scale-90 opacity-0 transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-100 group-hover:opacity-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center h-9 w-9 rounded-full text-text-secondary transition-all duration-300 hover:text-accent hover:bg-white/[0.04]"
                aria-label="Instagram"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href={siteConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center justify-center h-9 w-9 rounded-full text-text-secondary transition-all duration-300 hover:text-accent hover:bg-white/[0.04]"
                aria-label="TikTok"
              >
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .54.04.79.1V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.07 4.8 4.8 0 01-.38-.52z" />
                </svg>
              </a>
              <a
                href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking Wimah Gallery untuk acara saya.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-accent text-background font-semibold rounded-full px-6 py-2.5 transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:bg-accent-light hover:shadow-[0_4px_24px_rgba(200,112,64,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <MessageCircle className="h-5 w-5" />
                Cek Ketersediaan
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex lg:hidden h-10 w-10 items-center justify-center rounded-3xl border border-border text-text-secondary transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:border-accent/30 hover:text-accent hover:bg-white/[0.04]"
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
        className={cn(
          "fixed inset-0 z-40 bg-background/95 backdrop-blur-sm lg:hidden",
          "transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-2">
          {siteConfig.navLinks.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-heading font-semibold text-text-primary transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:text-accent hover:scale-105"
              style={{
                transitionDelay: mobileOpen ? `${80 + i * 60}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking Wimah Gallery untuk acara saya.`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="mt-6 flex items-center gap-2 bg-accent hover:bg-accent-light text-background font-semibold rounded-full px-8 py-4 text-base transition-all duration-500 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:shadow-[0_4px_24px_rgba(200,112,64,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            style={{
              transitionDelay: mobileOpen ? `${80 + siteConfig.navLinks.length * 60}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            }}
          >
            <MessageCircle className="h-5 w-5" />
            Cek Ketersediaan
          </a>
          <div
            className="flex items-center gap-4 mt-6"
            style={{
              transitionDelay: mobileOpen ? `${80 + (siteConfig.navLinks.length + 1) * 60}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
            }}
          >
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-11 w-11 rounded-full border border-border text-text-secondary transition-all duration-300 hover:text-accent hover:border-accent/30 hover:bg-white/[0.04]"
              aria-label="Instagram"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a
              href={siteConfig.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-11 w-11 rounded-full border border-border text-text-secondary transition-all duration-300 hover:text-accent hover:border-accent/30 hover:bg-white/[0.04]"
              aria-label="TikTok"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .54.04.79.1V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.07 4.8 4.8 0 01-.38-.52z" />
              </svg>
            </a>
            <a
              href={siteConfig.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-11 w-11 rounded-full border border-border text-text-secondary transition-all duration-300 hover:text-accent hover:border-accent/30 hover:bg-white/[0.04]"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
