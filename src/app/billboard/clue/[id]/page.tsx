"use client";

import { use } from "react";
import { api } from "~/trpc/react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  const { id } = use(params);
  const clue = api.clues.getById.useQuery(id);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="prose !prose-invert">
        <h1 className="text-7xl">{clue.data?.title}</h1>
      </div>
      <div className="prose !prose-invert">
        <p className="text-center text-5xl">{clue.data?.text}</p>
      </div>
    </div>
  );
}
