"use client";

import type { NonPlayerCharacter } from "@prisma/client";
import { Button } from "~/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/ui/hover-card";
import { Toggle } from "~/components/ui/toggle";
import { api } from "~/trpc/react";
import {
  Eye,
  EyeOff,
  Gavel,
  Presentation,
  UserRoundSearch,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function NpcSelector() {
  const [isMounted, setIsMounted] = useState(false);

  const utils = api.useUtils();
  const npcs = api.npcs.getAll.useQuery();
  const updateNpc = api.npcs.update.useMutation({
    onSuccess: () => utils.npcs.invalidate(),
  });
  const display = api.billboard.display.useMutation();

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) {
    return null;
  }

  const onUpdate = (npc: NonPlayerCharacter, revealed: boolean) => {
    updateNpc.mutate({ ...npc, revealed });
  };
  const onShow = (npc: NonPlayerCharacter) => {
    display.mutate({
      label: npc.name,
      path: `/billboard/npcs/${npc.id}`,
    });
  };

  return (
    <>
      {npcs.data?.map((npc) => (
        <div key={npc.id} className="py-2">
          <HoverCard>
            <HoverCardTrigger className="flex justify-between">
              <span className="prose max-w-full truncate">
                {npc.type === "SUSPECT" ? (
                  <UserRoundSearch className="inline" />
                ) : (
                  <Gavel className="inline" />
                )}{" "}
                <b>{npc.name}</b> (<i>{npc.moniker}</i>): {npc.description}
              </span>
              <span className="flex gap-2">
                {npc.revealed && (
                  <Button size="icon" onClick={() => onShow(npc)}>
                    <Presentation />
                    <span className="sr-only">
                      Show {npc.name} on billboard
                    </span>
                  </Button>
                )}
                <Toggle
                  variant="outline"
                  size="icon"
                  defaultPressed={npc.revealed}
                  onPressedChange={(revealed) => onUpdate(npc, revealed)}
                  aria-label="Toggle visibility"
                >
                  {npc.revealed ? <Eye /> : <EyeOff />}
                </Toggle>
              </span>
            </HoverCardTrigger>
            <HoverCardContent className="prose">
              <h2 className="mb-2">{npc.name}</h2>
              <p>
                <i>{npc.moniker}</i>
              </p>
              <p>{npc.description}</p>
            </HoverCardContent>
          </HoverCard>
        </div>
      ))}
    </>
  );
}
