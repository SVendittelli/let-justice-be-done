import { auth } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth();
  if (!session?.user?.enabled) {
    redirect("/");
  }

  return children;
}
