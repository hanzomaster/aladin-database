import { ClothSize } from "@prisma/client";
import { z } from "zod";

export const getManyProductInStockSchema = z.object({
  productDetailId: z
    .string({
      required_error: "ProductDetailId is required",
      invalid_type_error: "ProductDetailId must be a string",
    })
    .cuid({
      message: "ProductDetailId must be a valid cuid",
    }),
  size: z.nativeEnum(ClothSize, {
    invalid_type_error: "Size must be ClothSize",
  }),
  quantity: z
    .number({
      invalid_type_error: "Quantity must be a number",
    })
    .optional(),
  option: z
    .object({
      skip: z.number().min(0).default(0),
      take: z.number().min(1).max(100).default(20),
    })
    .optional(),
});
  export const updateStockSchema = z.object({

    productDetailId: z
      .string({
        required_error: "ProductDetailId is required",
        invalid_type_error: "ProductDetailId must be a string",
      })
      .cuid({
        message: "ProductDetailId must be a valid cuid",
      }),
      size: z.nativeEnum(ClothSize,{
        invalid_type_error: "Size must be ClothSize",
      }),
      quantity: z.number({
        invalid_type_error: "Quantity must be a number",
      }),
  });
