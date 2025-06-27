import type { RouterOutputs } from "~/trpc/react";

type Props = { clue: RouterOutputs["clues"]["getById"] };

export default function Clue({ clue }: Props) {
  return (
    <div>
      {clue.title} - {clue.text}
    </div>
  );
}
