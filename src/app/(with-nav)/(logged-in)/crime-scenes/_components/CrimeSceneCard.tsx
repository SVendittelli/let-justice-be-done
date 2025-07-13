import ClueAvatar from "~/components/ClueAvatar";
import NpcAvatar from "~/components/NpcAvatar";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Toggle } from "~/components/ui/toggle";
import type { RouterOutputs } from "~/trpc/react";
import { Eye, EyeOff, Link, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import CrimeSceneLinkForm from "./CrimeSceneLinkForm";

type Props = {
  crimeScene: RouterOutputs["scenes"]["getAll"][0];
  editable: boolean;
  onEdit: () => void;
  deletable: boolean;
  onDelete: () => void;
  onChangeVisibility: (visible: boolean) => void;
  onUnlink: (data: { clues?: string[]; npcs?: string[] }) => void;
};

export default function CrimeSceneCard({
  crimeScene,
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
        <CardTitle>{crimeScene.name}</CardTitle>
        {editable && (
          <CardAction className="flex gap-2">
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
              defaultPressed={crimeScene.revealed}
              onPressedChange={onChangeVisibility}
              aria-label="Toggle visibility"
            >
              {crimeScene.revealed ? <Eye /> : <EyeOff />}
            </Toggle>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>{crimeScene.description}</CardContent>
      <CardFooter className="flex flex-col items-start">
        {(!!crimeScene.npcs.length || !!crimeScene.clues.length) && (
          <div className="mb-2 font-semibold">Related NPCs & Clues</div>
        )}
        {crimeScene.npcs.map((npc) => (
          <NpcAvatar
            key={npc.id}
            npc={npc}
            editable={editable}
            onUnlink={(id) => onUnlink({ npcs: [id] })}
          />
        ))}
        {crimeScene.clues.map((clue) => (
          <ClueAvatar
            key={clue.id}
            clue={clue}
            editable={editable}
            onUnlink={(id) => onUnlink({ clues: [id] })}
          />
        ))}
        {showLinkForm && <CrimeSceneLinkForm crimeScene={crimeScene} />}
      </CardFooter>
    </Card>
  );
}
