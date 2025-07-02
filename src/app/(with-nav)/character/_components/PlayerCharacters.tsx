"use client";

import { api } from "~/trpc/react";
import CharacterForm from "./CharacterForm";
import PlayerCharacter from "./PlayerCharacter";

export default function PlayerCharacters() {
  const pc = api.pcs.getCurrent.useQuery();
  const pcs = api.pcs.getAll.useQuery();

  if (!pc.data) {
    return <CharacterForm />;
  }

  return <>{pcs?.data?.map(({ id }) => <PlayerCharacter key={id} />)}</>;
}
