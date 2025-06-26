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
      className="prose flex min-h-screen min-w-full flex-col items-center justify-between rounded-xl border-6 border-[#f5b26c] bg-gradient-to-b from-[#a4112e] to-[#5a142c] pt-12 sm:border-8"
      role="main"
    >
      <header className="align-center mb-2 flex self-stretch px-4">
        <Link href="/">
          <Image
            src="/icon.svg"
            alt="Logo"
            width={50}
            height={50}
            className="not-prose rounded-full border-2 border-solid border-[#f5b26c]"
          />
        </Link>
        <h1 className="mb-0 grow text-center text-[#f5b26c]">Credits</h1>
        <div className="w-[50px]"></div>
      </header>
      <div className="m-4 max-w-[70ch] rounded-lg bg-[#f5b26c] px-4 text-[#811339] marker:text-inherit">
        <p>
          Built by me,{" "}
          <Link href="https://vendittelli.co.uk/">Sam Vendittelli</Link>{" "}
          (design, code) with the help of{" "}
          <Link href="https://www.alisonquinn.co.uk/">Alison Quinn</Link>{" "}
          (testing).
        </p>
        <h2 className="text-[#811339]">Images</h2>
        <ul>
          {ccAttributions.map((attribution) => (
            <li key={attribution.source}>
              <Link href={attribution.source}>
                &quot;{attribution.title}&quot;
              </Link>{" "}
              by <Link href={attribution.authorLink}>{attribution.author}</Link>{" "}
              is licenced under{" "}
              <Link href={attribution.licenceLink}>{attribution.licence}</Link>
            </li>
          ))}
        </ul>
      </div>
      <footer>
        <div className="not-prose flex justify-center gap-4 p-4 text-[#f5b26c]">
          <Link href="https://github.com/SVendittelli/let-justice-be-done">
            GitHub
          </Link>
          <p>©{new Date().getFullYear()}</p>
          <Link href="/">Home</Link>
        </div>
      </footer>
    </main>
  );
}
