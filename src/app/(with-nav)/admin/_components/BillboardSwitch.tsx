"use client";

import type { BillboardRoute } from "~/app/billboard/routes";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

type Props = { route: BillboardRoute };
export default function BillboardSwitch({ route }: Props) {
  const display = api.billboard.display.useMutation();
  const separator = !route.path.startsWith("/") ? "/" : "";
  const path = `/billboard${separator}${route.path}`;

  return (
    <Button onClick={() => display.mutate({ path })}>{route.label}</Button>
  );
}
