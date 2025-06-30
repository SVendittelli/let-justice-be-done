import NavMenu from "./_components/NavMenu";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col items-center pt-6">
      <NavMenu />
      <main className="grow">{children}</main>
    </div>
  );
}
