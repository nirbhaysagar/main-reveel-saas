import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transform active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/25 focus:shadow-lg focus:shadow-gray-900/25",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 hover:shadow-lg hover:shadow-red-500/25 focus:shadow-lg focus:shadow-red-500/25",
        outline:
          "border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900 hover:shadow-md hover:shadow-gray-200/50 focus:shadow-md focus:shadow-gray-200/50",
        secondary:
          "bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-sm hover:shadow-gray-200/50 focus:shadow-sm focus:shadow-gray-200/50",
        ghost:
          "hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm hover:shadow-gray-200/50 focus:shadow-sm focus:shadow-gray-200/50",
        link: "text-blue-600 underline-offset-4 hover:underline hover:text-blue-700",
      },
      size: {
        default: "h-10 px-6 py-2 has-[>svg]:px-5",
        sm: "h-8 rounded-xl gap-1.5 px-4 has-[>svg]:px-3 text-xs",
        lg: "h-12 rounded-2xl px-8 has-[>svg]:px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
