"use client"

import { motion } from "framer-motion"
import { testimonials } from "@/lib/config"
import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 texture-dots" />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-[32px] sm:text-[40px] text-text-primary">
            What our{" "}
            <span className="font-elegant italic text-accent-light">clients say</span>.
          </h2>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl border border-border bg-surface/50 p-8"
            >
              <Quote className="mb-4 h-8 w-8 text-accent/40" />

              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="mb-6 text-text-secondary leading-relaxed">
                {testimonial.review}
              </p>

              <div>
                <p className="font-heading text-sm text-text-primary">
                  {testimonial.name}
                </p>
                <p className="text-xs text-text-secondary">{testimonial.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
