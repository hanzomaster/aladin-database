import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../trpc";
import {
  createProductLineSchema,
  getAllSchema,
  getManyProductLineSchema,
  getOneProductLineSchema
} from "./dto";

export const productLineRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(({ ctx, input }) =>
    ctx.prisma.productLine.findMany({
      skip: input?.skip,
      take: input?.take,
    })
  ),
  getOneWhere: publicProcedure.input(getOneProductLineSchema).query(({ ctx, input }) =>
    ctx.prisma.productLine.findUnique({
      where: input,
      include: {
        products: true,
      },
    })
  ),
  getManyWhere: publicProcedure.input(getManyProductLineSchema).query(({ ctx, input }) =>
    ctx.prisma.productLine.findMany({
      where: input,
    })
  ),
  create: adminProcedure.input(createProductLineSchema).mutation(({ ctx, input }) =>
    ctx.prisma.productLine.create({
      data: input,
    })
  ),
  update: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        dto: createProductLineSchema.partial(),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.productLine.update({
        where: {
          id: input.id,
        },
        data: input.dto,
      })
    ),
  delete: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.productLine.delete({
        where: {
          id: input.id,
        },
      })
    ),
});
