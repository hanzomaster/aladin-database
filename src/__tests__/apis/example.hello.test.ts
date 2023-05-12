import { appRouter } from "@/server/trpc/router/_app";
import { masterPrisma } from "../../server/db/client";

test("hello test", async () => {
  const caller = appRouter.createCaller({
    session: null,
    prisma: masterPrisma,
    slavePrisma: masterPrisma,
  });
  const testStr = "a test";
  const result = await caller.example.hello({
    text: testStr,
  });
  expect(result).toStrictEqual({
    greeting: `This is ${testStr}`,
  });
});
