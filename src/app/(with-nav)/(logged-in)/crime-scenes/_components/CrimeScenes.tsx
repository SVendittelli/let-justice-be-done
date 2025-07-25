"use client";

import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/react";
import { useEffect, useState } from "react";
import CrimeScene from "./CrimeScene";
import CrimeSceneAdmin from "./CrimeSceneAdmin";

type Props = { editable: boolean };

export default function CrimeScenes({ editable = false }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const scenes = api.scenes.getAll.useQuery();

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted || !scenes.data) return null;

  return (
    <>
      {editable && (
        <CrimeSceneAdmin
          deleteEnabled={showDelete}
          onDeleteEnabledChange={setShowDelete}
        />
      )}
      {scenes.data.length !== 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {scenes.data.map((scene) => (
            <CrimeScene
              key={scene.id}
              crimeScene={scene}
              editable={editable}
              deletable={showDelete}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>None yet, you&apos;ll have to investigate!</CardContent>
        </Card>
      )}
    </>
  );
}
