import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import type { PropsWithChildren } from "react";
import { siteConfig } from "@/lib/config";
import QueryProvider from "@/components/ui/QueryProvider";
import FloatingWhatsApp from "@/components/features/loading/FloatingWhatsApp";
import "./globals.css";
import LoadingScreen from "@/components/features/loading/LoadingScreen";
import SmoothScroll from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${siteConfig.name} — ${siteConfig.tagline}`,
  description: siteConfig.description,
  keywords: [
    "photobooth",
    "photobooth premium",
    "photobooth pernikahan",
    "fotografi acara",
    "cetak instan",
    "galeri digital",
    "photobooth Bali",
  ],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${inter.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-background text-text-primary antialiased">
        <QueryProvider>
          <LoadingScreen />
          <SmoothScroll />
          <CustomCursor />
          <ScrollProgress />
          <FloatingWhatsApp />
          <Header />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
