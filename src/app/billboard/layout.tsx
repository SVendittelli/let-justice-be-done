import BillboardListener from "./_components/BillboardListener";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen w-screen">
      {children}
      <BillboardListener />
    </div>
  );
}
