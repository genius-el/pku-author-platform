import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex max-w-full items-center justify-center gap-2 whitespace-normal rounded-full text-center text-sm font-semibold cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-55 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-lift hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-charcoal/20 bg-background text-foreground shadow-sm hover:border-primary hover:bg-pink-soft",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-cream-deep",
        ghost: "text-foreground hover:bg-secondary hover:text-primary",
        link: "text-primary underline-offset-4 hover:underline",
        charcoal: "bg-charcoal text-primary-foreground shadow-soft hover:bg-charcoal/90",
        butter: "bg-accent text-accent-foreground shadow-soft hover:bg-accent/85",
        quiet: "bg-cream text-secondary-foreground hover:bg-cream-deep",
      },
      size: {
        default: "min-h-11 px-5 py-2.5",
        sm: "min-h-9 px-4 py-2 text-xs",
        lg: "min-h-12 px-7 py-3 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
