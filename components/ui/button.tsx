import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground shadow-[0_10px_24px_-12px_rgba(156,107,86,0.7)] hover:bg-accent-hover hover:-translate-y-0.5",
        secondary:
          "border border-ink/15 bg-paper text-ink hover:border-ink/30 hover:bg-white",
        ghost: "text-ink hover:bg-accent-soft/60",
        ink: "bg-ink text-paper hover:bg-ink/90 hover:-translate-y-0.5",
      },
      size: {
        sm: "h-9 px-4 text-xs uppercase tracking-[0.16em]",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base h-12",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}
