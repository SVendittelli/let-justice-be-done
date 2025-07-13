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
import CrimeSceneCard from "./CrimeSceneCard";
import CrimeSceneForm, { type CrimeSceneChange } from "./CrimeSceneForm";

type Props = {
  crimeScene: RouterOutputs["scenes"]["getAll"][0];
  editable: boolean;
  deletable: boolean;
};

export default function CrimeScene({
  crimeScene,
  editable = false,
  deletable = false,
}: Props) {
  const [editing, setEditing] = useState(false);

  const utils = api.useUtils();
  const onSuccess = () => utils.invalidate().then(() => setEditing(false));

  const updateScene = api.scenes.update.useMutation({ onSuccess });
  const deleteScene = api.scenes.delete.useMutation({ onSuccess });
  const unlinkScene = api.scenes.unlink.useMutation({ onSuccess });

  const handleUpdate = (data: CrimeSceneChange) => {
    updateScene.mutate({ ...crimeScene, ...data });
  };
  const handleChangeVisibility = (revealed: boolean) =>
    updateScene.mutate({ ...crimeScene, revealed });

  return editing ? (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>Edit Crime Scene</CardTitle>
        <CardAction>
          <Button onClick={() => setEditing(false)}>Cancel</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CrimeSceneForm
          defaultValues={crimeScene}
          onSubmit={handleUpdate}
          isPending={updateScene.isPending}
        />
      </CardContent>
    </Card>
  ) : (
    <CrimeSceneCard
      crimeScene={crimeScene}
      editable={editable}
      onEdit={() => setEditing(true)}
      deletable={deletable}
      onDelete={() => deleteScene.mutate(crimeScene.id)}
      onChangeVisibility={handleChangeVisibility}
      onUnlink={({ clues, npcs }) =>
        unlinkScene.mutate({ id: crimeScene.id, clues, npcs })
      }
    />
  );
}
