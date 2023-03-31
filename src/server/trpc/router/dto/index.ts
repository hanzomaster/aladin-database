import { number, object } from "zod";

export * from "./cart.dto";
export * from "./product.dto";
export * from "./productDetail.dto";
export * from "./productLine.dto";

export const getAllSchema = object({
  skip: number().min(0).default(0),
  take: number().min(1).max(100).default(20),
}).optional();
