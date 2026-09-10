import Lenis from "lenis"

let lenisInstance: Lenis | null = null

export function setLenisInstance(lenis: Lenis | null) {
  lenisInstance = lenis
}

export function smoothScrollTo(target: number | string | HTMLElement, options?: { offset?: number; duration?: number }) {
  const offset = options?.offset ?? 0

  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: options?.duration ?? 1.5 })
    return
  }

  let y = 0
  if (typeof target === "number") {
    y = target
  } else if (typeof target === "string") {
    const el = document.getElementById(target.replace("#", ""))
    if (el) {
      y = el.getBoundingClientRect().top + window.scrollY + offset
    }
  } else if (target instanceof HTMLElement) {
    y = target.getBoundingClientRect().top + window.scrollY + offset
  }

  window.scrollTo({ top: y, behavior: "smooth" })
}
