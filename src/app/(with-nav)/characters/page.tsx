import { api, HydrateClient } from "~/trpc/server";
import PlayerCharacters from "./_components/PlayerCharacters";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (!session?.user?.enabled) {
    redirect("/");
  }

  void api.pcs.getCurrent.prefetch();
  void api.pcs.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-wrap justify-center gap-4">
        <PlayerCharacters isAdmin={session.user.role === "ADMIN"} />
      </div>
    </HydrateClient>
  );
}
