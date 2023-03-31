import { Gender } from "@prisma/client";
import { z } from "zod";

export const getManyProductSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .max(50),
    description: z.string({
      invalid_type_error: "Description must be a string",
    }),
    productLine: z.string({
      invalid_type_error: "Product line must be a string",
    }),
    buyPrice: z.number({
      invalid_type_error: "Buy price must be a number",
    }),
    gender: z.nativeEnum(Gender, {
      invalid_type_error: 'Gender must be "M" or "F"',
    }),
    type: z
      .string({
        invalid_type_error: "Type must be a string",
      })
      .max(50),
    option: z.object({
      skip: z.number().min(0).default(0),
      take: z.number().min(1).max(100).default(20),
    }),
  })
  .partial();

export const createProductSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .max(50),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .optional(),
  buyPrice: z.number({
    required_error: "Buy price is required",
    invalid_type_error: "Buy price must be a number",
  }),
  type: z.string({
    required_error: "Type is required",
    invalid_type_error: "Type must be a string",
  }),
  gender: z.nativeEnum(Gender, {
    required_error: "Gender is required",
    invalid_type_error: 'Gender must be "M" or "F"',
  }),
  productDetail: z
    .object({
      colorCode: z
        .string({
          required_error: "Color code is required",
          invalid_type_error: "Color code must be a hex color code",
        })
        .length(6),
      image: z
        .string({
          required_error: "Image is required",
          invalid_type_error: "Image must be a valid URL",
        })
        .url(),
      numS : z.number(),
      numM : z.number(),
      numL : z.number(),
      numXL : z.number(),
    })
    .array(),
});

export const updateProductSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
      })
      .max(50),
    description: z.string({
      invalid_type_error: "Description must be a string",
    }),
    buyPrice: z.number({
      invalid_type_error: "Buy price must be a number",
    }),
    type: z.string({
      invalid_type_error: "Type must be a string",
    }),
    gender: z.nativeEnum(Gender, {
      invalid_type_error: 'Gender must be "M" or "F"',
    }),
    productDetail: z
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
            invalid_type_error: "Image must be a string",
          })
          .url({
            message: "Image must be a valid URL",
          }),
      })
      .array(),
  })
  .partial();
