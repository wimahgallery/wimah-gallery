import SmoothScroll from "@/components/providers/SmoothScroll";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/features/hero/HeroSection";
import About from "@/components/features/about/AboutSection";
import TypographyStorytelling from "@/components/features/typography-storytelling/StorytellingSection";
import HowItWorks from "@/components/features/how-it-works/HowItWorksSection";
import Availability from "@/components/features/availability/AvailabilitySection";
import PortfolioGallery from "@/components/features/portfolio/PortfolioSection";
import ClientGallery from "@/components/features/client-gallery/ClientGallerySection";
import Pricing from "@/components/features/pricing/PricingSection";
import Testimonials from "@/components/features/testimonials/TestimonialsSection";
import FAQ from "@/components/features/faq/FaqSection";
import FinalCTA from "@/components/features/final-cta/FinalCTASection";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingWhatsApp from "@/components/features/loading/FloatingWhatsApp";
import Marquee from "@/components/ui/Marquee";
import LoadingScreen from "@/components/features/loading/LoadingScreen";

const MARQUEE_EVENTS = [
  "Wedding",
  "Birthday",
  "Corporate",
  "Gathering",
  "Engagement",
  "Graduation",
] as const;

const MARQUEE_VALUES = [
  "Professional",
  "Premium",
  "Unforgettable",
  "Moments",
  "Beautiful",
] as const;

export default function Home() {
  return (
    <>
      <main className="relative">
        <Hero />

        <Marquee items={[...MARQUEE_EVENTS]} />
        <div className="h-2" />
        <Marquee items={[...MARQUEE_VALUES]} reverse slow />

        <About />
        <TypographyStorytelling />
        <HowItWorks />
        <Availability />
        <PortfolioGallery />
        <ClientGallery />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
    </>
  );
}
