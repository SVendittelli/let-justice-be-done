import { Toaster } from "~/components/ui/sonner";
import NavMenu from "./_components/NavMenu";
import ToastListener from "./_components/ToastListener";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col items-center gap-2 p-6">
      <NavMenu className="grow-0" />
      <main className="grow" role="main">
        {children}
      </main>
      <ToastListener />
      <Toaster position="top-center" />
    </div>
  );
}
