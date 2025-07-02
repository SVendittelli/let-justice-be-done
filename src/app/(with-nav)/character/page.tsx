import { api, HydrateClient } from "~/trpc/server";
import PlayerCharacters from "./_components/PlayerCharacters";

export default async function Page() {
  await api.pcs.getCurrent.prefetch();
  await api.pcs.getAll.prefetch();

  return (
    <HydrateClient>
      <PlayerCharacters />
    </HydrateClient>
  );
}
