import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
}
