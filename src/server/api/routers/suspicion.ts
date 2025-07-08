import { adminProcedure, createTRPCRouter, protectedProcedure } from "../trpc";

export const suspicionRouter = createTRPCRouter({
  create: adminProcedure.mutation(async ({ ctx }) => {
    return ctx.db.suspicion.create({ data: {} });
  }),

  count: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.suspicion.count({});
  }),

  delete: adminProcedure.mutation(async ({ ctx }) => {
    return ctx.db.suspicion.deleteMany({ limit: 1 });
  }),
});
