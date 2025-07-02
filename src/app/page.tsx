import { Card, CardContent } from "~/components/ui/card";
import { auth } from "~/server/auth";
import Link from "next/link";
import HomePageLink from "./_components/HomePageLink";
import HomePageLinks from "./_components/HomePageLinks";

export default async function Home() {
  const session = await auth();

  const links = session?.user ? (
    session.user.enabled ? (
      <HomePageLinks isAdmin={session.user.role === "ADMIN"} />
    ) : (
      <Card>
        <CardContent>Please wait for the game to start.</CardContent>
      </Card>
    )
  ) : null;

  return (
    <main
      className="flex h-dvh flex-col justify-between px-4 pt-12 pb-4 text-gold"
      role="main"
    >
      <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-7xl">
        <span className="inline-block">Let Justice</span>{" "}
        <span className="inline-block">Be Done</span>
      </h1>
      <div className="flex flex-col items-center gap-4 sm:text-xl">
        {links}
        <HomePageLink href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? "Sign out" : "Sign in"}
        </HomePageLink>
      </div>
      <footer>
        <div className="flex h-64 content-around items-stretch px-4">
          <div className="w-[128px] bg-gold mask-[url(https://i.ibb.co/KpMyHyC7/splatter-min.png)] mask-contain mask-bottom-right mask-no-repeat sm:w-[150px]"></div>
          <div className="w-[1px] grow-2 bg-gold mask-[url(https://i.ibb.co/zVh58FY8/sleuth-min.png)] mask-contain mask-bottom-right mask-no-repeat"></div>
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
