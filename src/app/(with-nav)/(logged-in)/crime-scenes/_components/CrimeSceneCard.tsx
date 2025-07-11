import type { CrimeScene } from "@prisma/client";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Toggle } from "~/components/ui/toggle";
import { Eye, EyeOff, Pencil, Trash } from "lucide-react";

type Props = {
  crimeScene: CrimeScene;
  editable: boolean;
  onEdit: () => void;
  deletable: boolean;
  onDelete: () => void;
  onChangeVisibility: (visible: boolean) => void;
};

export default function CrimeSceneCard({
  crimeScene,
  editable,
  onEdit,
  deletable,
  onDelete,
  onChangeVisibility,
}: Props) {
  return (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>{crimeScene.name}</CardTitle>
        {editable && (
          <CardAction className="flex gap-2">
            {deletable && (
              <Button variant="destructive" size="icon" onClick={onDelete}>
                <Trash />
              </Button>
            )}
            <Button size="icon" onClick={onEdit}>
              <Pencil />
            </Button>
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
    </Card>
  );
}
