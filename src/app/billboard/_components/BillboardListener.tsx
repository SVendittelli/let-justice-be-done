"use client";

import { useRouter } from "next/navigation";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { env } from "~/env";
import { sanitizeUrl } from "@braintree/sanitize-url";
import {
  BILLBOARD_CHANNEL,
  BILLBOARD_DISPLAY,
  BILLBOARD_REFRESH,
} from "~/lib/pusher";

const { NEXT_PUBLIC_PUSHER_KEY: key, NEXT_PUBLIC_PUSHER_CLUSTER: cluster } =
  env;
const pusher = new Pusher(key, { cluster });

export default function BillboardListener() {
  const router = useRouter();

  useEffect(() => {
    const channel = pusher.subscribe(BILLBOARD_CHANNEL);

    channel.bind(BILLBOARD_DISPLAY, (data: string) => {
      const path = sanitizeUrl(data);
      if (!path.startsWith("/billboard")) {
        console.error("Tried to navigate to invalid path", data, path);
        return;
      }
      router.push(path);
    });

    channel.bind(BILLBOARD_REFRESH, () => {
      router.refresh();
    });

    return () => {
      pusher.unsubscribe(BILLBOARD_CHANNEL);
    };
  }, [router]);

  return null;
}
