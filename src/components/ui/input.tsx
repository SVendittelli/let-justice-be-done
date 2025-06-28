import { cn } from "~/lib/utils";
import * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-red-medium bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none selection:bg-red-dark selection:text-white placeholder:text-red/40 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-red-dark focus-visible:ring-[3px] focus-visible:ring-red-dark/50",
        "aria-invalid:ring-red-light/20",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
