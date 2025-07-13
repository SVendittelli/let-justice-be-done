import NpcAvatar from "~/components/NpcAvatar";
import SceneAvatar from "~/components/SceneAvatar";
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
import ClueLinkForm from "./ClueLinkForm";

type Props = {
  clue: RouterOutputs["clues"]["getAll"][0];
  editable: boolean;
  onEdit: () => void;
  deletable: boolean;
  onDelete: () => void;
  onChangeVisibility: (visible: boolean) => void;
  onUnlink: (data: { crimeScenes?: string[]; npcs?: string[] }) => void;
};

export default function ClueCard({
  clue,
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
        <CardTitle>{clue.title}</CardTitle>
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
              defaultPressed={clue.revealed}
              onPressedChange={onChangeVisibility}
              aria-label="Toggle visibility"
            >
              {clue.revealed ? <Eye /> : <EyeOff />}
            </Toggle>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>{clue.text}</CardContent>
      <CardFooter className="flex flex-col items-start">
        {(!!clue.crimeScenes.length || !!clue.npcs.length) && (
          <div className="mb-2 font-semibold">Related NPCs & Crime Scenes</div>
        )}
        {clue.npcs.map((npc) => (
          <NpcAvatar
            key={npc.id}
            npc={npc}
            onUnlink={(id) => onUnlink({ npcs: [id] })}
          />
        ))}
        {clue.crimeScenes.map((scene) => (
          <SceneAvatar
            key={scene.id}
            crimeScene={scene}
            onUnlink={(id) => onUnlink({ crimeScenes: [id] })}
          />
        ))}
        {showLinkForm && <ClueLinkForm clue={clue} />}
      </CardFooter>
    </Card>
  );
}
