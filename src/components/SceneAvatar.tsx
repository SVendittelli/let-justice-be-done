import type { CrimeScene } from "@prisma/client";
import { DoorOpen, Unlink } from "lucide-react";
import Link from "next/link";
import CrimeSceneHover from "./CrimeSceneHover";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type Props = {
  crimeScene: CrimeScene;
  editable: boolean;
  onUnlink: (id: string) => void;
};

export default function SceneAvatar({ crimeScene, editable, onUnlink }: Props) {
  return (
    <div className="flex w-full items-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            href={`/crime-scenes#${crimeScene.id}`}
            className="flex flex-grow"
          >
            <Avatar>
              <AvatarFallback>
                <DoorOpen size={20} />
              </AvatarFallback>
            </Avatar>
            <Button variant="link">{crimeScene.name}</Button>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="prose">
          <CrimeSceneHover crimeScene={crimeScene} />
        </HoverCardContent>
      </HoverCard>
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
