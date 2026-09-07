export const siteConfig = {
  name: "Wimah Gallery",
  tagline: "Pengalaman Photobooth Premium",
  description:
    "Abadikan momen tak terlupakan dengan cetakan instan, galeri digital, GIF, boomerang, dan pengalaman premium yang tidak akan pernah tamu Anda lupakan.",
  whatsappNumber: "6281234567890",
  whatsappLink: "https://wa.me/6281234567890",
  email: "hello@wimahgallery.com",
  instagram: "https://instagram.com/wimahgallery",
  tiktok: "https://tiktok.com/@wimahgallery",
  navLinks: [
    { label: "Beranda", href: "#home" },
    { label: "Layanan", href: "#services" },
    { label: "Portofolio", href: "#portfolio" },
    { label: "Galeri", href: "#gallery" },
    { label: "Harga", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;

export const portfolioImages = [
  {
    id: 1,
    category: "Pernikahan",
    title: "Sarah & Michael",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 2,
    category: "Korporat",
    title: "Annual Gala Night",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    aspect: "aspect-[3/4]",
  },
  {
    id: 3,
    category: "Ulang Tahun",
    title: "Sweet 17 Angela",
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 4,
    category: "Pernikahan",
    title: "Dewi & Raka",
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=600&fit=crop",
    aspect: "aspect-[3/4]",
  },
  {
    id: 5,
    category: "Wisuda",
    title: "Angkatan 2026",
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 6,
    category: "Lamaran",
    title: "Luna & Andre",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
    aspect: "aspect-[3/4]",
  },
  {
    id: 7,
    category: "Korporat",
    title: "Peluncuran Produk",
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
    aspect: "aspect-[4/3]",
  },
  {
    id: 8,
    category: "Pernikahan",
    title: "Rina & David",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
    aspect: "aspect-[3/4]",
  },
  {
    id: 9,
    category: "Ulang Tahun",
    title: "Baby Shower",
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop&q=80",
    aspect: "aspect-[4/3]",
  },
] as const;

export const horizontalImages = [
  { id: 1, category: "Pernikahan", title: "Sarah & Michael", src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1000&fit=crop", aspect: "aspect-[3/4]" },
  { id: 2, category: "Korporat", title: "Annual Gala Night", src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", aspect: "aspect-[4/3]" },
  { id: 3, category: "Ulang Tahun", title: "Sweet 17 Angela", src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1000&fit=crop", aspect: "aspect-[3/4]" },
  { id: 4, category: "Wisuda", title: "Angkatan 2026", src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=600&fit=crop", aspect: "aspect-[4/3]" },
  { id: 5, category: "Pernikahan", title: "Dewi & Raka", src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&h=1000&fit=crop", aspect: "aspect-[3/4]" },
  { id: 6, category: "Korporat", title: "Peluncuran Produk", src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop", aspect: "aspect-[4/3]" },
  { id: 7, category: "Pernikahan", title: "Rina & David", src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=1000&fit=crop", aspect: "aspect-[3/4]" },
  { id: 8, category: "Ulang Tahun", title: "Baby Shower", src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&h=600&fit=crop", aspect: "aspect-[4/3]" },
] as const;

export const clientGalleries = [
  {
    name: "Sarah & Michael",
    event: "Pernikahan",
    date: "Agustus 2026",
    location: "Ubud, Bali",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop",
  },
  {
    name: "Dewi & Raka",
    event: "Pertunangan",
    date: "Juli 2026",
    location: "Seminyak, Bali",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop",
  },
  {
    name: "PT. Maju Bersama",
    event: "Gala Korporat Tahunan",
    date: "Juni 2026",
    location: "Nusa Dua, Bali",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  },
  {
    name: "Angela Putri",
    event: "Sweet Seventeen",
    date: "Mei 2026",
    location: "Sanur, Bali",
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
  },
] as const;

export const pinnedStoryImages = [
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=640&h=480&fit=crop", label: "Sebuah momen bersama.", sub: "Pernikahan", color: "from-accent/20 via-accent/10 to-surface" },
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=640&h=480&fit=crop", label: "Sebuah kenangan tercipta.", sub: "Ulang Tahun", color: "from-surface-secondary via-accent/10 to-surface" },
  { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=640&h=480&fit=crop", label: "Sebuah perayaan dikenang.", sub: "Korporat", color: "from-accent/15 via-surface to-surface-secondary" },
  { src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=640&h=480&fit=crop", label: "Sebuah cerita selamanya.", sub: "Galeri", color: "from-surface via-accent/10 to-accent/5" },
] as const;

export const packages = [
  {
    id: "digital",
    name: "Pengalaman Digital",
    price: "Rp 1.300.000",
    subtitle: "Mulai dari",
    features: ["Galeri Digital", "GIF", "Boomerang", "Unduh QR"],
    popular: false,
  },
  {
    id: "limited",
    name: "Pengalaman Cetak Terbatas",
    price: "Rp 1.800.000",
    subtitle: "Mulai dari",
    features: ["Cetak Terbatas", "Galeri Digital", "GIF", "Unduh QR"],
    popular: false,
  },
  {
    id: "unlimited",
    name: "Pengalaman Cetak Unlimited",
    price: "Rp 2.600.000",
    subtitle: "Mulai dari",
    features: ["Cetak Unlimited", "Galeri Digital", "GIF", "Unduh QR"],
    popular: true,
  },
  {
    id: "vip",
    name: "Pengalaman VIP Luxury",
    price: "Custom",
    subtitle: "Disesuaikan untuk Anda",
    features: ["Cetak Unlimited", "Backdrop Premium", "Desain Kustom", "Setup VIP", "Galeri Digital Lengkap"],
    popular: false,
  },
] as const;

export const testimonials = [
  {
    name: "Sarah & Michael",
    event: "Pernikahan",
    rating: 5,
    review: "Wimah Gallery membuat resepsi pernikahan kami sangat seru! Tamu kami tidak berhenti membicarakan photobooth-nya. Cetakannya cantik dan galeri digitalnya sudah siap malam itu juga.",
  },
  {
    name: "Dewi & Raka",
    event: "Pertunangan",
    rating: 5,
    review: "Timnya sangat profesional dan setup-nya luar biasa. Setiap tamu pulang dengan cetakan yang indah dan senyum di wajah. Sangat worth it!",
  },
  {
    name: "PT. Maju Bersama",
    event: "Gala Korporat",
    rating: 5,
    review: "Kami booking Wimah Gallery untuk gala korporat tahunan kami dan itu menjadi highlight malam itu. Backdrop kustomnya sangat cocok dengan branding kami.",
  },
  {
    name: "Angela Putri",
    event: "Sweet Seventeen",
    rating: 5,
    review: "Pesta ulang tahun ke-17 saya benar-benar sempurna berkat Wimah Gallery! GIF dan boomerang-nya hits banget di semua teman saya. Ulang tahun terbaik!",
  },
  {
    name: "Keluarga Wijaya",
    event: "Kumpul Keluarga",
    rating: 5,
    review: "Kami ingin sesuatu yang spesial untuk reuni keluarga dan Wimah Gallery melebihi ekspektasi. Tiga generasi keluarga kami menghabiskan waktu yang paling menyenangkan bersama.",
  },
] as const;

export const faqs = [
  { question: "Bagaimana cara booking?", answer: "Cukup ketuk tombol Booking via WhatsApp dan chat dengan kami. Kami akan memandu Anda melalui seluruh proses, mulai dari memilih paket yang tepat hingga mengonfirmasi detail acara Anda." },
  { question: "Seberapa awal harus reservasi?", answer: "Kami sarankan booking minimal 2-4 minggu sebelumnya untuk akhir pekan dan hari libur. Tanggal musim puncak (terutama musim pernikahan) cepat penuh, jadi lebih awal selalu lebih baik." },
  { question: "Bisakah melayani di luar kota?", answer: "Tentu saja! Kami melayani acara di seluruh Bali dan tersedia untuk acara destination di seluruh Indonesia. Biaya perjalanan mungkin berlaku untuk lokasi di luar area layanan standar kami." },
  { question: "Berapa lama setup memakan waktu?", answer: "Tim kami biasanya tiba 60-90 menit sebelum acara Anda dimulai untuk memastikan semuanya tersetup sempurna dan sudah diuji sebelum tamu Anda datang." },
  { question: "Bisakah kustomisasi frame foto?", answer: "Bisa! Semua paket kami termasuk desain frame kustom dengan tema acara, warna, nama, dan tanggal. Kami bekerja sama dengan Anda untuk menciptakan desain yang sempurna." },
  { question: "Kapan kami menerima file digital?", answer: "Galeri digital Anda tersedia dalam 24 jam setelah acara. Anda akan menerima tautan pribadi untuk melihat dan mengunduh semua foto, GIF, dan boomerang." },
  { question: "Apakah menyediakan cetakan unlimited?", answer: "Paket Cetak Unlimited dan VIP Luxury kami termasuk cetakan unlimited untuk setiap tamu. Paket Digital dan Cetak Terbatas memiliki kuota cetak yang berbeda." },
  { question: "Bisakah melayani acara korporat?", answer: "Tentu saja! Kami senang melayani acara korporat. Kami bisa mengkustomisasi segalanya dari backdrop hingga frame foto agar sesuai dengan branding perusahaan dan tema acara Anda." },
] as const;
