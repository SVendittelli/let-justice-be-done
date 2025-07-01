import { ROUTES } from "~/app/billboard/routes";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import BillboardSwitch from "./_components/BillboardSwitch";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="min-h-page p-6">
      <Card>
        <CardHeader>
          <CardTitle>Billboard</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <span>Current: UNKNOWN</span>
            {ROUTES.map((route) => (
              <BillboardSwitch key={route.path} route={route} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
