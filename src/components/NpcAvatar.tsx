import type { NonPlayerCharacter } from "@prisma/client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

type Props = { npc: NonPlayerCharacter };
export default function NpcAvatar({ npc }: Props) {
  return (
    <div className="flex items-center">
      <Avatar>
        <AvatarImage src={npc.imageUrl} className="object-cover object-top" />
        <AvatarFallback>
          {npc.name.charAt(0).toLocaleUpperCase()}
        </AvatarFallback>
      </Avatar>
      <Link href="/npcs">
        <Button variant="link">{npc.name}</Button>
      </Link>
    </div>
  );
}
