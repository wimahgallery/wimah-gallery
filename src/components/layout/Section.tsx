import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "surface" | "accent" | "dark"
  texture?: "dots" | "noise" | "none"
}

const variantStyles: Record<string, string> = {
  default: "bg-background",
  surface: "bg-surface",
  accent: "bg-accent text-background",
  dark: "bg-accent-dark text-background",
}

const textureStyles: Record<string, string> = {
  dots: "texture-dots",
  noise: "texture-noise",
  none: "",
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ variant = "default", texture = "none", className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative py-16 sm:py-20 lg:py-28",
          variantStyles[variant],
          textureStyles[texture],
          className
        )}
        {...props}
      />
    )
  }
)

Section.displayName = "Section"

export { Section, type SectionProps }
