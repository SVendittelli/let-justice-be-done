import type { NonPlayerCharacter } from "@prisma/client";
import { Unlink } from "lucide-react";
import Link from "next/link";
import NpcHover from "./NpcHover";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type Props = {
  npc: NonPlayerCharacter;
  editable: boolean;
  onUnlink: (id: string) => void;
};

export default function NpcAvatar({ npc, editable, onUnlink }: Props) {
  return (
    <div className="flex w-full items-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link href={`/npcs#${npc.id}`} className="flex flex-grow">
            <Avatar>
              <AvatarImage
                src={npc.imageUrl}
                alt={`${npc.name} avatar`}
                className="object-cover object-top"
              />
              <AvatarFallback>
                {npc.name.charAt(0).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button variant="link">{npc.name}</Button>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="prose">
          <NpcHover npc={npc} />
        </HoverCardContent>
      </HoverCard>
      {editable && (
        <Button variant="ghost" size="icon" onClick={() => onUnlink(npc.id)}>
          <Unlink />
          <span className="sr-only">Unlink</span>
        </Button>
      )}
    </div>
  );
}
