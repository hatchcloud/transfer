import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Layout & shape
          "flex h-12 w-full rounded-lg border bg-surface-raised px-4",
          // Typography
          "text-base leading-6 text-text-strong",
          "placeholder:text-text-weak",
          // Default border
          "border-input-border",
          // Hover
          "hover:cursor-pointer hover:bg-input-hover-bg",
          // Focus — near-black border + double ring
          "focus-visible:outline-none",
          "focus-visible:border-input-focus-border",
          "focus-visible:shadow-[0_0_0_1px_black,0_0_0_4px_var(--color-input-focus-ring)]",
          // Error (aria-invalid="true") — red border + red double ring
          "aria-invalid:border-2 aria-invalid:border-input-error-border",
          "aria-invalid:shadow-[0_0_0_1px_var(--color-input-error-ring),0_0_0_4px_var(--color-input-error-ring-outer)]",
          // File input
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-strong",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
