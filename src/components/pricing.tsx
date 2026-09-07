"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { Check, MessageCircle, ChevronDown } from "lucide-react";
import { packages, siteConfig } from "@/lib/config";

export function Pricing() {
  const [openId, setOpenId] = useState<string | null>("unlimited");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={sectionRef} id="pricing" className="relative py-32 overflow-hidden texture-noise">
      {/* Parallax warm glows */}
      <motion.div style={{ y: bgY }} className="absolute top-1/2 left-0 w-[700px] h-[700px] -translate-y-1/2 rounded-full bg-accent/5 blur-[140px]" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]) }} className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-accent-light/4 blur-[120px]" />

      {/* Organic decorative elements */}
      <div className="absolute bottom-20 left-16 w-28 h-28 organic-blob bg-accent/4 animate-warm-pulse" style={{ animationDelay: "3s" }} />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-96px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-[700px] mx-auto mb-16"
        >
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">Harga</p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            Pilih{" "}
            <span className="font-elegant italic text-accent-light">pengalaman Anda.</span>
          </h2>
          <p className="mt-8 text-lg text-text-secondary leading-relaxed">
            Setiap paket dirancang untuk menciptakan kenangan tak terlupakan.
          </p>
        </motion.div>

        <motion.div style={{ y: cardsY }} className="max-w-[700px] mx-auto space-y-4">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 48 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className={`rounded-3xl border transition-all duration-500 ${
                  openId === pkg.id
                    ? "border-accent/30 bg-surface/80 shadow-[0_8px_40px_rgba(61,43,37,0.1)]"
                    : "border-border bg-surface/30 hover:border-accent/15 hover:shadow-[0_4px_24px_rgba(61,43,37,0.06)]"
                } ${pkg.popular ? "ring-1 ring-accent/20" : ""}`}
              >
                <button
                  onClick={() => setOpenId(openId === pkg.id ? null : pkg.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-accent/10 border border-accent/15 shrink-0 transition-all duration-500 group-hover:bg-accent/15">
                      <span className="font-heading text-sm font-bold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold">
                        {pkg.name}
                        {pkg.popular && (
                          <span className="ml-3 inline-flex items-center rounded-3xl bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                            Paling Populer
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-text-secondary mt-1">
                        {pkg.subtitle}{" "}
                        <span className="text-text-primary font-semibold">{pkg.price}</span>
                      </p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: openId === pkg.id ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 ml-4"
                  >
                    <ChevronDown className="h-5 w-5 text-text-secondary" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openId === pkg.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-8 pt-2 border-t border-border">
                        <div className="grid sm:grid-cols-2 gap-3 mb-8">
                          {pkg.features.map((feature) => (
                            <div key={feature} className="flex items-center gap-3">
                              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-3xl bg-accent/15">
                                <Check className="h-3 w-3 text-accent" />
                              </div>
                              <span className="text-sm text-text-secondary">{feature}</span>
                            </div>
                          ))}
                        </div>
                        <a
                          href={`${siteConfig.whatsappLink}?text=Halo! Saya tertarik dengan paket ${pkg.name}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-3xl bg-accent px-6 py-3 text-sm font-semibold text-background transition-all duration-500 hover:bg-accent-light hover:shadow-[0_8px_32px_rgba(191,67,66,0.3)] hover:scale-[1.02]"
                        >
                          <MessageCircle className="h-5 w-5" />
                          Booking via WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
