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
  const utils = api.useUtils();
  const invalidate = () => utils.scenes.getAll.invalidate();

  const updateScene = api.scenes.update.useMutation({ onSuccess: invalidate });
  const deleteScene = api.scenes.delete.useMutation({ onSuccess: invalidate });

  const onUpdate = (revealed: boolean) =>
    updateScene.mutate({ ...crimeScene, revealed });

  return (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>{crimeScene.name}</CardTitle>
        {editable && (
          <CardAction className="flex gap-2">
            {deletable && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteScene.mutate(crimeScene.id)}
              >
                Delete
              </Button>
            )}
            <Toggle
              variant="outline"
              size="sm"
              defaultPressed={crimeScene.revealed}
              onPressedChange={onUpdate}
              aria-label="Toggle visibility"
            >
              {crimeScene.revealed ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
            </Toggle>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>{crimeScene.description}</CardContent>
    </Card>
  );
}
