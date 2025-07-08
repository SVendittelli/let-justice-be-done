import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import NonPlayerCharacters from "./_components/NonPlayerCharacters";

export const metadata = {
  title: "Non-Player Characters",
};

export default async function Page() {
  const session = await auth();

  void api.npcs.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col items-center gap-4">
        <div className="prose text-center !prose-invert">
          <h1>Non-Player Characters</h1>
        </div>
        <NonPlayerCharacters editable={session?.user?.role === "ADMIN"} />
      </div>
    </HydrateClient>
  );
}
