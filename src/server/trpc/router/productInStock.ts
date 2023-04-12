import { ClothSize } from "@prisma/client";
import { publicProcedure, router } from "../trpc";
import {
  getManyProductInStockSchema
} from "./dto";

export const productInStockRouter = router({
  getManyWhere: publicProcedure.input(getManyProductInStockSchema).query(({ ctx, input }) =>
  ctx.prisma.productInStock.findMany({
    where: {
      productDetailId: input.productDetailId,
    },
  })
),
getOneWhere: publicProcedure.input(getManyProductInStockSchema).query(({ ctx, input }) =>
ctx.prisma.productInStock.findUnique({
  where: {
   productDetailId_size: {
    productDetailId: input.productDetailId as string,
    size: input.size as ClothSize
   }
 
  },
})
),
});
