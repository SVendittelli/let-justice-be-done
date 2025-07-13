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
import { useState } from "react";
import ClueCard from "./ClueCard";
import ClueForm, { type ClueChange } from "./ClueForm";

type Props = {
  clue: RouterOutputs["clues"]["getAll"][0];
  editable: boolean;
  deletable: boolean;
};

export default function Clue({
  clue,
  editable = false,
  deletable = false,
}: Props) {
  const [editing, setEditing] = useState(false);

  const utils = api.useUtils();
  const onSuccess = () => utils.invalidate().then(() => setEditing(false));

  const updateClue = api.clues.update.useMutation({ onSuccess });
  const deleteClue = api.clues.delete.useMutation({ onSuccess });
  const unlinkClue = api.clues.unlink.useMutation({ onSuccess });

  const handleUpdate = (data: ClueChange) => {
    updateClue.mutate({ ...clue, ...data });
  };
  const handleChangeVisibility = (revealed: boolean) =>
    updateClue.mutate({ ...clue, revealed });

  return editing ? (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>Edit Clue</CardTitle>
        <CardAction>
          <Button onClick={() => setEditing(false)}>Cancel</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ClueForm
          defaultValues={clue}
          onSubmit={handleUpdate}
          isPending={updateClue.isPending}
        />
      </CardContent>
    </Card>
  ) : (
    <ClueCard
      clue={clue}
      editable={editable}
      onEdit={() => setEditing(true)}
      deletable={deletable}
      onDelete={() => deleteClue.mutate(clue.id)}
      onChangeVisibility={handleChangeVisibility}
      onUnlink={({ crimeScenes, npcs }) =>
        unlinkClue.mutate({ id: clue.id, crimeScenes, npcs })
      }
    />
  );
}
