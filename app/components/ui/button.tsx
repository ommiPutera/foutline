import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"
import { cn } from "~/lib/utils.ts"
import { AnchorOrLink } from "~/utils/misc.tsx"

const variants = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:bg-primary/90",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  outline:
    "border border-input hover:bg-accent hover:text-accent-foreground",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost:
    "hover:bg-accent focus-visible:bg-accent",
  link:
    "text-primary underline-offset-4 hover:underline",
}

const sizes = {
  default: "h-11 md:h-9 px-4 rounded-md text-sm",
  sm: "h-10 md:h-8 px-3 rounded-md text-xs",
  icon: "h-10 w-10",
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-[1.5px] focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: { ...variants },
      size: { ...sizes },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(function Button({ className, variant, size, asChild = false, ...props }, ref) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})

/**
 * A button that looks like a link
 */
const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<typeof AnchorOrLink> & ButtonProps
>(function ButtonLink({ children, ...props }, ref) {
  const { variant, size } = props
  return (
    <Button
      asChild
      variant={variant}
      size={size}
    >
      <AnchorOrLink ref={ref} {...props}>{children}</AnchorOrLink>
    </Button>
  )
})

export { Button, ButtonLink, buttonVariants }

