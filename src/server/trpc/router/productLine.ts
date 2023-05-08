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
      const cacheResult: string | any[] = [];
      if (cacheResult.length > 0) {
        console.log("productLine", cacheResult.length);
        const numberOfProductLines = await ctx.slavePrisma.productLine.count();
        if (cacheResult.length === numberOfProductLines) return cacheResult as ProductLine[];
      }
      const result = await ctx.slavePrisma.productLine.findMany({
        skip: input?.skip,
        take: input?.take,
      });
      return result;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
  getOneWhere: publicProcedure.input(getOneProductLineSchema).query(async ({ ctx, input }) => {
    const cacheResult = null;
    if (cacheResult) {
      return JSON.parse(cacheResult) as ProductLine;
    }
    const result = await ctx.slavePrisma.productLine.findUnique({
      where: input,
      include: {
        products: true,
      },
    });
    if (!result) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Product line not found",
      });
    }
    return result;
  }),
  getManyWhere: publicProcedure.input(getManyProductLineSchema).query(({ ctx, input }) =>
    ctx.slavePrisma.productLine.findMany({
      where: input,
    })
  ),
  create: adminProcedure.input(createProductLineSchema).mutation(async ({ ctx, input }) => {
    const product = await ctx.prisma.productLine.create({
      data: input,
    });
    return product;
  }),
  update: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        dto: createProductLineSchema.partial(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updateProduct = await ctx.prisma.productLine.update({
        where: {
          id: input.id,
        },
        data: input.dto,
      });
      return updateProduct;
    }),
  delete: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const delProduct = await ctx.prisma.productLine.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
