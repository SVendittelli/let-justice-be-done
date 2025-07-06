"use client";

import type { CrimeScene } from "@prisma/client";
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Toggle } from "~/components/ui/toggle";
import { api } from "~/trpc/react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

export default function SceneSelector() {
  const [isMounted, setIsMounted] = useState(false);

  const utils = api.useUtils();
  const scenes = api.scenes.getAll.useQuery();
  const updateScene = api.scenes.update.useMutation({
    onSuccess: () => utils.scenes.invalidate(),
  });
  const display = api.billboard.display.useMutation();

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) {
    return null;
  }

  const onUpdate = (scene: CrimeScene, revealed: boolean) => {
    updateScene.mutate({ ...scene, revealed });
  };
  const onShow = (scene: CrimeScene) => {
    display.mutate({
      label: scene.name,
      path: `/billboard/crime-scenes/${scene.id}`,
    });
  };

  return (
    <>
      {scenes.data?.map((scene) => (
        <div key={scene.id} className="py-2">
          <HoverCard>
            <HoverCardTrigger className="flex justify-between">
              <span className="prose truncate">
                <b>{scene.name}</b>: {scene.description}
              </span>
              <span className="flex gap-2">
                {scene.revealed && (
                  <Button size="sm" onClick={() => onShow(scene)}>
                    Show
                  </Button>
                )}
                <Toggle
                  variant="outline"
                  size="sm"
                  defaultPressed={scene.revealed}
                  onPressedChange={(revealed) => onUpdate(scene, revealed)}
                  aria-label="Toggle visibility"
                >
                  {scene.revealed ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeOff className="size-4" />
                  )}
                </Toggle>
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="prose">
              <h2 className="mb-2">{scene.name}</h2>
              <p>{scene.description}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      ))}
    </>
  );
}
