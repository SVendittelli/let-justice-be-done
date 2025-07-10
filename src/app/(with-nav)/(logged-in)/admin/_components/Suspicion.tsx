"use client";

import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import {
  LoaderCircle,
  MessageSquareShare,
  Minus,
  Plus,
  Presentation,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Suspicion() {
  const [isMounted, setIsMounted] = useState(false);

  const utils = api.useUtils();
  const toast = api.toast.suspicion.useMutation();
  const count = api.suspicion.count.useQuery();

  const onSuccess = () =>
    utils.suspicion.invalidate().then(() => toast.mutate());

  const remove = api.suspicion.delete.useMutation({ onSuccess });
  const add = api.suspicion.create.useMutation({ onSuccess });

  const display = api.billboard.display.useMutation();

  useEffect(() => {
    setIsMounted(true);
  }, [setIsMounted]);

  if (!isMounted) {
    return null;
  }

  const suspicion = count.data ?? 0;

  return (
    <div className="flex items-center justify-evenly">
      <Button onClick={() => onSuccess()}>
        <MessageSquareShare />
      </Button>
      <Button onClick={() => remove.mutate()} disabled={suspicion === 0}>
        {remove.isPending ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <Minus />
        )}
      </Button>
      <span className="prose">
        <b>{suspicion}</b>
      </span>
      <Button onClick={() => add.mutate()} disabled={suspicion === 7}>
        {add.isPending ? <LoaderCircle className="animate-spin" /> : <Plus />}
      </Button>
      <Button
        onClick={() =>
          display.mutate({ path: "/billboard/suspicion", label: "Suspicion" })
        }
      >
        <Presentation />
      </Button>
    </div>
  );
}
