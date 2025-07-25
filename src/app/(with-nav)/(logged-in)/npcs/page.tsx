import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Users } from "lucide-react";
import NonPlayerCharacters from "./_components/NonPlayerCharacters";

export const metadata = {
  title: "Non-Player Characters",
};

export default async function Page() {
  const session = await auth();

  void api.clues.getAll.prefetch();
  void api.npcs.getAll.prefetch();
  void api.scenes.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col items-center gap-4">
        <div className="prose flex items-center gap-2 text-center !prose-invert">
          <Users className="inline size-8" />
          <h1>NPCs</h1>
        </div>
        <NonPlayerCharacters editable={session?.user?.role === "ADMIN"} />
      </div>
    </HydrateClient>
  );
}
