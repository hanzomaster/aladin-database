import { z } from "zod";
import meilisearchClient from "../../../utils/meilisearch";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "../trpc";
import {
  createProductSchema,
  getAllSchema,
  getManyProductSchema,
  updateProductSchema,
} from "./dto";
import { MeiliSearchApiError } from "meilisearch";
import { TRPCError } from "@trpc/server";
import { Gender, Prisma, Product, ProductDetail, ProductInStock } from "@prisma/client";
import redisClient from "@utils/redis";

export const productRouter = router({
  count: publicProcedure.query(({ ctx }) => ctx.slavePrisma.product.count()),
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
    .query(async ({ ctx, input }) => {
      try {
        const index = await meilisearchClient.getIndex("products");
        const searchResult = await index.search(input.name, {
          limit: input.option?.take,
          offset: input.option?.skip,
        });
        const productNames = searchResult.hits.map((hit) => hit.name);
        return ctx.slavePrisma.product.findMany({
          where: {
            name: {
              in: productNames,
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
        });
      } catch (err) {
        if (err instanceof MeiliSearchApiError) {
          return ctx.slavePrisma.product.findMany({
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
          });
        } else {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong",
          });
        }
      }
    }),
  getAll: publicProcedure.input(getAllSchema).query(async ({ ctx, input }) => {
    try {
      const cacheResult = await redisClient.get("products");
      if (cacheResult) {
        return (await JSON.parse(cacheResult)) as (Product & {
          productDetail: (ProductDetail & {
            productInStock: ProductInStock[];
          })[];
          line: {
            type: string;
            gender: Gender;
            textDescription: string | null;
            htmlDescription: string | null;
          };
        })[];
      }
      const result = await ctx.slavePrisma.product.findMany({
        skip: input?.skip,
        take: input?.take,
        where: {
          onSale: true,
        },
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
              productInStock: true,
            },
          },
        },
      });
      redisClient.set("products", JSON.stringify(result));
      return result;
    } catch (err) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }
  }),
  getOneWhere: publicProcedure
    .input(
      z.object({
        code: z.string().cuid(),
      })
    )
    .query(({ ctx, input }) =>
      ctx.slavePrisma.product.findUnique({
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
    ctx.slavePrisma.product.findMany({
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
