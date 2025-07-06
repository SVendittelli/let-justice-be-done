import {
  adminProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const pcsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        pronouns: z.string().min(1),
        description: z.string().min(1),
        traits: z.tuple([z.string().min(1), z.string().min(1)]),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.playerCharacter.create({
        data: {
          name: input.name,
          pronouns: input.pronouns,
          description: input.description,
          traits: input.traits,
          user: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getCurrent: protectedProcedure.query(({ ctx }) => {
    return ctx.db.playerCharacter.findUnique({
      include: { user: { select: { name: true, email: true, image: true } } },
      where: { userId: ctx.session.user.id },
    });
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    const isAdmin = ctx.session.user.role === "ADMIN";
    return ctx.db.playerCharacter.findMany({
      include: { user: { select: { name: true, email: true, image: true } } },
      where: { ...(!isAdmin && { user: { enabled: true } }) },
      orderBy: { name: "asc" },
    });
  }),

  getById: protectedProcedure
    .input(z.string().cuid2())
    .query(({ ctx, input }) => {
      const isAdmin = ctx.session.user.role === "ADMIN";
      return ctx.db.playerCharacter.findUnique({
        include: { user: { select: { name: true, email: true, image: true } } },
        where: { id: input, ...(!isAdmin && { user: { enabled: true } }) },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid2(),
        name: z.string().min(1),
        pronouns: z.string().min(1),
        description: z.string().min(1),
        traits: z.tuple([z.string().min(1), z.string().min(1)]),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.playerCharacter.update({
        where: { id: input.id },
        data: {
          name: input.name,
          pronouns: input.pronouns,
          description: input.description,
          traits: input.traits,
        },
      });
    }),

  delete: adminProcedure
    .input(z.string().cuid2())
    .mutation(({ ctx, input }) => {
      return ctx.db.playerCharacter.delete({ where: { id: input } });
    }),
});
