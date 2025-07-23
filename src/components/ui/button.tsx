import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-white focus-visible:ring-[3px] focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-red-light aria-invalid:ring-red-light/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-red text-gold shadow-xs hover:bg-red/90",
        destructive:
          "bg-red-light text-white shadow-xs hover:bg-red-light/80 focus-visible:ring-red-light/30",
        outline:
          "border bg-gold shadow-xs hover:bg-gold-bright hover:text-red-dark",
        secondary: "bg-red-medium text-gold shadow-xs hover:bg-red-medium/80",
        ghost: "hover:bg-gold-bright hover:text-red-dark",
        link: "cursor-pointer text-red-dark underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
