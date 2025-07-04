"use client";

import { ROUTES, type BillboardRoute } from "~/app/billboard/routes";
import { env } from "~/env";
import { BILLBOARD_CHANNEL, BILLBOARD_DISPLAY } from "~/lib/pusher";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import BillboardSwitch from "./BillboardSwitch";

const { NEXT_PUBLIC_PUSHER_KEY: key, NEXT_PUBLIC_PUSHER_CLUSTER: cluster } =
  env;
const pusher = new Pusher(key, { cluster });

export default function BillboardSelector() {
  const [current, setCurrent] = useState<BillboardRoute>();

  useEffect(() => {
    const channel = pusher.subscribe(BILLBOARD_CHANNEL);

    channel.bind(BILLBOARD_DISPLAY, (data: BillboardRoute) => {
      setCurrent(data);
    });

    return () => {
      pusher.unsubscribe(BILLBOARD_CHANNEL);
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <span>Current: {current?.label ?? "UNKNOWN"}</span>

      {ROUTES.map((route) => (
        <BillboardSwitch key={route.path} route={route} />
      ))}
    </div>
  );
}
