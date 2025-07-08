"use client";

import { Card, CardContent } from "~/components/ui/card";
import { api } from "~/trpc/react";
import { Gavel, MessageCircleQuestionMark } from "lucide-react";
import { useEffect, useState } from "react";
import NonPlayerCharacter from "./NonPlayerCharacter";
import NonPlayerCharacterForm from "./NonPlayerCharacterForm";

type Props = { editable: boolean };

export default function NonPlayerCharacters({ editable = false }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const authorities = api.npcs.getByRole.useQuery("AUTHORITY");
  const suspects = api.npcs.getByRole.useQuery("SUSPECT");

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted || !authorities.data || !suspects.data) return null;

  const count = authorities.data.length + suspects.data.length;

  return (
    <>
      {editable && (
        <NonPlayerCharacterForm
          deleteEnabled={showDelete}
          onDeleteEnabledChange={setShowDelete}
        />
      )}
      {count !== 0 ? (
        <>
          <div className="prose !prose-invert">
            <h2>
              Suspects <MessageCircleQuestionMark className="inline" />
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {suspects.data.map((npc) => (
              <NonPlayerCharacter
                key={npc.id}
                npc={npc}
                editable={editable}
                deletable={showDelete}
              />
            ))}
          </div>
          <div className="prose !prose-invert">
            <h2>
              Authority
              <Gavel className="inline" />
            </h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {authorities.data.map((npc) => (
              <NonPlayerCharacter
                key={npc.id}
                npc={npc}
                editable={editable}
                deletable={showDelete}
              />
            ))}
          </div>
        </>
      ) : (
        <Card>
          <CardContent>None yet, you&apos;ll have to investigate!</CardContent>
        </Card>
      )}
    </>
  );
}
