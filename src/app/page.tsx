"use client"

import { useEffect } from "react"
import Lenis from "lenis"

import { Header } from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import WhyUs from "@/components/why-us"
import HowItWorks from "@/components/how-it-works"
import Portfolio from "@/components/portfolio"
import HorizontalPortfolio from "@/components/horizontal-portfolio"
import ClientGallery from "@/components/client-gallery"
import Pricing from "@/components/pricing"
import Testimonials from "@/components/testimonials"
import FAQ from "@/components/faq"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"
import CustomCursor from "@/components/custom-cursor"
import ScrollProgress from "@/components/scroll-progress"

export default function Home() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(pointer: fine)").matches) {
      const lenis = new Lenis()
      function raf(time: number) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
      return () => { lenis.destroy() }
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <main className="relative">
        <div className="relative">
          <Header />
        </div>
        <div className="relative">
          <Hero />
        </div>
        <div className="relative">
          <About />
        </div>
        <div className="relative">
          <WhyUs />
        </div>
        <div className="relative">
          <HowItWorks />
        </div>
        <div className="relative">
          <Portfolio />
        </div>
        <div className="relative">
          <HorizontalPortfolio />
        </div>
        <div className="relative">
          <ClientGallery />
        </div>
        <div className="relative">
          <Pricing />
        </div>
        <div className="relative">
          <Testimonials />
        </div>
        <div className="relative">
          <FAQ />
        </div>
        <div className="relative">
          <FinalCTA />
        </div>
        <div className="relative">
          <Footer />
        </div>
      </main>
    </>
  )
}
