import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { DoorOpen } from "lucide-react";
import CrimeScenes from "./_components/CrimeScenes";

export const metadata = {
  title: "Crime Scenes",
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
          <DoorOpen className="inline size-8" />
          <h1>Crime Scenes</h1>
        </div>
        <CrimeScenes editable={session?.user?.role === "ADMIN"} />
      </div>
    </HydrateClient>
  );
}
