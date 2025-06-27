import { api } from "~/trpc/server";
import Clue from "./_components/Clue";

export default async function Clues() {
  const clues = await api.clues.getAll();

  return (
    <div>
      {clues.map((clue) => (
        <Clue key={clue.id} clue={clue} />
      ))}
    </div>
  );
}
