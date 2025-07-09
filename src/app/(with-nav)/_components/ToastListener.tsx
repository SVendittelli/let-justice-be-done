"use client";

import SuspicionDisplay from "~/components/SuspicionDisplay";
import { env } from "~/env";
import {
  TOAST_CHANNEL,
  TOAST_MESSAGE,
  TOAST_REVEAL,
  TOAST_SUSPICION,
  type ToastSchema,
} from "~/lib/pusher";
import { api } from "~/trpc/react";
import {
  DoorOpen,
  MessageSquare,
  Search,
  Target,
  UserRoundSearch,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { toast } from "sonner";
import type z from "zod";

const { NEXT_PUBLIC_PUSHER_KEY: key, NEXT_PUBLIC_PUSHER_CLUSTER: cluster } =
  env;
const pusher = new Pusher(key, { cluster });

const duration = 5_000; // 5 seconds

function Icon({ type }: { type: z.infer<ToastSchema["reveal"]>["type"] }) {
  switch (type) {
    case "CLUE":
      return <Search />;
    case "NPC":
      return <UserRoundSearch />;
    case "CRIME_SCENE":
      return <DoorOpen />;
    default:
      return null;
  }
}

export default function ToastListener() {
  const router = useRouter();
  const utils = api.useUtils();

  useEffect(() => {
    const channel = pusher.subscribe(TOAST_CHANNEL);

    channel.bind(TOAST_MESSAGE, (message: z.infer<ToastSchema["message"]>) => {
      toast(message, { duration, icon: <MessageSquare /> });
    });

    channel.bind(TOAST_REVEAL, (data: z.infer<ToastSchema["reveal"]>) => {
      toast(data.message, {
        action: {
          label: "See it",
          onClick: () => {
            utils
              .invalidate()
              .then(() => router.push(data.path))
              .catch((e) => console.error(e));
          },
        },
        duration,
        icon: <Icon type={data.type} />,
      });
    });

    channel.bind(
      TOAST_SUSPICION,
      (count: z.infer<ToastSchema["suspicion"]>) => {
        utils.suspicion
          .invalidate()
          .then(() =>
            toast(
              <>
                Suspicion: <SuspicionDisplay count={count} />
              </>,
              { duration, icon: <Target /> },
            ),
          )
          .catch((e) => console.error(e));
      },
    );

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(TOAST_CHANNEL);
    };
  }, [router, utils]);

  return null;
}
