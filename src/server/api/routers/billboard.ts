import { env } from "~/env";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";
import Pusher from "pusher";
import { z } from "zod";
import {
  BILLBOARD_CHANNEL,
  BILLBOARD_DISPLAY,
  BILLBOARD_REFRESH,
} from "~/lib/pusher";

const {
  NEXT_PUBLIC_PUSHER_CLUSTER: cluster,
  NEXT_PUBLIC_PUSHER_KEY: key,
  PUSHER_APP_ID: appId,
  PUSHER_SECRET: secret,
} = env;
const pusher = new Pusher({ appId, cluster, key, secret });

export const billboardRouter = createTRPCRouter({
  display: adminProcedure
    .input(z.object({ path: z.string().min(1) }))
    .mutation(async ({ input }) => {
      return pusher.trigger(BILLBOARD_CHANNEL, BILLBOARD_DISPLAY, input.path);
    }),

  refresh: adminProcedure.mutation(async () =>
    pusher.trigger(BILLBOARD_CHANNEL, BILLBOARD_REFRESH, ""),
  ),
});
