import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "surface" | "accent"
}

const variantStyles: Record<string, string> = {
  default: "bg-surface border border-border",
  surface: "bg-surface-secondary/40 border border-border",
  accent: "bg-accent text-background",
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl sm:rounded-3xl",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Card.displayName = "Card"

type CardHeaderProps = HTMLAttributes<HTMLDivElement>
type CardContentProps = HTMLAttributes<HTMLDivElement>
type CardFooterProps = HTMLAttributes<HTMLDivElement>

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-5 sm:p-6", className)} {...props} />
  )
)
CardHeader.displayName = "CardHeader"

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-5 sm:p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-5 sm:p-6 pt-0", className)} {...props} />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardContent, CardFooter, type CardProps }
