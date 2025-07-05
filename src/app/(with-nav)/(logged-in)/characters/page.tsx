import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import PlayerCharacters from "./_components/PlayerCharacters";

export default async function Page() {
  const session = await auth();

  void api.pcs.getCurrent.prefetch();
  void api.pcs.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-wrap justify-center gap-4">
        <PlayerCharacters isAdmin={session?.user?.role === "ADMIN"} />
      </div>
    </HydrateClient>
  );
}
