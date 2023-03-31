import { z } from "zod";

export const createProductDetailSchema = z.object({
  productCode: z
    .string({
      required_error: "Product code is required",
      invalid_type_error: "Product code must be a string",
    })
    .cuid({
      message: "Product code must be a valid cuid",
    }),
  colorCode: z
    .string({
      required_error: "Color code is required",
      invalid_type_error: "Color code must be a string",
    })
    .length(6, {
      message: "Color code must be a hex color code",
    }),
  image: z
    .string({
      required_error: "Image is required",
      invalid_type_error: "Image must be a valid URL",
    })
    .url({
      message: "Image must be a valid URL",
    }),
});

export const updateProductDetailSchema = z.object({
  colorCode: z
    .string({
      required_error: "Color code is required",
      invalid_type_error: "Color code must be a string",
    })
    .length(6, {
      message: "Color code must be a hex color code",
    }),
  productCode: z
    .string({
      required_error: "Product code is required",
      invalid_type_error: "Product code must be a string",
    })
    .cuid({
      message: "Product code must be a valid cuid",
    }),
  dto: z
    .object({
      colorCode: z
        .string({
          invalid_type_error: "Color code must be a string",
        })
        .length(6, {
          message: "Color code must be a hex color code",
        }),
      image: z
        .string({
          invalid_type_error: "Image must be a valid URL",
        })
        .url({
          message: "Image must be a valid URL",
        }),
    })
    .partial(),
});

export const deleteProductDetailSchema = z.object({
  id: z
    .string({
      invalid_type_error: "Id must be a string",
    })
    .cuid({
      message: "Id must be a valid cuid",
    })
    .optional(),
  product_color: z
    .object({
      productCode: z
        .string({
          invalid_type_error: "Product code must be a string",
        })
        .cuid({
          message: "Product code must be a valid cuid",
        }),
      colorCode: z
        .string({
          invalid_type_error: "Color code must be a string",
        })
        .length(6, {
          message: "Color code must be a hex color code",
        }),
    })
    .optional(),
});
