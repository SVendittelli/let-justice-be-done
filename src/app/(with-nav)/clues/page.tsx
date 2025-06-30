import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";
import Clues from "./_components/Clues";

export default async function CluesPage() {
  const session = await auth();
  if (!session?.user?.enabled) {
    redirect("/");
  }

  void api.clues.getAll.prefetch();

  return (
    <HydrateClient>
      <div className="flex min-h-page flex-col gap-4 p-6">
        <Clues editable={session.user.role === "ADMIN"} />
      </div>
    </HydrateClient>
  );
}
