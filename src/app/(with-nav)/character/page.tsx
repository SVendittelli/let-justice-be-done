import { HydrateClient } from "~/trpc/server";
import Image from "next/image";

export default async function Page() {
  return (
    <HydrateClient>
      <div className="flex min-h-page flex-col items-center justify-center p-6 text-gold">
        <div className="flex flex-col-reverse gap-6 sm:flex-row sm:gap-12">
          <div>
            <Image
              src="https://placehold.co/400x500/png"
              alt="Character Portrait"
              height="500"
              width="400"
            />
          </div>
          <div className="flex flex-grow flex-col gap-6 sm:gap-12">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              Vincent
            </h1>
            <p className="text-2xl sm:text-3xl">
              A talented artist with a dark past.
            </p>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}
