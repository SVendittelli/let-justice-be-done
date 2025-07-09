import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import PlayerCharacters from "./_components/PlayerCharacters";
import SuspicionCard from "./_components/SuspicionCard";
import { UserRound } from "lucide-react";

export const metadata = {
  title: "Player Characters",
};

export default async function Page() {
  const session = await auth();

  void api.pcs.getCurrent.prefetch();
  void api.pcs.getAll.prefetch();
  void api.suspicion.count.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col items-center gap-4">
        <div className="prose flex items-center gap-2 text-center !prose-invert">
          <UserRound className="inline size-8" />
          <h1>PCs</h1>
        </div>
        <SuspicionCard />
        <PlayerCharacters isAdmin={session?.user?.role === "ADMIN"} />
      </div>
    </HydrateClient>
  );
}
