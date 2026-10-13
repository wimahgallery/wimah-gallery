import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
}

export async function getApiErrorMessage(res: Response, fallback: string) {
  if (res.status === 413) {
    return "File or payload too large. Max upload size is 4MB."
  }
  const contentType = res.headers.get("content-type") ?? ""
  if (contentType.includes("application/json")) {
    try {
      const data = await res.json()
      return data.error || fallback
    } catch {
      return fallback
    }
  }
  const text = await res.text().catch(() => "")
  return text.trim() || fallback
}
