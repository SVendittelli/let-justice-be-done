import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Switch } from "~/components/ui/switch";
import type { RouterOutputs } from "~/trpc/react";

type Props = { clue: RouterOutputs["clues"]["getById"] };

export default function Clue({ clue }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{clue?.title}</CardTitle>
        <CardAction>
          <Switch checked={clue?.revealed} />
        </CardAction>
      </CardHeader>
      <CardContent>{clue?.text}</CardContent>
    </Card>
  );
}
