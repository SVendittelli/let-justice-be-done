import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const usersRouter = createTRPCRouter({
  getCurrent: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findUnique({ where: { id: ctx.session.user.id } });
  }),

  getAll: adminProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({ orderBy: { name: "asc" } });
  }),

  getById: adminProcedure.input(z.string().cuid2()).query(({ ctx, input }) => {
    return ctx.db.user.findUnique({ where: { id: input } });
  }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string().cuid2(),
        name: z.string().min(1),
        image: z.string().url(),
        role: z.enum(["ADMIN", "USER"]),
        enabled: z.boolean(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: input.id },
        data: {
          name: input.name,
          image: input.image,
          role: input.role,
          enabled: input.enabled,
        },
      });
    }),

  bulkEnable: adminProcedure
    .input(z.object({ ids: z.array(z.string().cuid2()) }))
    .mutation(({ ctx, input }) => {
      return Promise.all([
        ctx.db.user.updateMany({
          where: { id: { in: input.ids } },
          data: { enabled: true },
        }),
        ctx.db.user.updateMany({
          where: { id: { notIn: input.ids }, role: { not: "ADMIN" } },
          data: { enabled: false },
        }),
      ]);
    }),

  delete: adminProcedure
    .input(z.string().cuid2())
    .mutation(({ ctx, input }) => {
      return ctx.db.user.delete({ where: { id: input } });
    }),
});
