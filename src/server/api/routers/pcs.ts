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
      where: { userId: ctx.session.user.id },
    });
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.playerCharacter.findMany({ orderBy: { name: "asc" } });
  }),

  getById: protectedProcedure
    .input(z.string().cuid2())
    .query(({ ctx, input }) => {
      return ctx.db.playerCharacter.findUnique({ where: { id: input } });
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
