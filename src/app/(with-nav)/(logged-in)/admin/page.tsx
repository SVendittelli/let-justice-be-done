import { auth } from "~/server/auth";
import {
  DoorOpen,
  MessageSquareShare,
  Presentation,
  Search,
  Target,
  UserRound,
  UsersRound,
} from "lucide-react";
import { redirect } from "next/navigation";
import AdminCard from "./_components/AdminCard";
import BillboardSelector from "./_components/BillboardSelector";
import ClueSelector from "./_components/ClueSelector";
import CrimeSceneSelector from "./_components/CrimeSceneSelector";
import NpcSelector from "./_components/NpcSelector";
import Suspicion from "./_components/Suspicion";
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
        <AdminCard title="Billboard" icon={<Presentation className="inline" />}>
          <BillboardSelector />
        </AdminCard>
        <AdminCard title="Suspicion" icon={<Target className="inline" />}>
          <Suspicion />
        </AdminCard>
        <AdminCard
          title="Toasts"
          icon={<MessageSquareShare className="inline" />}
        >
          <ToastTrigger />
        </AdminCard>
        <AdminCard title="Users" icon={<UserRound className="inline" />}>
          <UserManager />
        </AdminCard>
      </div>
      <div className="col-span-full flex flex-col gap-4 sm:col-span-9">
        <AdminCard title="Clues" icon={<Search className="inline" />}>
          <ClueSelector />
        </AdminCard>
        <AdminCard title="NPCs" icon={<UsersRound className="inline" />}>
          <NpcSelector />
        </AdminCard>
        <AdminCard title="Crime Scenes" icon={<DoorOpen className="inline" />}>
          <CrimeSceneSelector />
        </AdminCard>
      </div>
    </div>
  );
}
