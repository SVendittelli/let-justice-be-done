import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import ToastTrigger from "./_components/ToastTrigger";
import ClueSelector from "./_components/ClueSelector";
import BillboardSelector from "./_components/BillboardSelector";

export default async function Page() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full flex flex-col gap-4 sm:col-span-3">
        <Card className="">
          <CardHeader>
            <CardTitle>Billboard</CardTitle>
          </CardHeader>
          <CardContent>
            <BillboardSelector />
          </CardContent>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Toasts</CardTitle>
          </CardHeader>
          <CardContent>
            <ToastTrigger />
          </CardContent>
        </Card>
      </div>
      <div className="col-span-full sm:col-span-9">
        <Card className="">
          <CardHeader>
            <CardTitle>Clues</CardTitle>
          </CardHeader>
          <CardContent>
            <ClueSelector />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
