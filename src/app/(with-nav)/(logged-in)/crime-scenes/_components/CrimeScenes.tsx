"use client";

import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import CrimeScene from "./CrimeScene";

export default function CrimeScenes() {
  const [isMounted, setIsMounted] = useState(false);

  const scenes = api.scenes.getAll.useQuery();

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted || !scenes.data) return null;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {scenes.data.map((scene) => (
          <CrimeScene key={scene.id} crimeScene={scene} />
        ))}
      </div>
    </>
  );
}
