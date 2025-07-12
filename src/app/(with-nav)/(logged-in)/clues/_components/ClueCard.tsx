import type { Clue } from "@prisma/client";
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
  clue: Clue;
  editable: boolean;
  onEdit: () => void;
  deletable: boolean;
  onDelete: () => void;
  onChangeVisibility: (visible: boolean) => void;
};

export default function ClueCard({
  clue,
  editable,
  onEdit,
  deletable,
  onDelete,
  onChangeVisibility,
}: Props) {
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
    </Card>
  );
}
