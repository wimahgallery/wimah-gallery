import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://wimahphotobooth.id/",
  ),
  title: "Tentang Kami — Wimah Photobooth",
  description:
    "Kenali lebih dekat tim di balik Wimah Photobooth. Cerita kami, passion kami, dan mengapa kami menciptakan pengalaman photobooth premium di Bali.",
  keywords: [
    "photobooth",
    "photobooth premium",
    "photobooth pernikahan",
    "fotografi acara",
    "cetak instan",
    "galeri digital",
    "photobooth Bali",
    "about",
  ],
  openGraph: {
    images: "/wimah.png",
    title: "Tentang Kami — Wimah Photobooth",
    description:
      "Kenali lebih dekat tim di balik Wimah Photobooth. Cerita kami, passion kami, dan mengapa kami menciptakan pengalaman photobooth premium di Bali.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
