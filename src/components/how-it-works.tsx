"use client"

import { motion } from "framer-motion"
import { steps } from "@/lib/config"

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
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

export default function HowItWorks() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Simple Process
          </span>
          <h2 className="mt-6 text-4xl md:text-5xl font-heading font-bold text-text-primary">
            How it{" "}
            <span className="font-elegant italic text-accent-light">
              works.
            </span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-[3.5rem] left-[10%] right-[10%] h-[2px] bg-accent/20" />
          <div className="lg:hidden absolute top-0 bottom-0 left-[2rem] w-[2px] bg-accent/20" />

          <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-0">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative flex lg:flex-col items-start lg:items-center gap-6 lg:gap-0 lg:text-center lg:flex-1"
              >
                <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-background border-2 border-accent/30 flex items-center justify-center">
                  <span className="text-xl font-heading font-black text-accent">
                    {step.number}
                  </span>
                </div>

                <div className="lg:mt-8">
                  <h3 className="text-xl font-heading font-bold text-text-primary mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-secondary max-w-[200px] lg:max-w-none">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
