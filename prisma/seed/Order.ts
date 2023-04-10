import { Prisma, PrismaClient } from "@prisma/client";

const entries: Prisma.OrderCreateInput[] = [];
export default async function createOrders(prisma: PrismaClient) {
  console.log(`\tCreating orders`);
  let succeed = 0;
  for (const data of entries) {
    await prisma.order.upsert({
      where: {
        orderNumber: data.orderNumber,
      },
      create: data,
      update: {},
    });
    succeed++;
  }
  console.log(`\tCreated ${succeed} orders out of ${entries.length}`);
}
