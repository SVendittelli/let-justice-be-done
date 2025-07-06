import { Badge } from "~/components/ui/badge";
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
import type { RouterOutputs } from "~/trpc/react";
import { Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type Character = RouterOutputs["pcs"]["getAll"][0];
type Props = { character: Character; showEdit: boolean; onEdit: () => void };

export default function CharacterCard({ character, showEdit, onEdit }: Props) {
  const name = character.user.name ?? character.user.email ?? character.userId;
  const initial =
    (character.user.name ?? character.user.email)
      ?.charAt(0)
      .toLocaleUpperCase() ?? "?";

  return (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle className="capitalize">
          {character.name} ({character.pronouns})
        </CardTitle>
        <CardDescription className="flex gap-2 capitalize">
          {character.traits.map((trait) => (
            <Badge key={trait} variant="outline">
              {trait}
            </Badge>
          ))}
        </CardDescription>
        {showEdit && (
          <CardAction>
            <Button variant="outline" onClick={onEdit}>
              <Pencil />
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>{character.description}</CardContent>
      <CardFooter>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={character.user.image ?? undefined} />
            <AvatarFallback>{initial}</AvatarFallback>
          </Avatar>
          {name}
        </div>
      </CardFooter>
    </Card>
  );
}
