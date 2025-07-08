import { env } from "~/env";
import {
  TOAST_CHANNEL,
  TOAST_MESSAGE,
  TOAST_REVEAL,
  TOAST_SUSPICION,
  toastSchema,
} from "~/lib/pusher";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";
import Pusher from "pusher";

const {
  NEXT_PUBLIC_PUSHER_CLUSTER: cluster,
  NEXT_PUBLIC_PUSHER_KEY: key,
  PUSHER_APP_ID: appId,
  PUSHER_SECRET: secret,
} = env;
const pusher = new Pusher({ appId, cluster, key, secret });

export const toastRouter = createTRPCRouter({
  message: adminProcedure
    .input(toastSchema.message)
    .mutation(async ({ input }) => {
      return pusher.trigger(TOAST_CHANNEL, TOAST_MESSAGE, input);
    }),

  reveal: adminProcedure
    .input(toastSchema.reveal)
    .mutation(async ({ input }) => {
      return pusher.trigger(TOAST_CHANNEL, TOAST_REVEAL, input);
    }),

  suspicion: adminProcedure.mutation(async ({ ctx }) => {
    return ctx.db.suspicion
      .count()
      .then((count) => pusher.trigger(TOAST_CHANNEL, TOAST_SUSPICION, count));
  }),
});
