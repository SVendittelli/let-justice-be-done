"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-red)",
          "--normal-text": "var(--color-gold)",
          "--normal-border": "var(--color-gold)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
