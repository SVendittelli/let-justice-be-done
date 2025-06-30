"use client";

import { api } from "~/trpc/react";
import Clue from "./Clue";
import { Card, CardContent } from "~/components/ui/card";
import { useState } from "react";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";

type Props = { editable: boolean };
export default function Clues({ editable = false }: Props) {
  const [showDelete, setShowDelete] = useState(false);

  const clues = api.clues.getAll.useQuery();

  if (!clues.data) return <div>Loading...</div>;

  return (
    <>
      {editable && (
        <Card>
          <CardContent className="flex items-center gap-2">
            <Switch
              id="showDelete"
              checked={showDelete}
              onClick={() => setShowDelete(!showDelete)}
            />
            <Label htmlFor="showDelete">Show Delete</Label>
          </CardContent>
        </Card>
      )}
      <div className="flex flex-col gap-4">
        {clues.data.map((clue) => (
          <Clue
            key={clue.id}
            clue={clue}
            editable={editable}
            deletable={showDelete}
          />
        ))}
      </div>
    </>
  );
}
