import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://wimahphotobooth.id/",
  ),
  title: "Album — Wimah Photobooth",
  description:
    "Semua event yang telah kami abadikan dalam satu gallery. Lihat koleksi foto photobooth dari berbagai acara spesial.",
  keywords: [
    "photobooth",
    "photobooth premium",
    "photobooth pernikahan",
    "fotografi acara",
    "cetak instan",
    "galeri digital",
    "photobooth Bali",
    "album",
  ],
  openGraph: {
    images: "/wimah.png",
    title: "Album — Wimah Photobooth",
    description: "Semua event yang telah kami abadikan dalam satu gallery.",
    type: "website",
    locale: "id_ID",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
