import { api, type RouterOutputs } from "~/trpc/react";
import { useState } from "react";
import CharacterCard from "./CharacterCard";
import CharacterForm, { type CharacterChange } from "./CharacterForm";

type Character = RouterOutputs["pcs"]["getAll"][0];
type Props = { character: Character; editable: boolean };

export default function PlayerCharacter({ character, editable }: Props) {
  const [editing, setEditing] = useState(false);

  const utils = api.useUtils();
  const update = api.pcs.update.useMutation();

  const handleUpdate = (data: CharacterChange) => {
    update.mutate(
      { ...character, ...data },
      {
        onSuccess: () => {
          utils.pcs
            .invalidate()
            .then(() => setEditing(false))
            .catch(console.error);
        },
      },
    );
  };

  return editing ? (
    <CharacterForm
      defaultValues={{
        ...character,
        traits: [character.traits[0] ?? "", character.traits[1] ?? ""],
      }}
      onSubmit={handleUpdate}
      isPending={update.isPending}
    />
  ) : (
    <CharacterCard
      character={character}
      editable={editable}
      onEdit={() => setEditing(true)}
    />
  );
}
