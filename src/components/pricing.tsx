"use client"

import { motion } from "framer-motion"
import { packages, siteConfig } from "@/lib/config"
import { Check, Star, MessageCircle } from "lucide-react"

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-[32px] sm:text-[40px] text-text-primary">
            Simple, transparent{" "}
            <span className="font-elegant italic text-accent-light">pricing</span>.
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-3xl border p-8 ${
                pkg.popular
                  ? "border-accent/50 bg-surface/50"
                  : "border-border bg-surface/50"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-background">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading text-lg text-text-primary">{pkg.name}</h3>
                <p className="mt-1 text-sm text-text-secondary">{pkg.subtitle}</p>
                <p className="mt-4 font-heading text-3xl text-accent">{pkg.price}</p>
              </div>

              <ul className="mb-8 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-text-secondary">
                    <Check className="h-4 w-4 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-light"
              >
                <MessageCircle className="h-4 w-4" />
                Book via WhatsApp
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
