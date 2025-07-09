"use client";

import { api } from "~/trpc/react";
import { Gavel, UserRoundSearch } from "lucide-react";
import Image from "next/image";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  const { id } = use(params);
  const npc = api.npcs.getById.useQuery(id);

  if (!npc.data) return null;

  return (
    <div className="flex h-full w-full items-center justify-center gap-6 p-8">
      <Image
        src={npc.data.imageUrl}
        blurDataURL={npc.data.imageBlurData}
        alt={`Portrait of ${npc.data.name}`}
        width={1024}
        height={1536}
        className="w-1/4"
      />
      <div className="flex max-w-3/4 flex-col gap-6 text-gold">
        <div className="flex max-w-full items-center gap-4">
          {npc.data.type === "SUSPECT" ? (
            <UserRoundSearch className="size-14" />
          ) : (
            <Gavel className="size-14" />
          )}
          <h1 className="text-7xl font-extrabold">{npc.data.name}</h1>
        </div>
        <div className="max-w-full">
          <h2 className="text-5xl font-bold">{npc.data.moniker}</h2>
        </div>
        <div className="max-w-full">
          <p className="text-5xl">{npc.data.description}</p>
        </div>
      </div>
    </div>
  );
}
