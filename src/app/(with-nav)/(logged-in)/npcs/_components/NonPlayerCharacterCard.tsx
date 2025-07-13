import ClueAvatar from "~/components/ClueAvatar";
import SceneAvatar from "~/components/SceneAvatar";
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
import type { RouterOutputs } from "~/trpc/react";
import {
  Eye,
  EyeOff,
  Gavel,
  Link,
  Pencil,
  Trash,
  UserRoundSearch,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import NonPlayerCharacterLinkForm from "./NonPlayerCharacterLinkForm";

type Props = {
  npc: RouterOutputs["npcs"]["getAll"][0];
  editable: boolean;
  onEdit: () => void;
  deletable: boolean;
  onDelete: () => void;
  onChangeVisibility: (visible: boolean) => void;
  onUnlink: (data: { clues?: string[]; crimeScenes?: string[] }) => void;
};

export default function NonPlayerCharacterCard({
  npc,
  editable,
  onEdit,
  deletable,
  onDelete,
  onChangeVisibility,
  onUnlink,
}: Props) {
  const [showLinkForm, setShowLinkForm] = useState(false);

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
                defaultPressed={showLinkForm}
                onPressedChange={setShowLinkForm}
                aria-label="Toggle link form"
              >
                <Link />
              </Toggle>
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
      <CardFooter className="flex flex-col items-start">
        <Image
          src={npc.imageUrl}
          blurDataURL={npc.imageBlurData}
          alt={`Portrait of ${npc.name}`}
          width={1024}
          height={1536}
          className="aspect-square w-full rounded-xl object-none object-top"
        />
        {(!!npc.crimeScenes.length || !!npc.clues.length) && (
          <div className="mb-2 font-semibold">Related Crime Scenes & Clues</div>
        )}
        {npc.crimeScenes.map((scene) => (
          <SceneAvatar
            key={scene.id}
            crimeScene={scene}
            editable={editable}
            onUnlink={(id) => onUnlink({ crimeScenes: [id] })}
          />
        ))}
        {npc.clues.map((clue) => (
          <ClueAvatar
            key={clue.id}
            clue={clue}
            editable={editable}
            onUnlink={(id) => onUnlink({ clues: [id] })}
          />
        ))}
        {showLinkForm && <NonPlayerCharacterLinkForm npc={npc} />}
      </CardFooter>
    </Card>
  );
}
