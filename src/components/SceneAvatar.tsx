import type { CrimeScene } from "@prisma/client";
import { DoorOpen, Unlink } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

type Props = { crimeScene: CrimeScene; onUnlink: (id: string) => void };

export default function SceneAvatar({ crimeScene, onUnlink }: Props) {
  return (
    <div className="flex w-full items-center">
      <Avatar>
        <AvatarFallback>
          <DoorOpen size={20} />
        </AvatarFallback>
      </Avatar>
      <Link href="/crime-scenes" className="flex-grow">
        <Button variant="link">{crimeScene.name}</Button>
      </Link>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onUnlink(crimeScene.id)}
      >
        <Unlink />
        <span className="sr-only">Unlink</span>
      </Button>
    </div>
  );
}
