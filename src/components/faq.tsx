"use client"

import { useState } from "react"
import { animated, useSpring, useInView } from "@react-spring/web"
import { faqs } from "@/lib/config"
import { Plus, Minus, MessageCircle } from "lucide-react"
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
              : "bg-surface-secondary/50 text-text-secondary group-hover:bg-accent/10 group-hover:text-accent"
          }`}>
            <animated.div style={{ rotate: iconSpring.rotate }}>
              {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            </animated.div>
          </div>
          <span className={`flex-1 font-heading text-base font-semibold transition-colors duration-300 ${
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

      <div className="relative mx-auto max-w-[800px] px-6 lg:px-8">
        <animated.div ref={ref} style={titleSpring} className="mb-16 text-center">
          <p className="mb-4 text-sm font-medium tracking-wider uppercase text-accent">
            FAQ
          </p>
          <h2 className="mb-6 font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary">
            Frequently asked{" "}
            <span className="font-elegant italic text-accent">
              questions
            </span>
          </h2>
          <p className="mx-auto max-w-[480px] text-base text-text-secondary leading-normal">
            Everything you need to know about our photobooth services. Can&apos;t find what you&apos;re looking for?
          </p>
        </animated.div>

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

        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-text-secondary">
            Still have questions?
          </p>
          <a
            href={`${siteConfig.whatsappLink}?text=Halo! Saya punya pertanyaan tentang layanan Wimah Gallery.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-6 py-3 text-sm font-medium text-text-primary transition-all duration-300 hover:border-accent/30 hover:bg-accent/5 hover:scale-[1.02] active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <MessageCircle className="h-4 w-4 text-accent" />
            Ask us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
