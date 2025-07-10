import { api } from "~/trpc/server";
import Count from "./_components/Count";

export default async function Page() {
  await api.suspicion.count.prefetch();

  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-8">
      <div className="prose !prose-invert">
        <h1 className="text-7xl">Suspicion</h1>
      </div>
      <Count />
    </div>
  );
}
