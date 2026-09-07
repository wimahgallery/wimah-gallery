"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Calendar, Settings, Camera, Send } from "lucide-react";

const steps = [
  { icon: MessageCircle, number: "01", title: "Consultation", description: "Chat with us on WhatsApp." },
  { icon: Calendar, number: "02", title: "Planning", description: "Choose package, design, and schedule." },
  { icon: Settings, number: "03", title: "Setup", description: "We prepare everything before guests arrive." },
  { icon: Camera, number: "04", title: "Photo Session", description: "Guests enjoy unlimited fun." },
  { icon: Send, number: "05", title: "Delivery", description: "Receive prints and digital gallery." },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.7], [0, 100]);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden texture-dots">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-96px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-[700px] mx-auto mb-16"
        >
          <p className="text-sm font-medium tracking-wider uppercase text-accent mb-4">How It Works</p>
          <h2 className="font-heading text-[40px] sm:text-[56px] font-bold tracking-tight">
            Simple{" "}
            <span className="font-elegant italic text-accent-light">from start to finish.</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-[10%] right-[10%] h-px bg-border">
            <motion.div
              style={{ width: lineProgress }}
              className="h-full bg-accent/30"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex flex-col items-center text-center group"
              >
                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-surface border border-border transition-all duration-200 group-hover:border-accent/30 group-hover:bg-accent/10 group-hover:shadow-[0_4px_24px_rgba(191,67,66,0.1)]">
                  <step.icon className="h-8 w-8 text-accent transition-transform duration-200 group-hover:scale-110" />
                </div>
                <span className="mb-2 font-heading text-sm font-bold tracking-widest text-accent/60 uppercase">
                  Step {step.number}
                </span>
                <h3 className="font-heading text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
