import Link from "next/link";
import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b from-[#a4112e] to-[#5a142c] text-[#f5b26c]"
      role="main"
    >
      <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Let Justice Be Done
      </h1>
      {session?.user ? (
        <>
          <Link
            href="/character"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            Character
          </Link>
        </>
      ) : null}
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </main>
  );
}
