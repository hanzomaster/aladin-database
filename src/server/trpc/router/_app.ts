// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { authRouter } from "./auth";
import { cartItemRouter } from "./carItem";
import { cartRouter } from "./cart";
import { exampleRouter } from "./example";
import { orderRouter } from "./order";
import { orderDetailRouter } from "./orderDetail";
import { productRouter } from "./product";
import { productDetailRouter } from "./productDetail";
import { productLineRouter } from "./productLine";
import { addressRouter } from "./user/address";
import { userRouter } from "./user/user";


export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  cartItem: cartItemRouter,
  cart: cartRouter,
  user: userRouter,
  product: productRouter,
  productLine: productLineRouter,
  productDetail: productDetailRouter,
  order: orderRouter,
  orderDetail: orderDetailRouter,
  address: addressRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
