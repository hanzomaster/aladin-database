import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => ({
      greeting: `This is ${input?.text ?? "me"}`,
    })),
});
