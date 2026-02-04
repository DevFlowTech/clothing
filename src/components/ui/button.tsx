import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none border-2 border-primary",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-hard hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0px_0px_var(--color-accent)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-hard",
        outline:
          "bg-background text-foreground hover:bg-accent hover:text-accent-foreground shadow-hard",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "border-transparent hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline border-none shadow-none",
        // Brutalist specific
        brutal:
          "bg-accent text-accent-foreground hover:bg-accent/90 shadow-hard",
        "brutal-inverse":
          "bg-foreground text-background hover:bg-foreground/90 shadow-hard hover:shadow-[6px_6px_0px_0px_var(--color-accent)]",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 px-4 text-xs",
        lg: "h-14 px-10 text-base",
        icon: "h-12 w-12",
        xl: "h-16 px-12 text-lg border-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? "LOADING..." : children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
