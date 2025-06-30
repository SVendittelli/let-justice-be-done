"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api, type RouterOutputs } from "~/trpc/react";

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

  const onUpdate = () =>
    updateClue.mutate({ ...clue, revealed: !clue.revealed });

  return (
    <Card className="w-full min-w-sm sm:w-sm">
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
            <Button size="sm" onClick={() => onUpdate()}>
              {clue.revealed ? "Hide" : "Show"}
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>{clue?.text}</CardContent>
    </Card>
  );
}
