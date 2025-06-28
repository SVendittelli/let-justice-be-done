import Image from "next/image";
import Message from "./_components/message";
import { HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  return (
    <HydrateClient>
      <Link href="/">
        <Image
          src="/icon.svg"
          alt="Logo"
          width={50}
          height={50}
          className="absolute top-5 left-5 rounded-full border-2 border-solid border-[#f5b26c]"
        />
      </Link>
      <main
        className="flex flex-col items-center justify-center text-[#f5b26c]"
        role="main"
      >
        <div className="container flex flex-col-reverse gap-6 px-4 py-16 sm:flex-row sm:gap-12">
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
            <SessionProvider>{session?.user && <Message />}</SessionProvider>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
