"use client";

import type { Clue } from "@prisma/client";
import { Card, CardContent } from "~/components/ui/card";
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
  const invalidate = () => utils.clues.getAll.invalidate();

  const updateClue = api.clues.update.useMutation({ onSuccess: invalidate });
  const deleteClue = api.clues.delete.useMutation({ onSuccess: invalidate });

  const handleUpdate = (data: ClueChange) => {
    updateClue.mutate(
      { ...clue, ...data },
      {
        onSuccess: () => {
          utils.pcs
            .invalidate()
            .then(() => setEditing(false))
            .catch(console.error);
        },
      },
    );
  };
  const handleChangeVisibility = (revealed: boolean) =>
    updateClue.mutate({ ...clue, revealed });

  return editing ? (
    <Card>
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
