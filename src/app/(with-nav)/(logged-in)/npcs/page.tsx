import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import NonPlayerCharacters from "./_components/NonPlayerCharacters";

export default async function Page() {
  const session = await auth();

  void api.npcs.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col items-center gap-4">
        <div className="prose !prose-invert">
          <h1>NPCs</h1>
        </div>
        <NonPlayerCharacters editable={session?.user?.role === "ADMIN"} />
      </div>
    </HydrateClient>
  );
}
