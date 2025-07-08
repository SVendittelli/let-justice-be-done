import { auth } from "~/server/auth";
import { redirect } from "next/navigation";
import BillboardListener from "./_components/BillboardListener";

export const metadata = {
  title: "Billboard",
};

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="h-dvh">
      {children}
      <BillboardListener />
    </div>
  );
}
