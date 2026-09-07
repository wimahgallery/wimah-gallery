import type { Metadata } from "next";
import { Poppins, Inter, Playfair_Display } from "next/font/google";
import type { PropsWithChildren } from "react";
import { siteConfig } from "@/lib/config";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      className={`${poppins.variable} ${inter.variable} ${playfair.variable}`}
    >
      <body className="min-h-screen bg-background text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
