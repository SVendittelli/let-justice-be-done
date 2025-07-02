import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { RouterOutputs } from "~/trpc/react";

type Character = RouterOutputs["pcs"]["getAll"][0];
type Props = { character: Character };

export default function PlayerCharacter({ character }: Props) {
  return (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>
          {character.name} ({character.pronouns})
        </CardTitle>
        <CardDescription className="flex gap-2">
          {character.traits.map((trait) => (
            <Badge key={trait} variant="outline">
              {trait}
            </Badge>
          ))}
        </CardDescription>
      </CardHeader>
      <CardContent>{character.description}</CardContent>
    </Card>
  );
}
