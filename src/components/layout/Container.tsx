import { forwardRef, type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "wide" | "narrow"
}

const sizeStyles: Record<string, string> = {
  default: "max-w-[1200px] px-5 sm:px-8 lg:px-12",
  wide: "max-w-[1400px] px-5 sm:px-8 lg:px-16",
  narrow: "max-w-[800px] px-5 sm:px-8",
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ size = "default", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto", sizeStyles[size], className)}
        {...props}
      />
    )
  }
)

Container.displayName = "Container"

export { Container, type ContainerProps }
