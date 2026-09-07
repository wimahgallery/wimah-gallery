"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Check, MessageCircle, ChevronDown } from "lucide-react";
import { packages, siteConfig } from "@/lib/config";

export function Pricing() {
  const [openId, setOpenId] = useState<string | null>("unlimited");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} id="pricing" className="relative py-32 overflow-hidden texture-noise">
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] -translate-y-1/2 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-96px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-[700px] mx-auto mb-16"
        >
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">Pricing</p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            Choose your{" "}
            <span className="font-elegant italic text-accent-light">experience.</span>
          </h2>
          <p className="mt-8 text-lg text-text-secondary leading-relaxed">
            Every package is crafted to create unforgettable memories.
          </p>
        </motion.div>

        <div className="max-w-[700px] mx-auto space-y-4">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 48 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className={`rounded-3xl border transition-all duration-200 ${
                  openId === pkg.id
                    ? "border-accent/30 bg-surface/80 shadow-[0_4px_24px_rgba(61,43,37,0.08)]"
                    : "border-border bg-surface/30 hover:border-accent/15"
                } ${pkg.popular ? "ring-1 ring-accent/20" : ""}`}
              >
                <button
                  onClick={() => setOpenId(openId === pkg.id ? null : pkg.id)}
                  className="w-full p-6 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-accent/10 border border-accent/15 shrink-0">
                      <span className="font-heading text-sm font-bold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold">
                        {pkg.name}
                        {pkg.popular && (
                          <span className="ml-3 inline-flex items-center rounded-3xl bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                            Most Popular
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
                    transition={{ duration: 0.2 }}
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
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
                          href={`${siteConfig.whatsappLink}?text=Hi! I'm interested in the ${pkg.name} package.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-3xl bg-accent px-6 py-3 text-sm font-semibold text-background transition-all duration-200 hover:bg-accent-light hover:shadow-[0_4px_24px_rgba(191,67,66,0.3)]"
                        >
                          <MessageCircle className="h-5 w-5" />
                          Book via WhatsApp
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
