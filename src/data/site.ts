export const siteConfig = {
  name: "Wimah Photobooth",
  tagline: "Pengalaman Photobooth Premium",
  description:
    "Abadikan momen tak terlupakan dengan cetak instan, galeri digital, GIF, boomerang, dan pengalaman premium yang tidak akan terlupakan oleh tamu Anda.",
  whatsappLink: "https://wa.me/6287740812765",
  email: "wimahgallery@gmail.com",
  instagram: "https://www.instagram.com/wimah.photobooth",
  tiktok: "https://www.tiktok.com/@wimah.photobooth",
  facebook: "https://www.facebook.com/share/1ErSHgv2nu/",
  threads: "https://www.threads.com/@wimah.photobooth",
  navLinks: [
    { href: "#home", label: "Beranda" },
    { href: "#services", label: "Layanan" },
    { href: "#portfolio", label: "Portofolio" },
    { href: "#album", label: "Album" },
    { href: "#pricing", label: "Harga" },
    { href: "#faq", label: "FAQ" },
  ] as NavItem[],
};

export interface NavItem {
  href: string;
  label: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
}

export interface ContentItem {
  title: string;
  description: string;
}

export interface GuaranteeItem {
  title: string;
  description: string;
}
