import { z } from "zod";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "../trpc";
import {
  createProductSchema,
  getAllSchema,
  getManyProductSchema,
  updateProductSchema,
} from "./dto";

export const productRouter = router({
  count: publicProcedure.query(({ ctx }) => ctx.prisma.product.count()),
  search: publicProcedure
    .input(
      z.object({
        name: z.string().max(50),
        option: z
          .object({
            skip: z.number().min(0).default(0),
            take: z.number().min(1).max(100).default(20),
          })
          .optional(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.product.findMany({
        where: {
          name: {
            contains: input.name,
          },
        },
        skip: input.option?.skip,
        take: input.option?.take,
        include: {
          line: {
            select: {
              type: true,
              gender: true,
              textDescription: true,
              htmlDescription: true,
            },
          },
          _count: true,
          productDetail: {
            include: {
              productInStock: {
                select: {
                  size: true,
                  quantity: true,
                },
              },
            },
          },
        },
      })
    ),
  getAll: publicProcedure.input(getAllSchema).query(({ ctx, input }) =>
    ctx.prisma.product.findMany({
      skip: input?.skip,
      take: input?.take,
      include: {
        line: {
          select: {
            type: true,
            gender: true,
            textDescription: true,
            htmlDescription: true,
          },
        },
        productDetail: {
          include: {
            productInStock: {
              select: {
                productDetailId: true,
                size: true,
                quantity: true,
              },
            },
          },
        },
      },
    })
  ),
  getOneWhere: publicProcedure
    .input(
      z.object({
        code: z.string().cuid(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.prisma.product.findUnique({
        where: input,
        include: {
          line: {
            select: {
              type: true,
              gender: true,
              textDescription: true,
              htmlDescription: true,
            },
          },
          productDetail: {
            include: {
              productInStock: {
                select: {
                  size: true,
                  quantity: true,
                },
              },
            },
          },
        },
      })
    ),
  getManyWhere: publicProcedure.input(getManyProductSchema).query(({ ctx, input }) =>
    ctx.prisma.product.findMany({
      where: {
        name: input.name,
        description: input.description,
        productLine: input.productLine,
        buyPrice: input.buyPrice,
        line: {
          type: input.type,
          gender: input.gender,
        },
      },
      skip: input.option?.skip,
      take: input.option?.take,
      include: {
        line: {
          select: {
            type: true,
            gender: true,
            textDescription: true,
            htmlDescription: true,
          },
        },
        productDetail: {
          include: {
            productInStock: {
              select: {
                size: true,
                quantity: true,
              },
            },
          },
        },
      },
    })
  ),
  create: adminProcedure.input(createProductSchema).mutation(async ({ ctx, input }) =>
    ctx.prisma.product.create({
      data: {
        name: input.name,
        description: input.description,
        buyPrice: input.buyPrice,
        line: {
          connectOrCreate: {
            where: {
              type_gender: {
                type: input.type,
                gender: input.gender,
              },
            },
            create: {
              type: input.type,
              gender: input.gender,
            },
          },
        },
        productDetail: {
          create: input.productDetail.map((detail) => ({
            colorCode: detail.colorCode,
            image: detail.image,
            productInStock: {
              create: [
                {
                  size: "S",
                  quantity: detail.numS,
                },
                {
                  size: "M",
                  quantity: detail.numM,
                },
                {
                  size: "L",
                  quantity: detail.numL,
                },
                {
                  size: "XL",
                  quantity: detail.numXL,
                },
              ],
            },
          })),
        },
      },
    })
  ),
  update: protectedProcedure
    .input(
      z.object({
        code: z.string().cuid(),
        dto: updateProductSchema,
      })
    )
    .mutation(({ ctx, input }) => {
      if (!input.dto.productDetail) {
        return ctx.prisma.product.update({
          where: {
            code: input.code,
          },
          data: {
            name: input.dto.name,
            description: input.dto.description,
            buyPrice: input.dto.buyPrice,
            line: {
              update: {
                type: input.dto.type,
                gender: input.dto.gender,
              },
            },
          },
        });
      } else {
        return ctx.prisma.product.update({
          where: {
            code: input.code,
          },
          data: {
            name: input.dto.name,
            description: input.dto.description,
            buyPrice: input.dto.buyPrice,
            line: {
              update: {
                type: input.dto.type,
                gender: input.dto.gender,
              },
            },
            productDetail: {
              deleteMany: {},
              createMany: {
                skipDuplicates: true,
                data: input.dto.productDetail.map((detail) => ({
                  colorCode: detail.colorCode,
                  image: detail.image,
                })),
              },
            },
          },
        });
      }
    }),
  delete: protectedProcedure
    .input(
      z.object({
        code: z.string().cuid(),
      })
    )
    .mutation(({ ctx, input }) =>
      ctx.prisma.product.delete({
        where: {
          code: input.code,
        },
      })
    ),
});
