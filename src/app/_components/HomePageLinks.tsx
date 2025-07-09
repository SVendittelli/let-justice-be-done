"use client";

import { api } from "~/trpc/react";
import HomePageLink from "./HomePageLink";

type Props = { isAdmin: boolean };

export default function HomePageLinks({ isAdmin }: Props) {
  const pc = api.pcs.getCurrent.useQuery();

  let links: { href: string; label: string }[] = isAdmin
    ? [
        { href: "/admin", label: "Admin Panel" },
        { href: "/billboard", label: "Billboard" },
      ]
    : [];
  if (pc.data || isAdmin) {
    links = links.concat([
      { href: "/characters", label: "PCs" },
      { href: "/clues", label: "Clues" },
      { href: "/crime-scenes", label: "Crime Scenes" },
      { href: "/npcs", label: "NPCs" },
      { href: "/rules", label: "Rules" },
    ]);
  } else {
    links = [
      { href: "/characters", label: "Create Character" },
      { href: "/rules", label: "Rules" },
    ];
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
