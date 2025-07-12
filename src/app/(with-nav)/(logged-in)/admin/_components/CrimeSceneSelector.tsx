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
import { DoorOpen, Eye, EyeOff, Presentation } from "lucide-react";
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
              <span className="prose max-w-full truncate">
                <DoorOpen className="inline" />
                <b>{scene.name}</b>: {scene.description}
              </span>
              <span className="flex gap-2">
                {scene.revealed && (
                  <Button size="icon" onClick={() => onShow(scene)}>
                    <Presentation />
                    <span className="sr-only">
                      Show {scene.name} on billboard
                    </span>
                  </Button>
                )}
                <Toggle
                  variant="outline"
                  size="icon"
                  defaultPressed={scene.revealed}
                  onPressedChange={(revealed) => onUpdate(scene, revealed)}
                  aria-label="Toggle visibility"
                >
                  {scene.revealed ? <Eye /> : <EyeOff />}
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
