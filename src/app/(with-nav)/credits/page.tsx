import { Card, CardContent } from "~/components/ui/card";
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
    <div className="flex min-h-page min-w-full flex-col items-center p-4">
      <header className="align-center prose flex min-w-full !prose-invert">
        <h1 className="grow text-center">Credits</h1>
      </header>
      <Card className="m-4">
        <CardContent className="prose max-w-[70ch]">
          <h2>Game</h2>
          <p>
            Designed and written by{" "}
            <Link href="https://linktr.ee/mynar_lenahan">Mynar Lenahan</Link>,
            available on{" "}
            <Link href="https://mynarlenahan.itch.io/let-justice-be-done">
              itch.io
            </Link>
            .
          </p>
          <h2>Website</h2>
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
    </div>
  );
}
