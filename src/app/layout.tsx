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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://wimahphotobooth.id/",
  ),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "photobooth",
    "photobooth premium",
    "photobooth pernikahan",
    "photobooth Bali",
    "fotografi acara",
    "cetak instan",
    "galeri digital",
    "sewa photobooth Bali",
    "photobooth Gianyar",
    "event organizer Bali",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://wimahphotobooth.id/",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/wimah.png",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/wimah.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="id"
      className={`${cormorant.variable} ${inter.variable} ${playfair.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: siteConfig.name,
              description: siteConfig.description,
              url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"}/wimah.png`,
              email: siteConfig.email,
              address: {
                "@type": "PostalAddress",
                addressLocality: "Gianyar",
                addressRegion: "Bali",
                addressCountry: "ID",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -8.5447,
                longitude: 115.3343,
              },
              areaServed: {
                "@type": "State",
                name: "Bali",
              },
              serviceType: [
                "Photobooth Rental",
                "Event Photography",
                "Instant Print",
              ],
              priceRange: "$$",
              sameAs: [
                siteConfig.instagram,
                siteConfig.tiktok,
                siteConfig.facebook,
                siteConfig.threads,
                siteConfig.mapsLink,
              ],
            }),
          }}
        />
      </head>
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
