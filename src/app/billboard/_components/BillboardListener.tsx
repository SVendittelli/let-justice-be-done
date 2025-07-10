"use client";

import { sanitizeUrl } from "@braintree/sanitize-url";
import { env } from "~/env";
import {
  BILLBOARD_CHANNEL,
  BILLBOARD_DISPLAY,
  BILLBOARD_REFRESH,
  type BillboardSchema,
} from "~/lib/pusher";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";
import { useEffect } from "react";
import type z from "zod";

const { NEXT_PUBLIC_PUSHER_KEY: key, NEXT_PUBLIC_PUSHER_CLUSTER: cluster } =
  env;
const pusher = new Pusher(key, { cluster });

export default function BillboardListener() {
  const router = useRouter();

  const utils = api.useUtils();
  const page = api.billboard.current.useQuery();

  useEffect(() => {
    if (page.data) {
      const path = sanitizeUrl(page.data.path);
      if (!path.startsWith("/billboard")) {
        console.error(
          "Tried to navigate to invalid path",
          page.data.path,
          path,
        );
        return;
      }
      router.replace(path);
    }
  }, [router, page.data]);

  useEffect(() => {
    const channel = pusher.subscribe(BILLBOARD_CHANNEL);

    channel.bind(
      BILLBOARD_DISPLAY,
      (data: z.infer<BillboardSchema["display"]>) => {
        const path = sanitizeUrl(data.path);
        if (!path.startsWith("/billboard")) {
          console.error("Tried to navigate to invalid path", data.path, path);
          return;
        }
        router.push(path);
      },
    );

    channel.bind(BILLBOARD_REFRESH, async () => {
      await utils.invalidate();
      router.refresh();
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(BILLBOARD_CHANNEL);
    };
  }, [router, utils]);

  return null;
}
