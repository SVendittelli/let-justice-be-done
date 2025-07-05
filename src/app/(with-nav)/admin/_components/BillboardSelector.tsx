"use client";

import { ROUTES } from "~/app/billboard/routes";
import { Button } from "~/components/ui/button";
import { env } from "~/env";
import { BILLBOARD_CHANNEL, BILLBOARD_DISPLAY } from "~/lib/pusher";
import { api } from "~/trpc/react";
import Pusher from "pusher-js";
import { useEffect } from "react";
import BillboardSwitch from "./BillboardSwitch";

const { NEXT_PUBLIC_PUSHER_KEY: key, NEXT_PUBLIC_PUSHER_CLUSTER: cluster } =
  env;
const pusher = new Pusher(key, { cluster });

export default function BillboardSelector() {
  const utils = api.useUtils();
  const page = api.billboard.current.useQuery();
  const refresh = api.billboard.refresh.useMutation();

  useEffect(() => {
    const channel = pusher.subscribe(BILLBOARD_CHANNEL);

    channel.bind(BILLBOARD_DISPLAY, async () => {
      return utils.billboard.invalidate();
    });

    return () => {
      pusher.unsubscribe(BILLBOARD_CHANNEL);
    };
  }, [utils.billboard]);

  return (
    <div className="flex flex-col gap-2">
      <span>Current: {page.data?.label ?? "UNKNOWN"}</span>

      {ROUTES.map((route) => (
        <BillboardSwitch key={route.path} route={route} />
      ))}
      <Button onClick={() => refresh.mutate()}>Refresh</Button>
    </div>
  );
}
