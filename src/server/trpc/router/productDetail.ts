import { z } from "zod";
import { adminProcedure, publicProcedure, router } from "../trpc";
import {
  createProductDetailSchema,
  deleteProductDetailSchema,
  getAllSchema,
  updateProductDetailSchema,
} from "./dto";
import { ProductDetail, ProductLine } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import redisClient from "@utils/redis";

export const productDetailRouter = router({
  getAll: publicProcedure.input(getAllSchema).query(async ({ ctx, input }) =>
    ctx.slavePrisma.productDetail.findMany({
      skip: input?.skip,
      take: input?.take,
    })
  ),
  getAllOfProduct: publicProcedure
    .input(
      z.object({
        productCode: z.string().cuid(),
      })
    )
    .query(async ({ ctx, input }) =>
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
    .query(async ({ ctx, input }) =>
      ctx.slavePrisma.productDetail.findUnique({
        where: {
          id: input.id,
        },
        include: {
          productInStock: true,
        },
      })
    ),
  create: adminProcedure.input(createProductDetailSchema).query(async ({ ctx, input }) => {
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
    });
  }),
  update: adminProcedure.input(updateProductDetailSchema).query(async ({ ctx, input }) => {
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
    });
  }),
  delete: adminProcedure.input(deleteProductDetailSchema).query(async ({ ctx, input }) => {
    let delProduct: ProductDetail;
    if (!input.id && input.product_color) {
      delProduct = await ctx.prisma.productDetail.delete({
        where: {
          productCode_colorCode: {
            productCode: input.product_color.productCode,
            colorCode: input.product_color.colorCode,
          },
        },
      });
    } else if (input.id && !input.product_color) {
      delProduct = await ctx.prisma.productDetail.delete({
        where: {
          id: input.id,
        },
      });
    } else {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid request",
      });
    }
  }),
});
