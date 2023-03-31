import { z } from "zod";

export const cartParams = z.object({
  id: z
    .string({
      required_error: "id is required",
      invalid_type_error: "id must be a string",
    })
    .cuid({
      message: "id must be a cuid",
    }),
});
