import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const cluesRouter = createTRPCRouter({
  create: adminProcedure
    .input(z.object({ title: z.string().min(1), text: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.clue.create({
        data: { title: input.title, text: input.text },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    const isAdmin = ctx.session.user.role === "ADMIN";
    return ctx.db.clue.findMany({
      where: { ...(!isAdmin && { revealed: true }) },
    });
  }),

  getById: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    const isAdmin = ctx.session.user.role === "ADMIN";
    return ctx.db.clue.findUnique({
      where: { id: input, ...(!isAdmin && { revealed: true }) },
    });
  }),
});
