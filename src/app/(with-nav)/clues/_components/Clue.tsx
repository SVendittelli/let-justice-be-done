"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Toggle } from "~/components/ui/toggle";
import { api, type RouterOutputs } from "~/trpc/react";
import { Eye, EyeOff } from "lucide-react";

type Clue = RouterOutputs["clues"]["getAll"][0];
type Props = { clue: Clue; editable: boolean; deletable: boolean };

export default function Clue({
  clue,
  editable = false,
  deletable = false,
}: Props) {
  const utils = api.useUtils();
  const invalidate = (input: Clue) =>
    Promise.all([
      utils.clues.getAll.invalidate(),
      utils.clues.getById.invalidate(input.id),
    ]);

  const updateClue = api.clues.update.useMutation({ onSuccess: invalidate });
  const deleteClue = api.clues.delete.useMutation({ onSuccess: invalidate });

  const onUpdate = (revealed: boolean) =>
    updateClue.mutate({ ...clue, revealed });

  return (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>{clue?.title}</CardTitle>
        {editable && (
          <CardAction className="flex gap-2">
            {deletable && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteClue.mutate(clue.id)}
              >
                Delete
              </Button>
            )}
            <Toggle
              variant="outline"
              size="sm"
              defaultPressed={clue.revealed}
              onPressedChange={onUpdate}
              aria-label="Toggle visibility"
            >
              {clue.revealed ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
            </Toggle>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>{clue?.text}</CardContent>
    </Card>
  );
}
