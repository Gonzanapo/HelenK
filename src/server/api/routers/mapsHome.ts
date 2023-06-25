import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const homeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.mapsHome.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(
        z.object({
            name: z.string(),
            address: z.string(),
            latitude: z.number(),
            longitude: z.number()
        })
    )
    .mutation(({ ctx, input }) => {
        return ctx.prisma.mapsHome.create({
            data: {
                name: input.name,
                address: input.address,
                latitude: input.latitude,
                longitude: input.longitude,
                userId: ctx.session.user.id
            }
        });
    }),
    })


  // delete: protectedProcedure
  // .input(z.object({ id: z.number() }))
  // .query(({ input, ctx }) => {
  //     return ctx.prisma.mapsHome.delete({
  //         where: {
  //         id: input.id,
  //         },
  //     });
  //     }
  // ),
  // update: protectedProcedure
  // .input(z.object({ id: z.number(), name: z.string() }))
  // .query(({ input, ctx }) => {
  //     return ctx.prisma.mapsHome.update({
  //         where: {
  //         id: input.id,
  //         },
  //         data: {
  //             name: input.name,
  //         },
  //     });
  //     }
  // ),
