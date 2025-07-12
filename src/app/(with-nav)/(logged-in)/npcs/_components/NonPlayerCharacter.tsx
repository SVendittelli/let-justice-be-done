import type { NonPlayerCharacter } from "@prisma/client";
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
import NonPlayerCharacterCard from "./NonPlayerCharacterCard";
import NonPlayerCharacterForm, {
  type NpcChange,
} from "./NonPlayerCharacterForm";

type Props = {
  npc: NonPlayerCharacter;
  editable: boolean;
  deletable: boolean;
};

export default function NonPlayerCharacter({
  npc,
  editable = false,
  deletable = false,
}: Props) {
  const [editing, setEditing] = useState(false);

  const utils = api.useUtils();
  const onSuccess = () => utils.npcs.invalidate().then(() => setEditing(false));

  const updateNpc = api.npcs.update.useMutation({ onSuccess });
  const deleteNpc = api.npcs.delete.useMutation({ onSuccess });

  const handleUpdate = (data: NpcChange) => {
    updateNpc.mutate({ ...npc, ...data });
  };
  const handleChangeVisibility = (revealed: boolean) =>
    updateNpc.mutate({ ...npc, revealed });

  return editing ? (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>Edit NPC</CardTitle>
        <CardAction>
          <Button onClick={() => setEditing(false)}>Cancel</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <NonPlayerCharacterForm
          defaultValues={npc}
          onSubmit={handleUpdate}
          isPending={updateNpc.isPending}
        />
      </CardContent>
    </Card>
  ) : (
    <NonPlayerCharacterCard
      npc={npc}
      editable={editable}
      onEdit={() => setEditing(true)}
      deletable={deletable}
      onDelete={() => deleteNpc.mutate(npc.id)}
      onChangeVisibility={handleChangeVisibility}
    />
  );
}
