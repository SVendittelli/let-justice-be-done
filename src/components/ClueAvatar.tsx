import type { Clue } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";

type Props = { clue: Clue };

export default function ClueAvatar({ clue }: Props) {
  return (
    <div className="flex items-center">
      <Avatar>
        <AvatarFallback>
          <Search size={20} />
        </AvatarFallback>
      </Avatar>
      <Link href="/clues">
        <Button variant="link">{clue.title}</Button>
      </Link>
    </div>
  );
}
