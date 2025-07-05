import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import Clues from "./_components/Clues";

export default async function CluesPage() {
  const session = await auth();

  void api.clues.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <Clues editable={session?.user?.role === "ADMIN"} />
      </div>
    </HydrateClient>
  );
}
