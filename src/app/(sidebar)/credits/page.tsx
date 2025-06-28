import { Card, CardContent } from "~/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function Credits() {
  const ccAttributions = [
    {
      title: "Stock Blood Stains Graphics.eps Vector Icon",
      author: "Vectorportal.com",
      authorLink: "https://vectorportal.com/",
      source:
        "https://vectorportal.com/vector/bloedvlekken-vector-graphics.eps/7412",
      licence: "CC BY 4.0",
      licenceLink: "https://creativecommons.org/licenses/by/4.0/",
    },
    {
      title: "Sherlock Holmes Silhouette",
      author: "mohamed hassan",
      authorLink: "https://www.stockvault.net/user/profile/178391",
      source:
        "https://www.stockvault.net/photo/253239/Sherlock-Holmes-Silhouette",
      licence: "CC0 1.0",
      licenceLink: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
  ];

  return (
    <main
      className="flex h-full min-w-full flex-col items-center justify-between pt-12"
      role="main"
    >
      <header className="align-center prose mb-2 flex self-stretch px-4 !prose-invert">
        <Link href="/">
          <Image
            src="/icon.svg"
            alt="Logo"
            width={50}
            height={50}
            className="not-prose rounded-full border-2 border-solid border-gold"
          />
        </Link>
        <h1 className="mb-0 grow text-center">Credits</h1>
        <div className="w-[50px]"></div>
      </header>
      <Card className="m-4">
        <CardContent className="prose max-w-[70ch]">
          <p>
            Built by me,{" "}
            <Link href="https://vendittelli.co.uk/">Sam Vendittelli</Link>{" "}
            (design, code) with the help of{" "}
            <Link href="https://www.alisonquinn.co.uk/">Alison Quinn</Link>{" "}
            (testing).
          </p>
          <h2>Images</h2>
          <ul>
            {ccAttributions.map((attribution) => (
              <li key={attribution.source}>
                <Link href={attribution.source}>
                  &quot;{attribution.title}&quot;
                </Link>{" "}
                by{" "}
                <Link href={attribution.authorLink}>{attribution.author}</Link>{" "}
                is licenced under{" "}
                <Link href={attribution.licenceLink}>
                  {attribution.licence}
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <footer>
        <div className="prose flex justify-center gap-4 p-4 !prose-invert">
          <Link href="https://github.com/SVendittelli/let-justice-be-done">
            GitHub
          </Link>
          <span>©{new Date().getFullYear()}</span>
          <Link href="/">Home</Link>
        </div>
      </footer>
    </main>
  );
}
