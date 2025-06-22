"use client";

import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { env } from "~/env";

const YOUR_CHANNEL_NAME = "TEST";
const YOUR_EVENT_NAME = "TEST_EVENT";
const { NEXT_PUBLIC_PUSHER_KEY: key, NEXT_PUBLIC_PUSHER_CLUSTER: cluster } =
  env;
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
const pusher = new Pusher(key, { cluster });

export default function Message() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const channel = pusher.subscribe(YOUR_CHANNEL_NAME);

    channel.bind(YOUR_EVENT_NAME, (data: string) => {
      setMessage(data);
    });

    return () => {
      pusher.unsubscribe(YOUR_CHANNEL_NAME);
    };
  }, []);

  return <div className="text-3xl">{message}</div>;
}
