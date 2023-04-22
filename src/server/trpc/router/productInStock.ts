import { ClothSize, ProductInStock } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import redisClient from "@utils/redis";
import { adminProcedure, publicProcedure, router } from "../trpc";
import { getManyProductInStockSchema, updateStockSchema } from "./dto";

export const productInStockRouter = router({
  getManyWhere: publicProcedure.input(getManyProductInStockSchema).query(async ({ ctx, input }) =>
    ctx.slavePrisma.productInStock.findMany({
      where: {
        productDetailId: input.productDetailId,
      },
    })
  ),
  getOneWhere: publicProcedure.input(getManyProductInStockSchema).query(async ({ ctx, input }) =>
    ctx.slavePrisma.productInStock.findUnique({
      where: {
        productDetailId_size: {
          productDetailId: input.productDetailId as string,
          size: input.size as ClothSize,
        },
      },
    })
  ),
  update: adminProcedure.input(updateStockSchema).mutation(async ({ ctx, input }) => {
    const updateProduct = await ctx.prisma.productInStock.update({
      where: {
        productDetailId_size: {
          productDetailId: input.productDetailId,
          size: input.size,
        },
      },
      data: {
        quantity: input.quantity,
      },
      select: {
        productDetail: {
          select: {
            product: {
              select: {
                code: true,
              },
            },
          },
        },
      },
    });
    redisClient.hDel("products", updateProduct.productDetail.product.code);
  }),
  delete: adminProcedure.input(getManyProductInStockSchema).mutation(async ({ ctx, input }) => {
    const deleteProduct = await ctx.prisma.productInStock.delete({
      where: {
        productDetailId_size: {
          productDetailId: input.productDetailId as string,
          size: input.size as ClothSize,
        },
      },
      select: {
        productDetail: {
          select: {
            product: {
              select: {
                code: true,
              },
            },
          },
        },
      },
    });
    redisClient.hDel("products", deleteProduct.productDetail.product.code);
  }),
});
