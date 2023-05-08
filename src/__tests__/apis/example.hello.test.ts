import { AppRouter, appRouter } from "@/server/trpc/router/_app";
import { masterPrisma } from "../../server/db/client";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

test("hello test", async () => {
  const caller = appRouter.createCaller({
    session: null,
    prisma: masterPrisma,
    slavePrisma: masterPrisma,
  });
  const result = await caller.example.hello({
    text: "testing",
  });
  expect(result).toStrictEqual({
    greeting: "This is testing",
  });
});
