const whatsappBookingMessage = `Halo WIMAH Photobooth,

Saya tertarik untuk booking Photobooth untuk acara saya.

Tanggal Acara: 
Venue / Lokasi:
Jenis Acara: (Wedding/ Birthday/ Corporate/ dll)

Apakah tanggal tersebut masih tersedia?`;

const whatsappAsk = `Halo WIMAH Photobooth,

Saya punya pertanyaan mengenai layanan WIMAH Photobooth.

Terima kasih.`;

export const siteConfig = {
  name: "Wimah Photobooth",
  tagline: "Pengalaman Photobooth Premium",
  description:
    "Abadikan momen tak terlupakan dengan cetak instan, galeri digital, GIF, boomerang, dan pengalaman premium yang tidak akan terlupakan oleh tamu Anda.",
  whatsappLink: "https://wa.me/6287740812765",
  whatsappBookingMessage,
  whatsappAsk,
  email: "wimahgallery@gmail.com",
  mapsLink: "https://maps.app.goo.gl/FmdQZzJuhdsWaBgT6",
  address: "Gianyar, Bali, Indonesia",
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
