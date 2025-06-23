import Image from "next/image";
import Message from "./_components/message";
import { HydrateClient } from "~/trpc/server";
import { auth } from "~/server/auth";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a4112e] to-[#5a142c] text-[#f5b26c]"
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
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
