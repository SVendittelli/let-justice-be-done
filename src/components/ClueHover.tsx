import type { Clue } from "@prisma/client";

type Props = {
  clue: Clue;
};

export default function ClueHover({ clue }: Props) {
  return (
    <>
      <h2 className="mb-2">{clue.title}</h2>
      <p>{clue.text}</p>
    </>
  );
}
