export interface Event {
  id: string
  couple_name: string
  event_name: string
  event_date: string
  location: string
  images_source: string | null
  image_url: string | null
  image_file_id: string | null
  sort_order: number
  visible: boolean
  created_at: string
}

export interface PricingPackage {
  id: string
  type: string
  hours: number
  price: number
  discount: number
  discounted_price: number
  print_count_limit: number | null
  sort_order: number
  visible: boolean
  favorite: boolean
}

export interface Testimonial {
  id: string
  message: string
  username: string
  role: string
  image_url: string | null
  image_file_id: string | null
  visible: boolean
  created_at: string
}

export interface Faq {
  id: string
  question: string
  answer: string
  sort_order: number
  visible: boolean
  created_at: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}
