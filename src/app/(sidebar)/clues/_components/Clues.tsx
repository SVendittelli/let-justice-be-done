"use client";

import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/react";
import { useState } from "react";
import Clue from "./Clue";
import ClueForm from "./ClueForm";

type Props = { editable: boolean };

export default function Clues({ editable = false }: Props) {
  const [showDelete, setShowDelete] = useState(false);

  const clues = api.clues.getAll.useQuery();

  if (!clues.data) {
    return (
      <Card>
        <CardContent>Loading...</CardContent>
      </Card>
    );
  }

  return (
    <>
      <ClueForm
        deleteEnabled={showDelete}
        onDeleteEnabledChange={setShowDelete}
      />
      {clues.data.length !== 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {clues.data.map((clue) => (
            <Clue
              key={clue.id}
              clue={clue}
              editable={editable}
              deletable={showDelete}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>None yet, you&apos;ll have to investigate!</CardContent>
        </Card>
      )}
    </>
  );
}
