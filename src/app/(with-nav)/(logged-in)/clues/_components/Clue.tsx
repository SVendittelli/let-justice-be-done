"use client";

import type { Clue } from "@prisma/client";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import { useState } from "react";
import ClueCard from "./ClueCard";
import ClueForm, { type ClueChange } from "./ClueForm";

type Props = { clue: Clue; editable: boolean; deletable: boolean };

export default function Clue({
  clue,
  editable = false,
  deletable = false,
}: Props) {
  const [editing, setEditing] = useState(false);

  const utils = api.useUtils();
  const invalidate = () =>
    utils.clues.getAll.invalidate().then(() => setEditing(false));

  const updateClue = api.clues.update.useMutation({ onSuccess: invalidate });
  const deleteClue = api.clues.delete.useMutation({ onSuccess: invalidate });

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
    />
  );
}
