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
import { Eye, EyeOff, Presentation, Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function ClueSelector() {
  const [isMounted, setIsMounted] = useState(false);

  const utils = api.useUtils();
  const clues = api.clues.getAll.useQuery();
  const updateClue = api.clues.update.useMutation({
    onSuccess: () => utils.clues.invalidate(),
  });
  const display = api.billboard.display.useMutation();

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) {
    return null;
  }

  const onUpdate = (clue: Clue, revealed: boolean) => {
    updateClue.mutate({ ...clue, revealed });
  };
  const onShow = (clue: Clue) => {
    display.mutate({
      label: clue.title,
      path: `/billboard/clues/${clue.id}`,
    });
  };

  return (
    <>
      {clues.data?.map((clue) => (
        <div key={clue.id} className="py-2">
          <HoverCard>
            <HoverCardTrigger className="flex justify-between">
              <span className="prose max-w-full truncate">
                <Search className="inline" />
                <b>{clue.title}</b>: {clue.text}
              </span>
              <span className="flex gap-2">
                {clue.revealed && (
                  <Button size="icon" onClick={() => onShow(clue)}>
                    <Presentation />
                    <span className="sr-only">
                      Show {clue.title} on billboard
                    </span>
                  </Button>
                )}
                <Toggle
                  variant="outline"
                  size="icon"
                  defaultPressed={clue.revealed}
                  onPressedChange={(revealed) => onUpdate(clue, revealed)}
                  aria-label="Toggle visibility"
                >
                  {clue.revealed ? <Eye /> : <EyeOff />}
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
