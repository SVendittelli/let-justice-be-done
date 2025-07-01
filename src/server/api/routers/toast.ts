import { env } from "~/env";
import { TOAST_CHANNEL, TOAST_MESSAGE, TOAST_REVEAL } from "~/lib/pusher";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";
import Pusher from "pusher";
import { z } from "zod";

const {
  NEXT_PUBLIC_PUSHER_CLUSTER: cluster,
  NEXT_PUBLIC_PUSHER_KEY: key,
  PUSHER_APP_ID: appId,
  PUSHER_SECRET: secret,
} = env;
const pusher = new Pusher({ appId, cluster, key, secret });

export const toastRouter = createTRPCRouter({
  message: adminProcedure
    .input(z.string().min(1))
    .mutation(async ({ input }) => {
      return pusher.trigger(TOAST_CHANNEL, TOAST_MESSAGE, input);
    }),

  reveal: adminProcedure.mutation(async () => {
    return pusher.trigger(TOAST_CHANNEL, TOAST_REVEAL, null);
  }),
});
