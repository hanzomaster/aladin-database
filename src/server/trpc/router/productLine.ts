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
      const cacheResult = [];
      for await (const { field, value } of redisClient.hScanIterator("productLines")) {
        cacheResult.push(JSON.parse(value));
      }
      if (cacheResult.length > 0) {
        console.log("productLine", cacheResult.length);
        const numberOfProductLines = await ctx.slavePrisma.productLine.count();
        if (cacheResult.length === numberOfProductLines) return cacheResult as ProductLine[];
      }
      const result = await ctx.slavePrisma.productLine.findMany({
        skip: input?.skip,
        take: input?.take,
      });
      result.forEach((productLine) => {
        redisClient.hSet("productLines", productLine.id, JSON.stringify(productLine));
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
    const cacheResult = await redisClient.hGet("productLines", input.id);
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
    redisClient.hSet("productLines", result.id, JSON.stringify(result));
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
    redisClient.hSet("productLines", product.id, JSON.stringify(product));
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
      redisClient.hSet("productLines", updateProduct.id, JSON.stringify(input.dto));
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
      redisClient.hDel("productLines", delProduct.id);
    }),
});
