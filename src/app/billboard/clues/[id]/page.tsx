"use client";

import { api } from "~/trpc/react";
import { Search } from "lucide-react";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  const { id } = use(params);
  const clue = api.clues.getById.useQuery(id);

  if (!clue.data) return null;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="prose flex max-w-3/4 items-center gap-4 !prose-invert">
        <Search className="size-14" />
        <h1 className="text-7xl">{clue.data.title}</h1>
      </div>
      <div className="prose max-w-3/4 !prose-invert">
        <p className="text-center text-5xl">{clue.data.text}</p>
      </div>
    </div>
  );
}
