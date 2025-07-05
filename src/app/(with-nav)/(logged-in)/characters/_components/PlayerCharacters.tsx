"use client";

import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import CharacterForm, { type CharacterChange } from "./CharacterForm";
import PlayerCharacter from "./PlayerCharacter";

type Props = { isAdmin: boolean };

export default function PlayerCharacters({ isAdmin }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  const utils = api.useUtils();
  const pc = api.pcs.getCurrent.useQuery();
  const pcs = api.pcs.getAll.useQuery();
  const create = api.pcs.create.useMutation();

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) return null;

  if (!pc.data && !isAdmin) {
    const handleCreate = (data: CharacterChange) => {
      create.mutate(data, {
        onSuccess: () => {
          utils.pcs.invalidate().catch(console.error);
        },
      });
    };

    return <CharacterForm onSubmit={handleCreate} saving={create.isPending} />;
  }

  return (
    <>
      {pc.data && <PlayerCharacter character={pc.data} showEdit={true} />}
      {pcs?.data
        ?.filter(({ id }) => id !== pc.data?.id)
        ?.map((character) => (
          <PlayerCharacter
            key={character.id}
            character={character}
            showEdit={isAdmin}
          />
        ))}
    </>
  );
}
