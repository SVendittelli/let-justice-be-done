import type { NonPlayerCharacter } from "@prisma/client";

type Props = {
  npc: NonPlayerCharacter;
};

export default function NpcHover({ npc }: Props) {
  return (
    <>
      <h2 className="mb-2">{npc.name}</h2>
      <p>
        <i>{npc.moniker}</i>
      </p>
      <p>{npc.description}</p>
    </>
  );
}
