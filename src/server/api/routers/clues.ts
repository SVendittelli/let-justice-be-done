import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const cluesRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        title: z.string().min(1),
        text: z.string().min(1),
        revealed: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.clue.create({
        data: {
          title: input.title,
          text: input.text,
          revealed: input.revealed,
          revealedAt: input.revealed ? new Date() : null,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    const isAdmin = ctx.session.user.role === "ADMIN";
    const where = { ...(!isAdmin && { revealed: true }) };

    return ctx.db.clue.findMany({
      where,
      include: {
        crimeScenes: { where, orderBy: { name: "asc" } },
        npcs: { where, orderBy: { name: "asc" } },
      },
      orderBy: [
        { revealedAt: { sort: "desc", nulls: "last" } },
        { title: "asc" },
      ],
    });
  }),

  getById: protectedProcedure
    .input(z.string().cuid2())
    .query(({ ctx, input }) => {
      const isAdmin = ctx.session.user.role === "ADMIN";
      return ctx.db.clue.findUnique({
        where: { id: input, ...(!isAdmin && { revealed: true }) },
      });
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string().cuid2(),
        title: z.string().min(1),
        text: z.string().min(1),
        revealed: z.boolean().default(false),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.clue.update({
        where: { id: input.id },
        data: {
          title: input.title,
          text: input.text,
          revealed: input.revealed,
          revealedAt: input.revealed ? new Date() : null,
        },
      });
    }),

  link: adminProcedure
    .input(
      z.object({
        id: z.string().cuid2(),
        crimeScenes: z.array(z.string().cuid2()).optional(),
        npcs: z.array(z.string().cuid2()).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const crimeScenes = input.crimeScenes ?? [];
      const npcs = input.npcs ?? [];
      return ctx.db.clue.update({
        where: { id: input.id },
        data: {
          crimeScenes: { set: crimeScenes.map((id) => ({ id })) },
          npcs: { set: npcs.map((id) => ({ id })) },
        },
      });
    }),

  unlink: adminProcedure
    .input(
      z.object({
        id: z.string().cuid2(),
        crimeScenes: z.array(z.string().cuid2()).optional(),
        npcs: z.array(z.string().cuid2()).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const crimeScenes = input.crimeScenes ?? [];
      const npcs = input.npcs ?? [];
      return ctx.db.clue.update({
        where: { id: input.id },
        data: {
          crimeScenes: { disconnect: crimeScenes.map((id) => ({ id })) },
          npcs: { disconnect: npcs.map((id) => ({ id })) },
        },
      });
    }),

  delete: adminProcedure
    .input(z.string().cuid2())
    .mutation(({ ctx, input }) => {
      return ctx.db.clue.delete({ where: { id: input } });
    }),
});
