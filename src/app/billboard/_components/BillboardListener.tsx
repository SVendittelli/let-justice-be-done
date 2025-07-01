"use client";

import { useRouter } from "next/navigation";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { env } from "~/env";
import { sanitizeUrl } from "@braintree/sanitize-url";

const CHANNEL_NAME = "billboard";
const EVENT_NAME = "display";
const { NEXT_PUBLIC_PUSHER_KEY: key, NEXT_PUBLIC_PUSHER_CLUSTER: cluster } =
  env;
const pusher = new Pusher(key, { cluster });

export default function BillboardListener() {
  const router = useRouter();

  useEffect(() => {
    const channel = pusher.subscribe(CHANNEL_NAME);

    channel.bind(EVENT_NAME, (data: string) => {
      const path = sanitizeUrl(data);
      if (!path.startsWith("/billboard")) {
        console.error("Tried to navigate to invalid path", data, path);
        return;
      }
      router.push(path);
    });

    return () => {
      pusher.unsubscribe(CHANNEL_NAME);
    };
  }, [router]);

  return null;
}
