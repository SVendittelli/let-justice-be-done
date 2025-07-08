import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import AdminCard from "./_components/AdminCard";
import BillboardSelector from "./_components/BillboardSelector";
import ClueSelector from "./_components/ClueSelector";
import CrimeSceneSelector from "./_components/CrimeSceneSelector";
import NpcSelector from "./_components/NpcSelector";
import ToastTrigger from "./_components/ToastTrigger";
import UserManager from "./_components/UserManager";

export const metadata = {
  title: "Admin Dashboard",
};

export default async function Page() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full flex flex-col gap-4 sm:col-span-3">
        <AdminCard title="Billboard">
          <BillboardSelector />
        </AdminCard>
        <AdminCard title="Toasts">
          <ToastTrigger />
        </AdminCard>
        <AdminCard title="Users">
          <UserManager />
        </AdminCard>
      </div>
      <div className="col-span-full flex flex-col gap-4 sm:col-span-9">
        <AdminCard title="Clues">
          <ClueSelector />
        </AdminCard>
        <AdminCard title="NPCs">
          <NpcSelector />
        </AdminCard>
        <AdminCard title="Crime Scenes">
          <CrimeSceneSelector />
        </AdminCard>
      </div>
    </div>
  );
}
