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
      className="rounded-full border-2 bg-red-medium px-10 py-3 font-semibold no-underline transition hover:bg-red-light"
    >
      {children}
    </Link>
  );
}
