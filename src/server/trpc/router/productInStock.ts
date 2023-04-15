import { ClothSize, ProductInStock } from "@prisma/client";
import { publicProcedure, router } from "../trpc";
import { getManyProductInStockSchema } from "./dto";
import { TRPCError } from "@trpc/server";
import redisClient from "@utils/redis";

export const productInStockRouter = router({
  getManyWhere: publicProcedure.input(getManyProductInStockSchema).query(async ({ ctx, input }) => {
    try {
      const cacheResult = await redisClient.get("products");
      if (cacheResult) {
        return (await JSON.parse(cacheResult)) as ProductInStock[];
      }
      const result = await ctx.slavePrisma.productInStock.findMany({
        where: {
          productDetailId: input.productDetailId,
        },
      });
      redisClient.set("productsInStock." + input.productDetailId, JSON.stringify(result));
      return result;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
  getOneWhere: publicProcedure.input(getManyProductInStockSchema).query(({ ctx, input }) =>
    ctx.slavePrisma.productInStock.findUnique({
      where: {
        productDetailId_size: {
          productDetailId: input.productDetailId as string,
          size: input.size as ClothSize,
        },
      },
    })
  ),
});
