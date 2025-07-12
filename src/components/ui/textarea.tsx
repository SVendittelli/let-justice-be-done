import { cn } from "~/lib/utils";
import * as React from "react";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-red-medium bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-red/40 focus-visible:border-red-dark focus-visible:ring-[3px] focus-visible:ring-red-dark/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-light/20 aria-invalid:ring-red-light/20 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
