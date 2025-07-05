import { env } from "~/env";
import {
  BILLBOARD_CHANNEL,
  BILLBOARD_DISPLAY,
  BILLBOARD_REFRESH,
  billboardSchema,
} from "~/lib/pusher";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import Pusher from "pusher";

const {
  NEXT_PUBLIC_PUSHER_CLUSTER: cluster,
  NEXT_PUBLIC_PUSHER_KEY: key,
  PUSHER_APP_ID: appId,
  PUSHER_SECRET: secret,
} = env;
const pusher = new Pusher({ appId, cluster, key, secret });

export const billboardRouter = createTRPCRouter({
  current: protectedProcedure
    .input(billboardSchema.current)
    .query(async ({ ctx }) => {
      return ctx.db.billboard.findFirst({ orderBy: { updatedAt: "desc" } });
    }),

  display: adminProcedure
    .input(billboardSchema.display)
    .mutation(async ({ ctx, input }) => {
      return ctx.db.billboard
        .create({ data: input })
        .then(() =>
          pusher.trigger(BILLBOARD_CHANNEL, BILLBOARD_DISPLAY, input),
        );
    }),

  refresh: adminProcedure
    .input(billboardSchema.refresh)
    .mutation(async () =>
      pusher.trigger(BILLBOARD_CHANNEL, BILLBOARD_REFRESH, ""),
    ),
});
