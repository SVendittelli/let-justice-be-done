import { z } from "zod";
import Pusher from "pusher";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { env } from "~/env";

const {
  NEXT_PUBLIC_PUSHER_CLUSTER: cluster,
  NEXT_PUBLIC_PUSHER_KEY: key,
  PUSHER_APP_ID: appId,
  PUSHER_SECRET: secret,
} = env;
const pusher = new Pusher({ appId, cluster, key, secret });

export const messagesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ message: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return pusher.trigger("TEST", "TEST_EVENT", input.message);
    }),
});
