import { Toaster } from "~/components/ui/sonner";
import NavMenu from "./_components/NavMenu";
import ToastListener from "./_components/ToastListener";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col items-center pt-6">
      <NavMenu />
      <main className="grow" role="main">
        {children}
      </main>
      <ToastListener />
      <Toaster position="top-center" />
    </div>
  );
}
