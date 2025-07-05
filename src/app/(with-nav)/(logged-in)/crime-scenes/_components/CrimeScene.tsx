import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { RouterOutputs } from "~/trpc/react";

type Props = { crimeScene: RouterOutputs["scenes"]["getAll"][0] };

export default function CrimeScene({ crimeScene }: Props) {
  return (
    <Card className="w-full sm:w-sm">
      <CardHeader>
        <CardTitle>{crimeScene.name}</CardTitle>
      </CardHeader>
      <CardContent>{crimeScene.description}</CardContent>
    </Card>
  );
}
