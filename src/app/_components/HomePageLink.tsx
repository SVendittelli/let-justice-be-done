import Link from "next/link";
import type { ReactNode } from "react";

export type HomePageLinkProps = {
  href: string;
  children: ReactNode;
};

export default function HomePageLink({ href, children }: HomePageLinkProps) {
  return (
    <Link
      href={href}
      className="rounded-full border-2 bg-red-medium px-8 py-2 font-semibold no-underline transition hover:bg-red-light sm:px-10 sm:py-3"
    >
      {children}
    </Link>
  );
}
