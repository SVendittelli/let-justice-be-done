import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border border-red px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-red-dark focus-visible:ring-red-dark/50 focus-visible:ring-[3px] aria-invalid:ring-red-500/20 aria-invalid:border-red-500 transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gold text-red [a&]:hover:bg-gold/90",
        secondary: "border-transparent bg-red text-gold [a&]:hover:red/90",
        outline: "text-red [a&]:hover:bg-gold-bright [a&]:hover:text-red-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
