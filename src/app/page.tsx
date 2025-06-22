import Image from "next/image";
import Message from "./_components/message";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#a4112e] to-[#5a142c] text-[#f5b26c]">
      <div className="container flex flex-col-reverse gap-6 px-4 py-16 sm:flex-row sm:gap-12">
        <Image
          src="https://placehold.co/400x500/png"
          alt="Character Portrait"
          height="500"
          width="400"
        />
        <div className="flex flex-grow flex-col gap-6 sm:gap-12">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Vincent
          </h1>
          <p className="text-2xl sm:text-3xl">
            A talented artist with a dark past.
          </p>
          <Message />
        </div>
      </div>
    </main>
  );
}
