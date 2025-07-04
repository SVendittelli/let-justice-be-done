import { api, type RouterOutputs } from "~/trpc/react";
import { useState } from "react";
import CharacterCard from "./CharacterCard";
import CharacterForm, { type CharacterChange } from "./CharacterForm";

type Character = RouterOutputs["pcs"]["getAll"][0];
type Props = { character: Character; showEdit: boolean };

export default function PlayerCharacter({ character, showEdit }: Props) {
  const [edit, setEdit] = useState(false);

  const utils = api.useUtils();
  const update = api.pcs.update.useMutation();

  const handleUpdate = (data: CharacterChange) => {
    update.mutate(
      { ...character, ...data },
      {
        onSuccess: () => {
          utils.pcs
            .invalidate()
            .then(() => setEdit(false))
            .catch(console.error);
        },
      },
    );
  };

  return edit ? (
    <CharacterForm
      defaultValues={{
        ...character,
        traits: [character.traits[0] ?? "", character.traits[1] ?? ""],
      }}
      onSubmit={handleUpdate}
      saving={update.isPending}
    />
  ) : (
    <CharacterCard
      character={character}
      showEdit={showEdit}
      onEdit={() => setEdit(true)}
    />
  );
}
