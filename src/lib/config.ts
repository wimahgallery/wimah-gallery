export const siteConfig = {
  name: "Wimah Gallery",
  tagline: "Premium Photobooth Experience",
  description:
    "Capture unforgettable memories with instant prints, digital galleries, GIFs, boomerangs, and a premium guest experience your guests will never forget.",
  whatsappNumber: "6281234567890",
  whatsappLink: "https://wa.me/6281234567890",
  email: "hello@wimahgallery.com",
  instagram: "https://instagram.com/wimahgallery",
  tiktok: "https://tiktok.com/@wimahgallery",
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Gallery", href: "#gallery" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
} as const;

export const packages = [
  {
    id: "digital",
    name: "Digital Experience",
    price: "Rp 1.300.000",
    subtitle: "Starting from",
    features: [
      "Digital Gallery",
      "GIF",
      "Boomerang",
      "QR Download",
    ],
    popular: false,
  },
  {
    id: "limited",
    name: "Limited Print Experience",
    price: "Rp 1.800.000",
    subtitle: "Starting from",
    features: [
      "Limited Prints",
      "Digital Gallery",
      "GIF",
      "QR Download",
    ],
    popular: false,
  },
  {
    id: "unlimited",
    name: "Unlimited Print Experience",
    price: "Rp 2.600.000",
    subtitle: "Starting from",
    features: [
      "Unlimited Prints",
      "Digital Gallery",
      "GIF",
      "QR Download",
    ],
    popular: true,
  },
  {
    id: "vip",
    name: "Luxury VIP Experience",
    price: "Custom",
    subtitle: "Tailored for you",
    features: [
      "Unlimited Prints",
      "Premium Backdrop",
      "Custom Design",
      "VIP Setup",
      "Full Digital Gallery",
    ],
    popular: false,
  },
] as const;

export const testimonials = [
  {
    name: "Sarah & Michael",
    event: "Wedding Celebration",
    rating: 5,
    review:
      "Wimah Gallery made our wedding reception so much fun! Our guests couldn't stop talking about the photobooth. The prints were gorgeous and the digital gallery was ready the same night.",
  },
  {
    name: "Dewi & Raka",
    event: "Engagement Party",
    rating: 5,
    review:
      "The team was incredibly professional and the setup was stunning. Every guest left with a beautiful print and a smile. Worth every rupiah!",
  },
  {
    name: "PT. Maju Bersama",
    event: "Corporate Gala",
    rating: 5,
    review:
      "We booked Wimah Gallery for our annual corporate gala and it was the highlight of the evening. The custom backdrop perfectly matched our branding.",
  },
  {
    name: "Angela Putri",
    event: "Sweet Seventeen",
    rating: 5,
    review:
      "My 17th birthday party was absolutely perfect thanks to Wimah Gallery! The GIFs and boomerangs were a hit with all my friends. Best birthday ever!",
  },
  {
    name: "Keluarga Wijaya",
    event: "Family Gathering",
    rating: 5,
    review:
      "We wanted something special for our family reunion and Wimah Gallery delivered beyond expectations. Three generations of our family had the most wonderful time together.",
  },
] as const;

export const faqs = [
  {
    question: "How do I book?",
    answer:
      "Simply tap the Book via WhatsApp button and chat with us. We'll guide you through the entire process, from choosing the right package to confirming your event details.",
  },
  {
    question: "How early should I reserve?",
    answer:
      "We recommend booking at least 2-4 weeks in advance for weekends and holidays. Peak season dates (especially wedding season) fill up fast, so earlier is always better.",
  },
  {
    question: "Can you travel outside the city?",
    answer:
      "Absolutely! We serve events across Bali and are available for destination events throughout Indonesia. Travel fees may apply for locations outside our standard service area.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Our team typically arrives 60-90 minutes before your event starts to ensure everything is perfectly set up and tested before your guests arrive.",
  },
  {
    question: "Can we customize the photo frame?",
    answer:
      "Yes! All our packages include custom frame design with your event theme, colors, names, and dates. We work with you to create the perfect design.",
  },
  {
    question: "When do we receive digital files?",
    answer:
      "Your digital gallery is available within 24 hours after the event. You'll receive a private link to view and download all photos, GIFs, and boomerangs.",
  },
  {
    question: "Do you provide unlimited prints?",
    answer:
      "Our Unlimited Print and Luxury VIP packages include unlimited prints for every guest. Our Digital and Limited Print packages have different print allowances.",
  },
  {
    question: "Can you support corporate events?",
    answer:
      "Of course! We love corporate events. We can customize everything from the backdrop to the photo frames to match your company branding and event theme.",
  },
] as const;

export const clientGalleries = [
  {
    name: "Sarah & Michael",
    event: "Wedding Celebration",
    date: "August 2026",
    location: "Ubud, Bali",
  },
  {
    name: "Dewi & Raka",
    event: "Engagement Party",
    date: "July 2026",
    location: "Seminyak, Bali",
  },
  {
    name: "PT. Maju Bersama",
    event: "Annual Corporate Gala",
    date: "June 2026",
    location: "Nusa Dua, Bali",
  },
  {
    name: "Angela Putri",
    event: "Sweet Seventeen",
    date: "May 2026",
    location: "Sanur, Bali",
  },
] as const;
