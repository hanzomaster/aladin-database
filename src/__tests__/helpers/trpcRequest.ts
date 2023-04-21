import { slavePrisma } from "@/server/db/client";
import { appRouter } from "@/server/trpc/router/_app";
import { Product } from "@prisma/client";
function createTestContext(product?: Product) {
  return {
    session: null,
    prisma: slavePrisma,
    slavePrisma,
    product: product || null,
  };
}

/** A convenience method to call tRPC queries */
export const trpcRequest = (product?: Partial<Product>) => {
  return appRouter.createCaller(createTestContext(product as Product));
};
