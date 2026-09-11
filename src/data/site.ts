export const siteConfig = {
  name: "Wimah Photobooth",
  tagline: "Premium Photobooth Experience",
  description:
    "Capture unforgettable memories with instant prints, digital galleries, GIFs, boomerangs, and a premium guest experience your guests will never forget.",
  whatsappLink: "https://wa.me/6287740812765",
  email: "wimahgallery@gmail.com",
  instagram: "https://www.instagram.com/wimah.photobooth",
  tiktok: "https://www.tiktok.com/@wimah.photobooth",
  facebook: "https://www.facebook.com/share/1ErSHgv2nu/",
  threads: "https://www.threads.com/@wimah.photobooth",
  navLinks: [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#gallery", label: "Gallery" },
    { href: "#pricing", label: "Pricing" },
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
