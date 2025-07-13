import type { CrimeScene } from "@prisma/client";
import { DoorOpen, Unlink } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

type Props = {
  crimeScene: CrimeScene;
  editable: boolean;
  onUnlink: (id: string) => void;
};

export default function SceneAvatar({ crimeScene, editable, onUnlink }: Props) {
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
      {editable && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onUnlink(crimeScene.id)}
        >
          <Unlink />
          <span className="sr-only">Unlink</span>
        </Button>
      )}
    </div>
  );
}
