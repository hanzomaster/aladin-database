import { adminProcedure, protectedProcedure, router } from "../trpc";
import { z } from "zod";

export const cartRouter = router({
  /**
   * Get the cart of the current logged in user
   */
  get: protectedProcedure.query(({ ctx }) =>
    ctx.slavePrisma.cart.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        cartItem: {
          include: {
            productDetail: {
              select: {
                id: true,
                colorCode: true,
                image: true,
                product: {
                  select: {
                    code: true,
                    buyPrice: true,
                    name: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  ),
  /**
   * Clear the cart of the current logged in user
   */
  clear: protectedProcedure.mutation(async ({ ctx }) => {
    const cartId = await ctx.prisma.cart.findUnique({
      where: {
        userId: ctx.session.user.id,
      },
      select: {
        id: true,
      },
    });
    return ctx.prisma.cartItem.deleteMany({
      where: {
        cartId: cartId?.id,
      },
    });
  }),
  getTotal: protectedProcedure
    .input(
      z.object({
        cartId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      if (!input.cartId) {
        const cartId = await ctx.prisma.cart.findUnique({
          where: {
            userId: ctx.session.user.id,
          },
          select: {
            id: true,
          },
        });
        input.cartId = cartId?.id;
      }
      const query = "total_cart(" + input.cartId + ")";
      return await ctx.prisma.$queryRaw<number>`SELECT ${query}`;
    }),
  getAll: adminProcedure.query(({ ctx }) =>
    ctx.prisma.cart.findMany({
      include: {
        cartItem: {
          select: {
            numberOfItems: true,
            size: true,
            productDetail: {
              select: {
                id: true,
                colorCode: true,
                image: true,
                product: {
                  select: {
                    buyPrice: true,
                    name: true,
                    description: true,
                  },
                },
              },
            },
          },
        },
      },
    })
  ),
});
