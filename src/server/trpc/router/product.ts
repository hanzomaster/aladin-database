import { ClothSize, Gender, Product, ProductDetail, ProductInStock } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import redisClient from "@utils/redis";
import { MeiliSearchApiError } from "meilisearch";
import { z } from "zod";
import meilisearchClient from "../../../utils/meilisearch";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "../trpc";
import {
  createProductSchema,
  getAllSchema,
  getManyProductSchema,
  updateProductSchema,
} from "./dto";

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
            onSale: true,
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
        });
      } catch (err) {
        if (err instanceof MeiliSearchApiError) {
          return ctx.slavePrisma.product.findMany({
            where: {
              name: {
                contains: input.name,
              },
              onSale: true,
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
      const cacheResult = [];
      for await (const { field, value } of redisClient.hScanIterator("products")) {
        cacheResult.push(JSON.parse(value));
      }
      if (cacheResult) {
        const numberOfProducts = await ctx.slavePrisma.product.count();
        if (cacheResult.length === numberOfProducts) {
          return cacheResult as (Product & {
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
      result.forEach((product) => {
        redisClient.hSet("products", product.code, JSON.stringify(product));
      });
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
    .query(async ({ ctx, input }) => {
      const cacheResult = await redisClient.hGet("products", input.code);
      if (cacheResult) {
        return JSON.parse(cacheResult) as Product & {
          productDetail: (ProductDetail & {
            productInStock: {
              quantity: number;
              size: ClothSize;
            }[];
          })[];
          line: {
            type: string;
            gender: Gender;
            textDescription: string | null;
            htmlDescription: string | null;
          };
        };
      }
      const result = await ctx.slavePrisma.product.findUnique({
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
      });
      if (!result) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }
      redisClient.hSet("products", result.code, JSON.stringify(result));
      return result;
    }),
  getManyWhere: publicProcedure.input(getManyProductSchema).query(({ ctx, input }) =>
    ctx.slavePrisma.product.findMany({
      where: {
        onSale: true,
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
  create: adminProcedure.input(createProductSchema).mutation(async ({ ctx, input }) => {
    const product = await ctx.prisma.product.create({
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
    });
    redisClient.hSet("products", product.code, JSON.stringify(product));
    meilisearchClient.index("products").addDocuments([
      {
        code: product.code,
        name: product.name,
      },
    ]);
    return product;
  }),
  update: protectedProcedure
    .input(
      z.object({
        code: z.string().cuid(),
        dto: updateProductSchema,
      })
    )
    .mutation(async ({ ctx, input }) => {
      let updateProduct;
      if (!input.dto.productDetail) {
        updateProduct = await ctx.prisma.product.update({
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
        updateProduct = await ctx.prisma.product.update({
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
      redisClient.hSet("products", updateProduct.code, JSON.stringify(updateProduct));
      meilisearchClient.index("products").updateDocuments([
        {
          code: updateProduct.code,
          name: updateProduct.name,
        },
      ]);
      return updateProduct;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        code: z.string().cuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      redisClient.hDel("products", input.code);
      meilisearchClient.index("products").deleteDocument(input.code);
      ctx.prisma.product.delete({
        where: {
          code: input.code,
        },
      });
    }),
  removeFromStock: adminProcedure
    .input(
      z.object({
        code: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findUnique({
        where: {
          code: input.code,
        },
      });
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }
      if (!product.onSale) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product is not on sale",
        });
      }
      try {
        redisClient.hSet("products", input.code, JSON.stringify(product));
        meilisearchClient.index("products").deleteDocument(input.code);
        return await ctx.prisma.product.update({
          where: {
            code: input.code,
          },
          data: {
            onSale: false,
            stopSellingFrom: new Date(),
          },
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  addToStock: adminProcedure
    .input(
      z.object({
        code: z.string().cuid(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const product = await ctx.prisma.product.findUnique({
        where: {
          code: input.code,
        },
      });
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }
      if (product.onSale) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Product is already on sale",
        });
      }
      try {
        redisClient.hSet("products", input.code, JSON.stringify(product));
        meilisearchClient.index("products").addDocuments([
          {
            code: product.code,
            name: product.name,
          },
        ]);
        return await ctx.prisma.product.update({
          where: {
            code: input.code,
          },
          data: {
            onSale: true,
            stopSellingFrom: null,
          },
        });
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    }),
  getTotalRevenue: adminProcedure.query(async ({ ctx }) => {
    const results: never = await ctx.prisma.$queryRaw`SELECT total_revenue()`;
    return results[0]["total_revenue()"] as number;
  }),
});
