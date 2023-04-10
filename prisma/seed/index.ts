import { PrismaClient } from "@prisma/client";
import createOrders from "./Order";
import createProducts from "./Product";
import createProductLines from "./ProductLine";
import createUsers from "./User";
const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding ...");
  createProductLines(prisma).then(() => {
    console.log("Product lines created");
    createProducts(prisma).then(() => {
      console.log("Products created");
      createUsers(prisma).then(() => {
        console.log("Users created");
        createOrders(prisma).then(() => {
          console.log("Orders created");
        });
      });
    });
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
