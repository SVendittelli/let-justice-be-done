"use client";

import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import CharacterForm from "./CharacterForm";
import PlayerCharacter from "./PlayerCharacter";

export default function PlayerCharacters() {
  const [isMounted, setIsMounted] = useState(false);

  const pc = api.pcs.getCurrent.useQuery();
  const pcs = api.pcs.getAll.useQuery();

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) return null;

  if (!pc.data) {
    return <CharacterForm />;
  }
  const myCharacter = pc.data;

  return (
    <div className="flex min-h-page flex-wrap justify-center gap-4">
      <PlayerCharacter character={myCharacter} />
      {pcs?.data
        ?.filter(({ id }) => id !== myCharacter.id)
        ?.map((character) => (
          <PlayerCharacter key={character.id} character={character} />
        ))}
    </div>
  );
}
