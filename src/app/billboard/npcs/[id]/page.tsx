"use client";

import { api } from "~/trpc/react";
import { use } from "react";
import { Gavel, UserRoundSearch } from "lucide-react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  const { id } = use(params);
  const npc = api.npcs.getById.useQuery(id);

  if (!npc.data) return null;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="prose flex max-w-3/4 items-center gap-4 !prose-invert">
        {npc.data.type === "SUSPECT" ? (
          <UserRoundSearch className="size-14" />
        ) : (
          <Gavel className="size-14" />
        )}
        <h1 className="text-7xl">{npc.data.name}</h1>
      </div>
      <div className="prose max-w-3/4 !prose-invert">
        <h2 className="text-5xl">{npc.data.moniker}</h2>
      </div>
      <div className="prose max-w-3/4 !prose-invert">
        <p className="text-center text-5xl">{npc.data.description}</p>
      </div>
    </div>
  );
}
