import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import CrimeScenes from "./_components/CrimeScenes";

export const metadata = {
  title: "Crime Scenes",
};

export default async function Page() {
  const session = await auth();

  void api.scenes.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col items-center gap-4">
        <div className="prose text-center !prose-invert">
          <h1>Crime Scenes</h1>
        </div>
        <CrimeScenes editable={session?.user?.role === "ADMIN"} />
      </div>
    </HydrateClient>
  );
}
