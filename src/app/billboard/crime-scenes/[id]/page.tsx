"use client";

import { api } from "~/trpc/react";
import { DoorOpen } from "lucide-react";
import { use } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default function Page({ params }: Props) {
  const { id } = use(params);
  const crimeScene = api.scenes.getById.useQuery(id);

  if (!crimeScene.data) return null;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="prose flex max-w-3/4 items-center gap-4 !prose-invert">
        <DoorOpen className="size-14" />
        <h1 className="text-7xl">{crimeScene.data.name}</h1>
      </div>
      <div className="prose max-w-3/4 !prose-invert">
        <p className="text-center text-5xl">{crimeScene.data.description}</p>
      </div>
    </div>
  );
}
