import type { NonPlayerCharacter } from "@prisma/client";
import { Unlink } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

type Props = {
  npc: NonPlayerCharacter;
  editable: boolean;
  onUnlink: (id: string) => void;
};

export default function NpcAvatar({ npc, editable, onUnlink }: Props) {
  return (
    <div className="flex w-full items-center">
      <Avatar>
        <AvatarImage src={npc.imageUrl} className="object-cover object-top" />
        <AvatarFallback>
          {npc.name.charAt(0).toLocaleUpperCase()}
        </AvatarFallback>
      </Avatar>
      <Link href="/npcs" className="flex-grow">
        <Button variant="link">{npc.name}</Button>
      </Link>
      {editable && (
        <Button variant="ghost" size="icon" onClick={() => onUnlink(npc.id)}>
          <Unlink />
          <span className="sr-only">Unlink</span>
        </Button>
      )}
    </div>
  );
}
