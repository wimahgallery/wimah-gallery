export const queryKeys = {
  events: {
    all: ["events"] as const,
    list: (page: number) => ["events", page] as const,
    public: ["events-public"] as const,
    album: (page: number, search: string) => ["events-album", page, search] as const,
    dashboard: ["dash-events"] as const,
  },
  pricing: {
    all: ["pricing-packages"] as const,
    list: (page: number) => ["pricing-packages", page] as const,
    public: ["pricing-packages-public"] as const,
    dashboard: ["dash-pricing"] as const,
  },
  testimonials: {
    all: ["testimonials"] as const,
    list: (page: number) => ["testimonials", page] as const,
    public: ["testimonials-public"] as const,
    dashboard: ["dash-testimonials"] as const,
  },
  faqs: {
    all: ["faqs"] as const,
    list: (page: number) => ["faqs", page] as const,
    public: ["faqs-public"] as const,
    dashboard: ["dash-faqs"] as const,
  },
} as const
