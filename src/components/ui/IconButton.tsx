import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "overlay" | "ghost"
  size?: "sm" | "md" | "lg"
}

const variantStyles: Record<string, string> = {
  default: "bg-background border border-border text-text-primary hover:border-accent/30 hover:bg-accent/5",
  overlay: "bg-white/10 text-white hover:bg-white/20",
  ghost: "text-text-secondary hover:text-text-primary hover:bg-accent/5",
}

const sizeStyles: Record<string, string> = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = "default", size = "md", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-colors",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    )
  }
)

IconButton.displayName = "IconButton"

export { IconButton, type IconButtonProps }
