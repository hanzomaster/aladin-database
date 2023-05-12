import { AppRouter, appRouter } from "@/server/trpc/router/_app";
import { Cart, PrismaClient } from "@prisma/client";
import { TRPCError, inferRouterOutputs } from "@trpc/server";
import { mockDeep } from "jest-mock-extended";
import { Session } from "next-auth";

afterEach(() => {
  jest.resetAllMocks();
});

describe("order test", () => {
  const prismaMock = mockDeep<PrismaClient>();
  it("should throw error if user not signed in", async () => {
    const caller = appRouter.createCaller({
      session: null, // NOTE - user is not signed in here
      prisma: prismaMock,
      slavePrisma: prismaMock,
    });
    try {
      await caller.order.create({});
    } catch (e) {
      expect(e).toBeInstanceOf(TRPCError);
      expect((e as TRPCError).code).toBe("UNAUTHORIZED");
    }
  });
  it("should throw error if cart is empty", async () => {
    // NOTE - mock a session as if user is signed in
    const mockSession: Session = {
      user: {
        id: "test-user-id",
        email: "testing@test.com",
        name: "test",
      },
      expires: new Date().toISOString(),
    };
    prismaMock.cart.findUnique.mockResolvedValue(null);
    const caller = appRouter.createCaller({
      session: mockSession,
      prisma: prismaMock,
      slavePrisma: prismaMock,
    });

    try {
      await caller.order.create({});
    } catch (e) {
      expect(e).toBeInstanceOf(TRPCError);
      expect((e as TRPCError).code).toBe("NOT_FOUND");
    }
  });
});
