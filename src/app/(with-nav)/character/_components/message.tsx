"use client";

import { env } from "~/env";
import { api } from "~/trpc/react";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";

const YOUR_CHANNEL_NAME = "TEST";
const YOUR_EVENT_NAME = "TEST_EVENT";
const { NEXT_PUBLIC_PUSHER_KEY: key, NEXT_PUBLIC_PUSHER_CLUSTER: cluster } =
  env;
const pusher = new Pusher(key, { cluster });

export default function Message() {
  const { data: session } = useSession();

  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");

  const sendMessage = api.messages.create.useMutation();

  useEffect(() => {
    const channel = pusher.subscribe(YOUR_CHANNEL_NAME);

    channel.bind(YOUR_EVENT_NAME, (data: string) => {
      setMessage(data);
    });

    return () => {
      pusher.unsubscribe(YOUR_CHANNEL_NAME);
    };
  }, []);

  return (
    <>
      {session?.user?.role === "ADMIN" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage.mutate({ message: input });
          }}
          className="flex flex-col gap-2"
        >
          <input
            type="text"
            placeholder="Message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full rounded-full bg-white/10 px-4 py-2 text-white"
          />
          <button
            type="submit"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
            disabled={sendMessage.isPending}
          >
            Send
          </button>
        </form>
      )}
      <p className="text-2xl sm:text-3xl">{message}</p>
    </>
  );
}
