import type { CrimeScene } from "@prisma/client";
import { DoorOpen } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

type Props = { crimeScene: CrimeScene };

export default function SceneAvatar({ crimeScene }: Props) {
  return (
    <div className="flex items-center">
      <Avatar>
        <AvatarFallback>
          <DoorOpen size={20} />
        </AvatarFallback>
      </Avatar>
      <Link href="/crime-scenes">
        <Button variant="link">{crimeScene.name}</Button>
      </Link>
    </div>
  );
}
