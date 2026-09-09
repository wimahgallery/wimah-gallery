import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export type LoginInput = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export type SignupInput = z.infer<typeof signupSchema>

export const testimonialSchema = z.object({
  message: z.string().min(1, "Message is required"),
  username: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  visible: z.boolean(),
})

export type TestimonialInput = z.infer<typeof testimonialSchema>

export const faqSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
})

export type FaqInput = z.infer<typeof faqSchema>

export const eventSchema = z.object({
  couple_name: z.string().min(1, "Couple name is required"),
  event_name: z.string().min(1, "Event name is required"),
  event_date: z.string().min(1, "Date is required"),
  location: z.string().min(1, "Location is required"),
  images_source: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
})

export type EventInput = z.infer<typeof eventSchema>

export const pricingPackageSchema = z.object({
  hours: z.number().min(1, "Hours must be at least 1"),
  price: z.number().min(0),
  discount: z.number().min(0).max(100),
  print_count_limit: z.number().min(0).optional(),
})

export type PricingPackageInput = z.infer<typeof pricingPackageSchema>
