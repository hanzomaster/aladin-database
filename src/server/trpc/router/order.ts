import { OrderStatus, Prisma } from "@prisma/client";
import { TRPCError } from '@trpc/server';
import { z } from "zod";
import { adminProcedure, protectedProcedure, router } from "../trpc";

export const orderRouter = router({
  getAll: adminProcedure.query(({ ctx }) => {
    return ctx.prisma.order.findMany({
      include: {
        orderdetail: {
          include: {
            productDetail: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }),
  getAllOfUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.order.findMany({
      where: {
        customerNumber: ctx.session.user.id,
      },
      include: {
        orderdetail: {
          include: {
            productDetail: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  }),
  getOneWhere: protectedProcedure
    .input(
      z.object({
        orderNumber: z.string().cuid(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.order.findUnique({
        where: {
          orderNumber: input.orderNumber,
        },
        include: {
          orderdetail: {
            include: {
              productDetail: {
                include: {
                  product: true,
                },
              },
            },
          },
          address: true,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z
        .object({
          note: z.string(),
          address: z.object({
            receiver: z.string(),
            phone: z.string(),
            city: z.string(),
            district: z.string(),
            ward: z.string(),
            detail: z.string(),
          }),
          addressId: z.string(),
        })
        .partial()
    )
    .mutation(async ({ ctx, input }) => {
      const userCart = await ctx.prisma.cart.findUnique({
        where: {
          userId: ctx.session.user.id,
        },
        include: {
          cartItem: {
            select: {
              numberOfItems: true,
              size: true,
              productDetail: {
                select: {
                  id: true,
                  product: {
                    select: {
                      buyPrice: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (!userCart) {
        throw new TRPCError({
          code : 'NOT_FOUND',
          message: 'Cart not found'
        });
      }
      if (!userCart.cartItem.length) {
        throw new TRPCError({
          code : 'NOT_FOUND',
          message: 'Cart is empty'
        });
      }
      if (!input.address && !input.addressId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Address is required',
        });
      }
      let result: Prisma.OrderGetPayload<null> | undefined;
      if (!input.address && input.addressId) {
        result = await ctx.prisma.order.create({
          data: {
            customer: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            address: {
              connect: {
                id: input.addressId,
              },
            },
            orderdetail: {
              create: userCart.cartItem.map((cartItem) => ({
                quantityInOrdered: cartItem.numberOfItems,
                priceEach: cartItem.productDetail.product.buyPrice,
                size: cartItem.size,
                productDetailId: cartItem.productDetail.id,
              })),
            },
            note: input.note,
          },
        });
      }
      if (input.address && !input.addressId)
        result = await ctx.prisma.order.create({
          data: {
            customer: {
              connect: {
                id: ctx.session.user.id,
              },
            },
            address: {
              create: {
                receiver: input.address.receiver,
                phone: input.address.phone,
                city: input.address.city,
                district: input.address.district,
                ward: input.address.ward,
                detail: input.address.detail,
                userId: ctx.session.user.id,
              },
            },
            orderdetail: {
              create: userCart.cartItem.map((cartItem) => ({
                quantityInOrdered: cartItem.numberOfItems,
                priceEach: cartItem.productDetail.product.buyPrice,
                size: cartItem.size,
                productDetailId: cartItem.productDetail.id,
              })),
            },
            note: input.note,
          },
        });
      await ctx.prisma.cart.update({
        where: {
          userId: ctx.session.user.id,
        },
        data: {
          cartItem: {
            deleteMany: {},
          },
        },
      });
      return result;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        orderNumber: z.string().cuid(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.order.delete({
        where: {
          orderNumber: input.orderNumber,
        },
      });
    }),
  cancelOrder: protectedProcedure
    .input(
      z.object({
        orderNumber: z.string().cuid(),
        cancelReason: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // check if order number include in user's order
      const order = await ctx.prisma.order.findUnique({
        where: {
          orderNumber: input.orderNumber,
        },
        select: {
          customerNumber: true,
        },
      });
      if (!order || order.customerNumber !== ctx.session.user.id ) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order not found",
        });
      }
      return ctx.prisma.order.update({
        where: {
          orderNumber: input.orderNumber,
        },
        data: {
          status: OrderStatus.CANCEL_PENDING,
          cancelReason: input.cancelReason,
        },
      });
    }),

    UpdateOrderStatus: protectedProcedure
    .input(
      z.object({
        orderNumber: z.string().cuid(),
        cancelReason: z.string(),
        returnReason: z.string(),
        status: z.nativeEnum(OrderStatus,{
          invalid_type_error: "status must be an enum",
        })
      })
    )
    .mutation(async ({ ctx, input }) => {
      // check if order number include in user's order
      const order = await ctx.prisma.order.findUnique({
        where: {
          orderNumber: input.orderNumber,
        },
        select: {
          customerNumber: true,
        },
      });
      if (!order || order.customerNumber !== ctx.session.user.id ) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Order not found",
        });
      }
      if(input.status === OrderStatus.CANCEL_PENDING) {
      return ctx.prisma.order.update({
        where: {
          orderNumber: input.orderNumber,
        },
        data: {
          status: input.status,
          cancelReason: input.cancelReason
        },
      });} else if (input.status === OrderStatus.RETURN_PENDING) {
        return ctx.prisma.order.update({
          where: {
            orderNumber: input.orderNumber,
          },
          data: {
            status: input.status,
            returnReason: input.returnReason
          },
        });
      } else {
        return ctx.prisma.order.update({
          where: {
            orderNumber: input.orderNumber,
          },
          data: {
            status: input.status,
            returnReason: input.returnReason
          },
        });
      }

    }),
});
