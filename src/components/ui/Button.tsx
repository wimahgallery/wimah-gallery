import { forwardRef, type ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "accent"
type ButtonSize = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-background hover:bg-accent-light hover:shadow-[0_4px_20px_rgba(124,132,114,0.25)]",
  secondary: "bg-background border border-border text-text-primary hover:border-accent/30 hover:bg-accent/5",
  outline: "border border-accent/30 text-accent hover:border-accent hover:bg-accent/5",
  ghost: "text-text-primary hover:bg-accent/5 hover:text-accent",
  accent: "bg-accent-dark text-background hover:bg-accent-dark/90",
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-2.5 text-sm",
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,colors] duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize }
