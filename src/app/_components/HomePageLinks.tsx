"use client";

import { api } from "~/trpc/react";
import HomePageLink from "./HomePageLink";

export default function HomePageLinks() {
  const pc = api.pcs.getCurrent.useQuery();

  let links: { href: string; label: string }[] = [];
  if (pc.data) {
    links = [
      { href: "/character", label: "Character" },
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
