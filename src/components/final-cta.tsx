"use client"

import { motion } from "framer-motion"
import { siteConfig } from "@/lib/config"
import { ArrowRight } from "lucide-react"

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/20 to-background" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[800px] px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-[40px] sm:text-[56px] leading-tight text-text-primary">
            Because every meaningful moment{" "}
            <span className="font-elegant italic text-accent-light">
              deserves to be remembered
            </span>.
          </h2>

          <p className="mx-auto mt-6 max-w-[600px] text-lg text-text-secondary">
            Reserve your date today and create unforgettable memories with your guests.
          </p>

          <a
            href={siteConfig.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-background font-medium transition-colors hover:bg-accent-light"
          >
            Book Your Date
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
