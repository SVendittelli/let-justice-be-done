"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cn } from "~/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium hover:bg-gold-bright hover:text-red-dark disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-red data-[state=on]:text-gold [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-red focus-visible:ring-red-light/40 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-red-light/20 aria-invalid:border-red-light whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-red bg-transparent shadow-xs hover:bg-gold-bright hover:text-red-dark",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
