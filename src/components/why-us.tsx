"use client"

import { motion } from "framer-motion"
import { benefits } from "@/lib/config"
import { Check } from "lucide-react"

const benefitVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function WhyUs() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 texture-dots" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            The Difference
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-heading font-bold text-text-primary">
            Why clients{" "}
            <span className="font-elegant italic text-accent-light">
              love us.
            </span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-5 max-w-4xl mx-auto">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit}
              custom={i}
              variants={benefitVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="flex items-center gap-4"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Check className="w-4 h-4 text-accent" />
              </div>
              <span className="text-lg text-text-primary font-medium">
                {benefit}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
