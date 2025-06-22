import Image from "next/image";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a4112e] to-[#5a142c] text-[#f5b26c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Vincent
        </h1>
        <div className="flex gap-12">
          <div>
            <Image
              src="https://placehold.co/400x500/png"
              alt="Character Portrait"
              height="500"
              width="400"
            />
          </div>
          <p className="text-3xl">A talented artist with a dark past.</p>
        </div>
      </div>
    </main>
  );
}
