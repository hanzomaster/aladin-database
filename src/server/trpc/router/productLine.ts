import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../trpc";
import {
  createProductLineSchema,
  getAllSchema,
  getManyProductLineSchema,
  getOneProductLineSchema,
} from "./dto";
import redisClient from "@utils/redis";
import { TRPCError } from "@trpc/server";
import { ProductLine } from "@prisma/client";

export const productLineRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(async ({ ctx, input }) => {
    try {
      const cacheResult = await redisClient.get("productLines");
      if (cacheResult) {
        return (await JSON.parse(cacheResult)) as ProductLine[];
      }
      const result = await ctx.slavePrisma.productLine.findMany({
        skip: input?.skip,
        take: input?.take,
      });
      redisClient.set("productLines", JSON.stringify(result));
      return result;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
  getOneWhere: publicProcedure.input(getOneProductLineSchema).query(({ ctx, input }) =>
    ctx.slavePrisma.productLine.findUnique({
      where: input,
      include: {
        products: true,
      },
    })
  ),
  getManyWhere: publicProcedure.input(getManyProductLineSchema).query(({ ctx, input }) =>
    ctx.slavePrisma.productLine.findMany({
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
