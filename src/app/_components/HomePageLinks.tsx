"use client";

import { api } from "~/trpc/react";
import HomePageLink from "./HomePageLink";

type Props = { isAdmin: boolean };

export default function HomePageLinks({ isAdmin }: Props) {
  const pc = api.pcs.getCurrent.useQuery();

  let links: { href: string; label: string }[] = [];
  if (pc.data || isAdmin) {
    links = [
      { href: "/characters", label: "PCs" },
      { href: "/clues", label: "Clues" },
      { href: "/crime-scenes", label: "Crime Scenes" },
      { href: "/npcs", label: "NPCs" },
    ];
  } else {
    links = [{ href: "/character", label: "Create Character" }];
  }

  return (
    <>
      {links.map(({ href, label }) => (
        <HomePageLink key={href} href={href}>
          {label}
        </HomePageLink>
      ))}
    </>
  );
}
