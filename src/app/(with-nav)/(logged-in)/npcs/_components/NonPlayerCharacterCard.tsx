import type { NonPlayerCharacter } from "@prisma/client";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Toggle } from "~/components/ui/toggle";
import {
  Eye,
  EyeOff,
  Gavel,
  Pencil,
  Trash,
  UserRoundSearch,
} from "lucide-react";
import Image from "next/image";

type Props = {
  npc: NonPlayerCharacter;
  editable: boolean;
  onEdit: () => void;
  deletable: boolean;
  onDelete: () => void;
  onChangeVisibility: (visible: boolean) => void;
};

export default function NonPlayerCharacterCard({
  npc,
  editable,
  onEdit,
  deletable,
  onDelete,
  onChangeVisibility,
}: Props) {
  return (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>{npc.name}</CardTitle>
        <CardDescription>{npc.moniker}</CardDescription>
        <CardAction className="flex gap-2">
          {npc.type === "SUSPECT" ? <UserRoundSearch /> : <Gavel />}
          {editable && (
            <>
              {deletable && (
                <Button variant="destructive" size="icon" onClick={onDelete}>
                  <Trash />
                  <span className="sr-only">Delete</span>
                </Button>
              )}
              <Button size="icon" onClick={onEdit}>
                <Pencil />
                <span className="sr-only">Edit</span>
              </Button>
              <Toggle
                variant="outline"
                size="icon"
                defaultPressed={npc.revealed}
                onPressedChange={onChangeVisibility}
                aria-label="Toggle visibility"
              >
                {npc.revealed ? <Eye /> : <EyeOff />}
              </Toggle>
            </>
          )}
        </CardAction>
      </CardHeader>
      <CardContent>{npc.description}</CardContent>
      <CardFooter>
        <Image
          src={npc.imageUrl}
          blurDataURL={npc.imageBlurData}
          alt={`Portrait of ${npc.name}`}
          width={1024}
          height={1536}
          className="aspect-square w-full rounded-xl object-none object-top"
        />
      </CardFooter>
    </Card>
  );
}
