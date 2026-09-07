"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const navItems = siteConfig.navLinks;

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
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-400",
          scrolled
            ? "bg-glass backdrop-blur-xl border-b border-glass-border shadow-[0_4px_24px_rgba(61,43,37,0.08)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-accent/10 border border-accent/15">
                <span className="font-heading text-sm font-bold text-accent">W</span>
              </div>
              <span className="font-heading text-base font-semibold tracking-tight text-text-primary hidden sm:block">
                {siteConfig.name}
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-text-secondary transition-colors duration-300 hover:text-text-primary group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-1/2 h-px w-0 bg-accent transition-all duration-300 group-hover:left-4 group-hover:w-[calc(100%-2rem)]" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex h-10 w-10 items-center justify-center rounded-3xl border border-border text-text-secondary transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a
                href={siteConfig.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex h-10 w-10 items-center justify-center rounded-3xl border border-border text-text-secondary transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                aria-label="TikTok"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .54.04.79.1V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.07 4.8 4.8 0 01-.38-.52z" />
                </svg>
              </a>
              <a
                href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking Wimah Gallery untuk acara saya.`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 rounded-3xl bg-accent px-6 py-3 text-sm font-semibold text-background transition-all duration-300 hover:bg-accent-light hover:shadow-[0_4px_24px_rgba(191,67,66,0.3)]"
              >
                <MessageCircle className="h-5 w-5" />
                Cek Ketersediaan
              </a>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex lg:hidden h-10 w-10 items-center justify-center rounded-3xl border border-border text-text-secondary transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl font-heading font-semibold text-text-primary transition-colors duration-300 hover:text-accent"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik untuk booking Wimah Gallery untuk acara saya.`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 flex items-center gap-2 rounded-3xl bg-accent px-8 py-4 text-base font-semibold text-background"
              >
                <MessageCircle className="h-5 w-5" />
                Cek Ketersediaan
              </motion.a>
              <div className="flex items-center gap-4 mt-4">
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300" aria-label="Instagram">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300" aria-label="TikTok">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.89c.28 0 .54.04.79.1V9a6.27 6.27 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 0010.86 4.43v-7.15a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-.81-.07 4.8 4.8 0 01-.38-.52z" /></svg>
                </a>
                <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-accent transition-colors duration-300" aria-label="WhatsApp">
                  <MessageCircle className="h-6 w-6" />
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
