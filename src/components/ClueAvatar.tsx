import type { Clue } from "@prisma/client";
import { Search, Unlink } from "lucide-react";
import Link from "next/link";
import ClueHover from "./ClueHover";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type Props = { clue: Clue; editable: boolean; onUnlink: (id: string) => void };

export default function ClueAvatar({ clue, editable, onUnlink }: Props) {
  return (
    <div className="flex w-full items-center">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link href={`/clues#${clue.id}`} className="flex flex-grow">
            <Avatar>
              <AvatarFallback>
                <Search size={20} />
              </AvatarFallback>
            </Avatar>
            <Button variant="link">{clue.title}</Button>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="prose">
          <ClueHover clue={clue} />
        </HoverCardContent>
      </HoverCard>
      {editable && (
        <Button variant="ghost" size="icon" onClick={() => onUnlink(clue.id)}>
          <Unlink />
          <span className="sr-only">Unlink</span>
        </Button>
      )}
    </div>
  );
}
