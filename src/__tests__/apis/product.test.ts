import { AppRouter, appRouter } from "@/server/trpc/router/_app";
import { masterPrisma } from "../../server/db/client";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { mockDeep } from "jest-mock-extended";
import { Prisma, PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

afterEach(() => {
  jest.resetAllMocks();
});

test("product test", async () => {
  const prismaMock = mockDeep<PrismaClient>();
  const mockOutput: Omit<inferRouterOutputs<AppRouter>["product"]["getOneWhere"], "productDetail"> =
    {
      code: "1",
      name: "test",
      description: "test",
      indexed: true,
      buyPrice: new Prisma.Decimal(1),
      onSale: true,
      stopSellingFrom: null,
      line: {
        gender: "F",
        htmlDescription: "test",
        textDescription: "test",
        type: "test",
      },
      productLine: "test",
    };
  prismaMock.product.findUnique.mockResolvedValue(mockOutput);

  const caller = appRouter.createCaller({
    session: null,
    prisma: prismaMock,
    slavePrisma: prismaMock,
  });

  const result = await caller.product.getOneWhere({
    code: "clhdmwo2b0014xnb0h1efayfs",
  });
  expect(result).toStrictEqual(mockOutput);
});
