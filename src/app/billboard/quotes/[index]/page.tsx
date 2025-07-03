import { redirect } from "next/navigation";

const quotes = [
  {
    quote:
      "“I am not the law, but I represent justice so far as my feeble powers go. I am ready to listen, and then I will tell you how I will act.”",
    person: "Sherlock Holmes",
    work: "The Adventure of the Three Gables",
  },
  {
    quote: "“Let justice be done, though the heavens fall.”",
    person: "Gnaeus Calpurnius Piso",
    work: "Old Roman Maxim",
  },
];

export async function generateStaticParams() {
  return quotes.map((_quote, index) => ({ index: `${index}` }));
}

export default async function Billboard({
  params,
}: {
  params: Promise<{ index: number }>;
}) {
  const { index } = await params;

  if (!quotes[index]) {
    redirect("/billboard/quotes/0");
  }

  return (
    <div className="flex h-full w-full items-center justify-center p-16">
      <div className="prose flex !max-w-3/4 flex-col gap-4 !prose-invert">
        <blockquote className="!my-0 text-4xl">
          {quotes[index].quote}
        </blockquote>
        <p className="!my-0 self-end text-3xl">
          {quotes[index].person}, <i>{quotes[index].work}</i>
        </p>
      </div>
    </div>
  );
}
