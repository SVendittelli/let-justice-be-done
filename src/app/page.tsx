import Link from "next/link";
import { auth } from "~/server/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main
      className="text-gold flex h-full flex-col justify-between pt-12 sm:pt-32"
      role="main"
    >
      <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-7xl">
        <span className="inline-block">Let Justice</span>{" "}
        <span className="inline-block">Be Done</span>
      </h1>
      <div className="flex flex-col items-center gap-6 sm:text-xl">
        {session?.user ? (
          <>
            <Link
              href="/character"
              className="rounded-full border-2 bg-[#a4112e] px-10 py-3 font-semibold no-underline transition hover:bg-[#cd0029]"
            >
              Character
            </Link>
          </>
        ) : null}
        <Link
          href={session ? "/api/auth/signout" : "/api/auth/signin"}
          className="rounded-full border-2 bg-[#a4112e] px-10 py-3 font-semibold no-underline transition hover:bg-[#cd0029]"
        >
          {session ? "Sign out" : "Sign in"}
        </Link>
      </div>
      <footer>
        <div className="flex h-64 content-around items-stretch px-4 sm:h-72">
          <div className="w-[128px] bg-[#f5b26c] mask-[url(https://i.ibb.co/KpMyHyC7/splatter-min.png)] mask-contain mask-bottom-right mask-no-repeat sm:w-[150px]"></div>
          <div className="w-[1px] grow-2 bg-[#f5b26c] mask-[url(https://i.ibb.co/zVh58FY8/sleuth-min.png)] mask-contain mask-bottom-right mask-no-repeat"></div>
        </div>
        <div className="flex justify-center gap-4 p-4">
          <Link href="https://github.com/SVendittelli/let-justice-be-done">
            GitHub
          </Link>
          <p>©{new Date().getFullYear()}</p>
          <Link href="/credits">Credits</Link>
        </div>
      </footer>
    </main>
  );
}
