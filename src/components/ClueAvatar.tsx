import type { Clue } from "@prisma/client";
import { Search, Unlink } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

type Props = { clue: Clue; editable: boolean; onUnlink: (id: string) => void };

export default function ClueAvatar({ clue, editable, onUnlink }: Props) {
  return (
    <div className="flex w-full items-center">
      <Avatar>
        <AvatarFallback>
          <Search size={20} />
        </AvatarFallback>
      </Avatar>
      <Link href={`/clues#${clue.id}`} className="flex-grow">
        <Button variant="link">{clue.title}</Button>
      </Link>
      {editable && (
        <Button variant="ghost" size="icon" onClick={() => onUnlink(clue.id)}>
          <Unlink />
          <span className="sr-only">Unlink</span>
        </Button>
      )}
    </div>
  );
}
