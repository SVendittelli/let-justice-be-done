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
import NonPlayerCharacterCard from "./NonPlayerCharacterCard";
import NonPlayerCharacterForm, {
  type NpcChange,
} from "./NonPlayerCharacterForm";

type Props = {
  npc: RouterOutputs["npcs"]["getAll"][0];
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
  const onSuccess = () => utils.invalidate().then(() => setEditing(false));

  const updateNpc = api.npcs.update.useMutation({ onSuccess });
  const deleteNpc = api.npcs.delete.useMutation({ onSuccess });
  const unlinkNpc = api.npcs.unlink.useMutation({ onSuccess });

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
      onUnlink={({ clues, crimeScenes }) =>
        unlinkNpc.mutate({ id: npc.id, clues, crimeScenes })
      }
    />
  );
}
