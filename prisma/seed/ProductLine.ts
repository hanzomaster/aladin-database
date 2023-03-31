import { Gender, Prisma, PrismaClient } from "@prisma/client";

const entries: Prisma.ProductLineCreateInput[] = [
  {
    type: "Hoodie",
    gender: Gender.M,
  },
  {
    type: "Shirt",
    gender: Gender.M,
  },
  {
    type: "Polo",
    gender: Gender.M,
  },
  {
    type: "Jeans",
    gender: Gender.M,
  },
  {
    type: "Pants",
    gender: Gender.M,
  },
  {
    type: "Shorts",
    gender: Gender.M,
  },
  {
    type: "Sweater",
    gender: Gender.M,
  },

  {
    type: "PJ",
    gender: Gender.M,
  },
  {
    type: "T-Shirt",
    gender: Gender.M,
  },
  {
    type: "Coat",
    gender: Gender.M,
  },
  {
    type: "Shirt",
    gender: Gender.F,
  },
  {
    type: "Polo",
    gender: Gender.F,
  },
  {
    type: "Shorts",
    gender: Gender.F,
  },
  {
    type: "T-Shirt",
    gender: Gender.F,
  },
  {
    type: "Hoodie",
    gender: Gender.F,
  },
  {
    type: "Coat",
    gender: Gender.F,
  },
  {
    type: "Jeans",
    gender: Gender.F,
  },
  {
    type: "Pants",
    gender: Gender.F,
  },
  {
    type: "Sweater",
    gender: Gender.F,
  },
  {
    type: "PJ",
    gender: Gender.F,
  },
];

export default async function createProductLines(prisma: PrismaClient) {
  console.log(`\tCreating product lines`);
  let succeed = 0;
  for (const data of entries) {
    await prisma.productLine.upsert({
      where: {
        type_gender: {
          type: data.type,
          gender: data.gender,
        },
      },
      create: data,
      update: {},
    });
    succeed++;
  }
  console.log(`\tCreated ${succeed} product lines out of ${entries.length}`);
}
