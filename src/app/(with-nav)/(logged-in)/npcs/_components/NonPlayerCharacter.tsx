import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Toggle } from "~/components/ui/toggle";
import { api, type RouterOutputs } from "~/trpc/react";
import { Eye, EyeOff } from "lucide-react";

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
  const utils = api.useUtils();
  const invalidate = () => utils.npcs.invalidate();

  const updateNpc = api.npcs.update.useMutation({ onSuccess: invalidate });
  const deleteNpc = api.npcs.delete.useMutation({ onSuccess: invalidate });

  const onUpdate = (revealed: boolean) =>
    updateNpc.mutate({ ...npc, revealed });

  return (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>{npc.name}</CardTitle>
        <CardDescription>{npc.moniker}</CardDescription>
        {editable && (
          <CardAction className="flex gap-2">
            {deletable && (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteNpc.mutate(npc.id)}
              >
                Delete
              </Button>
            )}
            <Toggle
              variant="outline"
              size="sm"
              defaultPressed={npc.revealed}
              onPressedChange={onUpdate}
              aria-label="Toggle visibility"
            >
              {npc.revealed ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
            </Toggle>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>{npc.description}</CardContent>
    </Card>
  );
}
