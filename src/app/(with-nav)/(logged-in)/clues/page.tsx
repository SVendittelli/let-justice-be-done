import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { Search } from "lucide-react";
import Clues from "./_components/Clues";

export const metadata = {
  title: "Clues",
};

export default async function CluesPage() {
  const session = await auth();

  void api.clues.getAll.prefetch();
  void api.npcs.getAll.prefetch();
  void api.scenes.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col items-center gap-4">
        <div className="prose flex items-center gap-2 text-center !prose-invert">
          <Search className="inline size-8" />
          <h1>Clues</h1>
        </div>
        <Clues editable={session?.user?.role === "ADMIN"} />
      </div>
    </HydrateClient>
  );
}
