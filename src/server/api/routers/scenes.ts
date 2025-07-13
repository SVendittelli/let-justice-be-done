import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import z from "zod";

export const scenesRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        revealed: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.crimeScene.create({
        data: {
          name: input.name,
          description: input.description,
          revealed: input.revealed,
          revealedAt: input.revealed ? new Date() : null,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    const isAdmin = ctx.session.user.role === "ADMIN";
    const where = { ...(!isAdmin && { revealed: true }) };

    return ctx.db.crimeScene.findMany({
      where,
      include: {
        clues: { where, orderBy: { title: "asc" } },
        npcs: { where, orderBy: { name: "asc" } },
      },
      orderBy: { name: "asc" },
    });
  }),

  getById: protectedProcedure
    .input(z.string().cuid2())
    .query(({ ctx, input }) => {
      const isAdmin = ctx.session.user.role === "ADMIN";
      return ctx.db.crimeScene.findUnique({
        where: { id: input, ...(!isAdmin && { revealed: true }) },
      });
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string().cuid2(),
        name: z.string().min(1),
        description: z.string().min(1),
        revealed: z.boolean().default(false),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.crimeScene.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          revealed: input.revealed,
          revealedAt: input.revealed ? new Date() : null,
        },
      });
    }),

  link: adminProcedure
    .input(
      z.object({
        id: z.string().cuid2(),
        clues: z.array(z.string().cuid2()).optional(),
        npcs: z.array(z.string().cuid2()).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const clues = input.clues ?? [];
      const npcs = input.npcs ?? [];
      return ctx.db.crimeScene.update({
        where: { id: input.id },
        data: {
          clues: { set: clues.map((id) => ({ id })) },
          npcs: { set: npcs.map((id) => ({ id })) },
        },
      });
    }),

  unlink: adminProcedure
    .input(
      z.object({
        id: z.string().cuid2(),
        clues: z.array(z.string().cuid2()).optional(),
        npcs: z.array(z.string().cuid2()).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const clues = input.clues ?? [];
      const npcs = input.npcs ?? [];
      return ctx.db.crimeScene.update({
        where: { id: input.id },
        data: {
          clues: { disconnect: clues.map((id) => ({ id })) },
          npcs: { disconnect: npcs.map((id) => ({ id })) },
        },
      });
    }),

  delete: adminProcedure
    .input(z.string().cuid2())
    .mutation(({ ctx, input }) => {
      return ctx.db.crimeScene.delete({ where: { id: input } });
    }),
});
