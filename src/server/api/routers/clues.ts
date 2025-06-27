import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const cluesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string().min(1), text: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.clue.create({
        data: { title: input.title, text: input.text },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.clue.findMany();
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.clue.findUnique({ where: { id: input } });
  }),
});
