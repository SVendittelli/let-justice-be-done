import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const npcsRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        moniker: z.string().min(1),
        description: z.string().min(1),
        type: z.enum(["AUTHORITY", "SUSPECT"]),
        imageUrl: z.string().url(),
        imageBlurData: z.string().min(1),
        revealed: z.boolean().default(false),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.nonPlayerCharacter.create({
        data: {
          name: input.name,
          moniker: input.moniker,
          description: input.description,
          type: input.type,
          imageUrl: input.imageUrl,
          imageBlurData: input.imageBlurData,
          revealed: input.revealed,
          revealedAt: input.revealed ? new Date() : null,
        },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    const isAdmin = ctx.session.user.role === "ADMIN";
    const where = { ...(!isAdmin && { revealed: true }) };

    return ctx.db.nonPlayerCharacter.findMany({
      where,
      include: {
        clues: { where, orderBy: { title: "asc" } },
        crimeScenes: { where, orderBy: { name: "asc" } },
      },
      orderBy: { name: "asc" },
    });
  }),

  getByRole: protectedProcedure
    .input(z.enum(["AUTHORITY", "SUSPECT"]))
    .query(({ ctx, input }) => {
      const isAdmin = ctx.session.user.role === "ADMIN";
      const where = { ...(!isAdmin && { revealed: true }) };

      return ctx.db.nonPlayerCharacter.findMany({
        where: { type: input, ...where },
        include: {
          clues: { where, orderBy: { title: "asc" } },
          crimeScenes: { where, orderBy: { name: "asc" } },
        },
        orderBy: { name: "asc" },
      });
    }),

  getById: protectedProcedure
    .input(z.string().cuid2())
    .query(({ ctx, input }) => {
      const isAdmin = ctx.session.user.role === "ADMIN";
      return ctx.db.nonPlayerCharacter.findUnique({
        where: { id: input, ...(!isAdmin && { revealed: true }) },
      });
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string().cuid2(),
        name: z.string().min(1),
        moniker: z.string().min(1),
        description: z.string().min(1),
        type: z.enum(["AUTHORITY", "SUSPECT"]),
        imageUrl: z.string().url(),
        imageBlurData: z.string().min(1),
        revealed: z.boolean().default(false),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.nonPlayerCharacter.update({
        where: { id: input.id },
        data: {
          name: input.name,
          moniker: input.moniker,
          description: input.description,
          type: input.type,
          imageUrl: input.imageUrl,
          imageBlurData: input.imageBlurData,
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
        crimeScenes: z.array(z.string().cuid2()).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const crimeScenes = input.crimeScenes ?? [];
      const clues = input.clues ?? [];
      return ctx.db.nonPlayerCharacter.update({
        where: { id: input.id },
        data: {
          clues: { set: clues.map((id) => ({ id })) },
          crimeScenes: { set: crimeScenes.map((id) => ({ id })) },
        },
      });
    }),

  unlink: adminProcedure
    .input(
      z.object({
        id: z.string().cuid2(),
        clues: z.array(z.string().cuid2()).optional(),
        crimeScenes: z.array(z.string().cuid2()).optional(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const crimeScenes = input.crimeScenes ?? [];
      const clues = input.clues ?? [];
      return ctx.db.nonPlayerCharacter.update({
        where: { id: input.id },
        data: {
          clues: { disconnect: clues.map((id) => ({ id })) },
          crimeScenes: { disconnect: crimeScenes.map((id) => ({ id })) },
        },
      });
    }),

  delete: adminProcedure
    .input(z.string().cuid2())
    .mutation(({ ctx, input }) => {
      return ctx.db.nonPlayerCharacter.delete({ where: { id: input } });
    }),
});
