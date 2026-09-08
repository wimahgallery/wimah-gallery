"use client"

import { useState } from "react"
import { animated, useSpring, useInView } from "@react-spring/web"
import { faqs, guarantees } from "@/lib/config"
import { Plus, Minus, Shield } from "lucide-react"
import { WhatsApp } from "@/components/whatsapp-icon"
import { siteConfig } from "@/lib/config"

function FaqItem({
  question,
  answer,
  isOpen,
  onClick,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  index: number
}) {
  const [ref, inView] = useInView(() => ({ triggerOnce: true, threshold: 0.1 }))

  const contentSpring = useSpring({
    height: isOpen ? "auto" : 0,
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 30 },
  })

  const iconSpring = useSpring({
    rotate: isOpen ? 45 : 0,
    config: { tension: 280, friction: 20 },
  })

  const itemSpring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 16,
    delay: index * 60,
    config: { tension: 280, friction: 60 },
  })

  return (
    <animated.div ref={ref} style={itemSpring}>
      <div className={`border-b transition-colors duration-300 ${
        isOpen ? "border-accent/30" : "border-border"
      }`}>
        <button
          onClick={onClick}
          className="flex w-full items-center gap-4 py-5 text-left transition-colors duration-300 group active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-xl"
        >
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${
            isOpen
              ? "bg-accent text-background"
              : "bg-accent/10 text-accent group-hover:bg-accent/15"
          }`}>
            <animated.div style={{ rotate: iconSpring.rotate }}>
              {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </animated.div>
          </div>
          <span className={`flex-1 font-heading text-base font-normal transition-colors duration-300 ${
            isOpen ? "text-accent" : "text-text-primary group-hover:text-accent"
          }`}>
            {question}
          </span>
        </button>

        <animated.div
          style={{ overflow: "hidden", height: contentSpring.height, opacity: contentSpring.opacity }}
        >
          <div className="pl-12 pr-4 pb-5">
            <p className="text-sm text-text-secondary leading-normal">{answer}</p>
          </div>
        </animated.div>
      </div>
    </animated.div>
  )
}

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [ref, inView] = useInView(() => ({ triggerOnce: true }))
  const titleSpring = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 30,
    config: { tension: 280, friction: 60 },
  })

  return (
    <section id="faq" className="relative py-20 lg:py-32 texture-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface/15 to-background" />
      <div className="absolute inset-0 bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px] px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          {/* Left column - Title + Description + CTA */}
          <animated.div ref={ref} style={titleSpring}>
            <div className="lg:sticky lg:top-32">
              <p className="mb-4 text-xs font-medium tracking-[0.2em] uppercase text-accent">
                FAQ WIMAH PHOTOBOOTH
              </p>
              <h2 className="mb-6 font-heading text-[32px] sm:text-[40px] lg:text-[48px] font-normal text-text-primary">
                Pertanyaan{" "}
                <span className="font-elegant italic text-accent">
                  umum
                </span>
              </h2>
              <p className="mb-8 text-base text-text-secondary leading-relaxed">
                Semua yang perlu Anda ketahui tentang layanan photobooth kami.
              </p>
              <a
                href={`${siteConfig.whatsappLink}?text=Halo! Saya punya pertanyaan tentang layanan Wimah Gallery.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-6 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <WhatsApp className="h-4 w-4 text-accent" />
                Ask us on WhatsApp
              </a>
            </div>
          </animated.div>

          {/* Right column - FAQ items */}
          <div>
            <div className="rounded-3xl border border-border bg-surface/30 p-2">
              {faqs.map((faq, i) => (
                <FaqItem
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  index={i}
                />
              ))}
            </div>

            {/* Garansi Section */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-accent/10">
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-normal text-text-primary">
                  GARANSI WIMAH PHOTOBOOTH
                </h3>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {guarantees.map((item, i) => (
                  <GuaranteeCard key={item.title} item={item} index={i} />
                ))}
              </div>
            </div>

            <div className="mt-10 text-center">
              <p className="font-heading text-lg font-normal text-text-primary">
                Your Moment, Your Memory.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function GuaranteeCard({
  item,
  index,
}: {
  item: (typeof guarantees)[number]
  index: number
}) {
  const [ref, inView] = useInView(() => ({ triggerOnce: true }))
  const [style] = useSpring(() => ({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 16,
    delay: index * 80,
    config: { tension: 280, friction: 60 },
  }))

  return (
    <animated.div
      ref={ref}
      style={style}
      className="flex items-start gap-3 rounded-2xl border border-border bg-surface/30 p-4 transition-all duration-300 hover:border-accent/20 hover:bg-surface/50"
    >
      <div className="shrink-0 mt-0.5 h-2 w-2 rounded-full bg-accent" />
      <div>
        <p className="font-heading text-sm font-normal text-text-primary mb-1">{item.title}</p>
        <p className="text-xs text-text-secondary leading-relaxed">{item.description}</p>
      </div>
    </animated.div>
  )
}
