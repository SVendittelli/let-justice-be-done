"use client";

import { env } from "~/env";
import { TOAST_CHANNEL, TOAST_MESSAGE, TOAST_REVEAL } from "~/lib/pusher";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { toast } from "sonner";

const { NEXT_PUBLIC_PUSHER_KEY: key, NEXT_PUBLIC_PUSHER_CLUSTER: cluster } =
  env;
const pusher = new Pusher(key, { cluster });

export default function ToastListener() {
  const router = useRouter();
  const utils = api.useUtils();

  useEffect(() => {
    const channel = pusher.subscribe(TOAST_CHANNEL);

    channel.bind(TOAST_MESSAGE, (message: string) => {
      toast(message);
    });

    channel.bind(TOAST_REVEAL, () => {
      toast("A new clue has been revealed!", {
        action: {
          label: "See it",
          onClick: () => {
            utils.clues
              .invalidate()
              .then(() => router.push("/clues"))
              .catch((e) => console.error(e));
          },
        },
      });
    });

    return () => {
      pusher.unsubscribe(TOAST_CHANNEL);
    };
  }, [router, utils.clues]);

  return null;
}
