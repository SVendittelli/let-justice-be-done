"use client";

import { api } from "~/trpc/react";
import Clue from "./Clue";

export default function Clues() {
  const clues = api.clues.getAll.useQuery();

  if (!clues.data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      {clues.data.map((clue) => (
        <Clue key={clue.id} clue={clue} />
      ))}
    </div>
  );
}
