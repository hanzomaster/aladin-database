import { Gender } from "@prisma/client";
import { z } from "zod";

export const getOneProductLineSchema = z.object({
  id: z.string().cuid(),
  type_gender: z
    .object({
      type: z.string().max(50),
      gender: z.nativeEnum(Gender),
    })
    .optional(),
});

export const getManyProductLineSchema = z
  .object({
    type: z.string().max(50),
    gender: z.nativeEnum(Gender),
    textDescription: z.string(),
    htmlDescription: z.string(),
  })
  .partial();

export const createProductLineSchema = z.object({
  type: z.string().max(50),
  gender: z.nativeEnum(Gender),
  textDescription: z.string().optional(),
  htmlDescription: z.string().optional(),
});
