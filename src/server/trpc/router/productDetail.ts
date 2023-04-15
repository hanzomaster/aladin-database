import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../trpc";
import {
  createProductDetailSchema,
  deleteProductDetailSchema,
  getAllSchema,
  updateProductDetailSchema,
} from "./dto";
import { ProductLine } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import redisClient from "@utils/redis";

export const productDetailRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(async ({ ctx, input }) => {
    try {
      const cacheResult = await redisClient.get("productDetails");
      if (cacheResult) {
        return (await JSON.parse(cacheResult)) as ProductLine[];
      }
      const result = await ctx.slavePrisma.productDetail.findMany({
        skip: input?.skip,
        take: input?.take,
      });
      redisClient.set("productDetails", JSON.stringify(result));
      return result;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
  getAllOfProduct: publicProcedure
    .input(
      z.object({
        productCode: z.string().cuid(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.slavePrisma.productDetail.findMany({
        where: {
          productCode: input.productCode,
        },
        include: {
          productInStock: true,
        },
      })
    ),
  getOneWhereId: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.slavePrisma.productDetail.findUnique({
        where: {
          id: input.id,
        },
        include: {
          productInStock: true,
        },
      })
    ),
  create: adminProcedure.input(createProductDetailSchema).query(({ ctx, input }) =>
    ctx.prisma.productDetail.create({
      data: {
        product: {
          connect: {
            code: input.productCode,
          },
        },
        colorCode: input.colorCode,
        image: input.image,
      },
    })
  ),
  update: adminProcedure.input(updateProductDetailSchema).query(({ ctx, input }) =>
    ctx.prisma.productDetail.update({
      where: {
        productCode_colorCode: {
          colorCode: input.colorCode,
          productCode: input.productCode,
        },
      },
      data: {
        colorCode: input.dto.colorCode,
        image: input.dto.image,
      },
    })
  ),
  delete: adminProcedure.input(deleteProductDetailSchema).query(({ ctx, input }) => {
    if (!input.id && input.product_color) {
      return ctx.prisma.productDetail.delete({
        where: {
          productCode_colorCode: {
            productCode: input.product_color.productCode,
            colorCode: input.product_color.colorCode,
          },
        },
      });
    } else {
      return ctx.prisma.productDetail.delete({
        where: {
          id: input.id,
        },
      });
    }
  }),
});
