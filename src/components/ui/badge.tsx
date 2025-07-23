import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  "aria-invalid:ring-red-500/20 aria-invalid:border-red-500 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border border-red px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-red-dark focus-visible:ring-[3px] focus-visible:ring-red-dark/50 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gold text-red [a&]:hover:bg-gold/90",
        secondary: "[a&]:hover:red/90 border-transparent bg-red text-gold",
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
