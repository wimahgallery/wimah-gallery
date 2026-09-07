"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { faqs } from "@/lib/config"
import { Plus, Minus } from "lucide-react"

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/10 to-background" />

      <div className="relative mx-auto max-w-[800px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-[32px] sm:text-[40px] text-text-primary">
            Frequently asked{" "}
            <span className="font-elegant italic text-accent-light">questions</span>.
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between py-6 text-left"
              >
                <span className="font-heading text-text-primary pr-4">
                  {faq.question}
                </span>
                {openIndex === i ? (
                  <Minus className="h-5 w-5 shrink-0 text-accent" />
                ) : (
                  <Plus className="h-5 w-5 shrink-0 text-text-secondary" />
                )}
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
