"use client";

import type { Clue } from "@prisma/client";
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

export default function ClueSelector() {
  const [isClient, setIsClient] = useState(false);

  const utils = api.useUtils();
  const clues = api.clues.getAll.useQuery();
  const updateClue = api.clues.update.useMutation({
    onSuccess: () => utils.clues.getAll.invalidate(),
  });
  const display = api.billboard.display.useMutation();

  useEffect(() => {
    setIsClient(true);
  }, [setIsClient]);

  if (!isClient) {
    return null;
  }

  const onUpdate = (clue: Clue, revealed: boolean) => {
    updateClue.mutate({ ...clue, revealed });
  };
  const onShow = (clue: Clue) => {
    display.mutate({
      label: clue.title,
      path: `/billboard/clue/${clue.id}`,
    });
  };

  return (
    <>
      {clues.data?.map((clue) => (
        <div key={clue.id} className="py-2">
          <HoverCard>
            <HoverCardTrigger className="flex justify-between">
              <span className="truncate">
                {clue.title}: {clue.text}
              </span>
              <span className="flex gap-2">
                {clue.revealed && (
                  <Button size="sm" onClick={() => onShow(clue)}>
                    Show
                  </Button>
                )}
                <Toggle
                  variant="outline"
                  size="sm"
                  defaultPressed={clue.revealed}
                  onPressedChange={(revealed) => onUpdate(clue, revealed)}
                  aria-label="Toggle visibility"
                >
                  {clue.revealed ? (
                    <Eye className="size-4" />
                  ) : (
                    <EyeOff className="size-4" />
                  )}
                </Toggle>
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="prose">
              <h2 className="mb-2">{clue.title}</h2>
              <p>{clue.text}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      ))}
    </>
  );
}
