import { api, HydrateClient } from "~/trpc/server";
import PlayerCharacters from "./_components/PlayerCharacters";

export default async function Page() {
  void api.pcs.getCurrent.prefetch();
  void api.pcs.getAll.prefetch();

  return (
    <HydrateClient>
      <PlayerCharacters />
    </HydrateClient>
  );
}
