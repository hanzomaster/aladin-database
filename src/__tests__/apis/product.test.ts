import { AppRouter, appRouter } from "@/server/trpc/router/_app";
import { TRPCError, inferRouterOutputs } from "@trpc/server";
import { mockDeep } from "jest-mock-extended";
import { Prisma, PrismaClient } from "@prisma/client";

afterEach(() => {
  jest.resetAllMocks();
});

describe("product test", () => {
  const prismaMock = mockDeep<PrismaClient>();
  it("should return a product or throw new TRPCError if product code not match", async () => {
    // NOTE - Add a mock output for the product.getOneWhere query
    const mockOutput: Omit<
      inferRouterOutputs<AppRouter>["product"]["getOneWhere"],
      "productDetail"
    > = {
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

    // NOTE - Create a caller with a mocked user session and prisma client
    const caller = appRouter.createCaller({
      session: null,
      prisma: prismaMock,
      slavePrisma: prismaMock,
    });

    try {
      const result = await caller.product.getOneWhere({
        code: "clhdmwo2b0014xnb0h1efayfs",
      });
      expect(result).toStrictEqual(mockOutput);
    } catch (e) {
      expect(e).toBeInstanceOf(TRPCError);
    }
  });
});
