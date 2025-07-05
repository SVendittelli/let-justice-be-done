import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const scenesRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.crimeScene.findMany({ orderBy: { name: "asc" } });
  }),
});
