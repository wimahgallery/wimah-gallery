"use client"

import { motion } from "framer-motion"
import { features } from "@/lib/config"
import { Users, Sparkles, Image, Crown } from "lucide-react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Sparkles,
  Image,
  Crown,
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
}

export default function About() {
  return (
    <section id="services" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/30 to-background" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Our Experience
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-heading font-bold text-text-primary">
            More than just{" "}
            <span className="font-elegant italic text-accent-light">
              photo printing.
            </span>
          </h2>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            We create experiences that guests remember long after the event ends.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon]
            return (
              <motion.div
                key={feature.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="group bg-surface/50 border border-border rounded-3xl p-8 hover:card-lift transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {Icon && <Icon className="w-7 h-7 text-accent" />}
                </div>
                <h3 className="text-xl font-heading font-bold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
