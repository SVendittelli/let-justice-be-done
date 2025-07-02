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
      <PlayerCharacters isAdmin={session.user.role === "ADMIN"} />
    </HydrateClient>
  );
}
