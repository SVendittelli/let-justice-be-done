import { HydrateClient } from "~/trpc/server";
import CrimeScenes from "./_components/CrimeScenes";

export default function Page() {
  return (
    <HydrateClient>
      <div className="flex flex-col gap-4">
        <div className="prose !prose-invert">
          <h1>Crime Scenes</h1>
        </div>
      </div>
      <CrimeScenes />
    </HydrateClient>
  );
}
