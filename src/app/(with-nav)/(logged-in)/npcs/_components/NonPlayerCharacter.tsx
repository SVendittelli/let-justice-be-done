import { Button } from "~/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Toggle } from "~/components/ui/toggle";
import { api, type RouterOutputs } from "~/trpc/react";
import { Eye, EyeOff, Gavel, Trash, UserRoundSearch } from "lucide-react";
import Image from "next/image";

type Props = {
  npc: RouterOutputs["npcs"]["getAll"][0];
  editable: boolean;
  deletable: boolean;
};

export default function NonPlayerCharacter({ npc, deletable = false }: Props) {
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
        <CardAction className="flex gap-2">
          {npc.type === "SUSPECT" ? <UserRoundSearch /> : <Gavel />}
          {deletable && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => deleteNpc.mutate(npc.id)}
            >
              <Trash />
            </Button>
          )}
          <Toggle
            variant="outline"
            size="icon"
            defaultPressed={npc.revealed}
            onPressedChange={onUpdate}
            aria-label="Toggle visibility"
          >
            {npc.revealed ? <Eye /> : <EyeOff />}
          </Toggle>
        </CardAction>
      </CardHeader>
      <CardContent>{npc.description}</CardContent>
      <CardFooter>
        <Image
          src={npc.imageUrl}
          blurDataURL={npc.imageBlurData}
          alt={`Portrait of ${npc.name}`}
          width={1024}
          height={1536}
          className="aspect-square w-full rounded-xl object-none object-top"
        />
      </CardFooter>
    </Card>
  );
}
