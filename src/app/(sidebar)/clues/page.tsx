import { Card, CardContent } from "~/components/ui/card";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";
import ClueForm from "./_components/ClueForm";
import Clues from "./_components/Clues";

export default async function CluesPage() {
  const session = await auth();
  if (!session?.user?.enabled) {
    redirect("/");
  }

  void api.clues.getAll.prefetch();

  return (
    <HydrateClient>
      <main className="flex flex-col gap-4 p-4" role="main">
        {session.user.role === "ADMIN" && (
          <Card>
            <CardContent>
              <ClueForm />
            </CardContent>
          </Card>
        )}
        <Clues />
      </main>
    </HydrateClient>
  );
}
