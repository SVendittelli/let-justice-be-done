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
      className="grid min-h-dvh grid-cols-[repeat(3,_auto)] grid-rows-[136px_minmax(360px,_min-content)_auto_min-content] gap-y-4 px-6 pt-6 text-gold"
      role="main"
    >
      <h1 className="col-span-3 col-start-1 row-1 self-center text-center font-title text-5xl font-extrabold tracking-tight sm:text-7xl">
        <span className="inline-block">Let Justice</span>{" "}
        <span className="inline-block">Be Done</span>
      </h1>
      <div className="col-span-3 col-start-1 row-2 flex flex-col items-center gap-4 place-self-center sm:col-2 sm:row-span-2 sm:row-start-2">
        {links}
        <HomePageLink href={session ? "/api/auth/signout" : "/api/auth/signin"}>
          {session ? "Sign out" : "Sign in"}
        </HomePageLink>
      </div>
      <div className="col-1 row-3 w-[128px] justify-self-start bg-gold mask-[url(https://i.ibb.co/KpMyHyC7/splatter-min.png)] mask-contain mask-bottom-right mask-no-repeat sm:row-span-2 sm:row-start-2 sm:w-[160px]"></div>
      <div className="col-3 row-3 w-[128px] justify-self-end bg-gold mask-[url(https://i.ibb.co/zVh58FY8/sleuth-min.png)] mask-contain mask-bottom-right mask-no-repeat sm:row-span-2 sm:row-start-2 sm:w-[160px]"></div>
      <div className="col-span-3 col-start-1 row-4 flex justify-center gap-4 self-end p-4">
        <Link href="https://github.com/SVendittelli/let-justice-be-done">
          GitHub
        </Link>
        <p>©{new Date().getFullYear()}</p>
        <Link href="/credits">Credits</Link>
      </div>
    </main>
  );
}
