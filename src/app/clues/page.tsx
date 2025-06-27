import { api, HydrateClient } from "~/trpc/server";
import Clues from "./_components/Clues";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function CluesPage() {
  const session = await auth();
  if (!session?.user?.enabled) {
    redirect("/");
  }

  void api.clues.getAll.prefetch();

  return (
    <HydrateClient>
      <Clues />
    </HydrateClient>
  );
}
