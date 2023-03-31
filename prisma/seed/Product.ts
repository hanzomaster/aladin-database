import { Gender, Prisma, PrismaClient } from "@prisma/client";

const entries: Prisma.ProductCreateInput[] = [
  // 5 male hoodies
  {
    name: "Hoodie 1",
    description: "Hoodie 1 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Hoodie",
            gender: Gender.M,
          },
        },
        create: {
          type: "Hoodie",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 520,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/0a5cab77-e6c2-4a86-ba36-b6c776d07b7e/hoodie_1.jpg",
        colorCode: "b3c8da",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Hoodie 2",
    description: "Hoodie 2 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Hoodie",
            gender: Gender.M,
          },
        },
        create: {
          type: "Hoodie",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 610,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/dc29382d-082f-418d-94e8-06a9e8e21146/hoodie_2.jpg",
        colorCode: "1e1b1f",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 106,
              },
              {
                size: "L",
                quantity: 210,
              },
              {
                size: "XL",
                quantity: 110,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Hoodie 3",
    description: "Hoodie 3 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Hoodie",
            gender: Gender.M,
          },
        },
        create: {
          type: "Hoodie",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 430,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/0e95d668-276a-49c4-a5b0-d8281e64543b/hoodie_3.jpg",
        colorCode: "f0dfd5",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 80,
              },
              {
                size: "M",
                quantity: 60,
              },
              {
                size: "L",
                quantity: 30,
              },
              {
                size: "XL",
                quantity: 50,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Hoodie 4",
    description: "Hoodie 4 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Hoodie",
            gender: Gender.M,
          },
        },
        create: {
          type: "Hoodie",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/ad51d5a5-4cf5-4deb-bf2c-28e0b980ee66/hoodie_4.jpg",
        colorCode: "d3d6d2",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 90,
              },
              {
                size: "M",
                quantity: 89,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 70,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Hoodie 5",
    description: "Hoodie 5 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Hoodie",
            gender: Gender.M,
          },
        },
        create: {
          type: "Hoodie",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 560,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/efdc0036-b5e2-4a7a-bda3-24756f2b7bbc/hoodie_5.jpg",
        colorCode: "e1d8d7",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 95,
              },
              {
                size: "M",
                quantity: 100,
              },
              {
                size: "L",
                quantity: 80,
              },
              {
                size: "XL",
                quantity: 70,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // 5 male Shirts
  {
    name: "Shirt 1",
    description: "Shirt 1 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shirt",
            gender: Gender.M,
          },
        },
        create: {
          type: "Shirt",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/e8c29f13-e903-4691-a6de-4f2b8b80fc73/shirt_1.jpg",
        colorCode: "1d2f48",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 95,
              },
              {
                size: "M",
                quantity: 90,
              },
              {
                size: "L",
                quantity: 50,
              },
              {
                size: "XL",
                quantity: 60,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shirt 2",
    description: "Shirt 2 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shirt",
            gender: Gender.M,
          },
        },
        create: {
          type: "Shirt",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 350,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/ea82b5c9-ed8b-4036-b171-9092ca4c31e2/shirt_2.jpg",
        colorCode: "5f5d69",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 100,
              },
              {
                size: "L",
                quantity: 80,
              },
              {
                size: "XL",
                quantity: 70,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shirt 3",
    description: "Shirt 3 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shirt",
            gender: Gender.M,
          },
        },
        create: {
          type: "Shirt",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 300,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/3d04b0d7-6cab-445e-8987-696de406393e/shirt_3.jpg",
        colorCode: "b5b5b9",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 90,
              },
              {
                size: "M",
                quantity: 95,
              },
              {
                size: "L",
                quantity: 80,
              },
              {
                size: "XL",
                quantity: 85,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shirt 4",
    description: "Shirt 4 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shirt",
            gender: Gender.M,
          },
        },
        create: {
          type: "Shirt",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 330,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/aee89018-3e65-416e-ac4c-d7289cd9f35b/shirt_4.jpg",
        colorCode: "c0c7d7",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 100,
              },
              {
                size: "L",
                quantity: 80,
              },
              {
                size: "XL",
                quantity: 70,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shirt 5",
    description: "Shirt 5 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shirt",
            gender: Gender.M,
          },
        },
        create: {
          type: "Shirt",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 350,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/b57426f2-3b39-49be-bd1a-72c3a419dc00/shirt_5.jpg",
        colorCode: "7a828f",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 80,
              },
              {
                size: "M",
                quantity: 90,
              },
              {
                size: "L",
                quantity: 80,
              },
              {
                size: "XL",
                quantity: 70,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // male polo
  {
    name: "Polo 1",
    description: "Polo 1 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Polo",
            gender: Gender.M,
          },
        },
        create: {
          type: "Polo",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/de6a97c1-3938-487d-90ae-5dd3bfc3c5ab/polo_1.jpg",
        colorCode: "b5ad9b",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 100,
              },
              {
                size: "L",
                quantity: 110,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Polo 2",
    description: "Polo 2 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Polo",
            gender: Gender.M,
          },
        },
        create: {
          type: "Polo",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/f002bb91-cda1-41b9-bb94-339fa6cfd049/polo_2.jpg",
        colorCode: "ece9ec",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 100,
              },
              {
                size: "L",
                quantity: 110,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Polo 3",
    description: "Polo 3 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Polo",
            gender: Gender.M,
          },
        },
        create: {
          type: "Polo",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/7bd63954-694f-4fbf-b2e0-33335639bd35/polo_3.jpg",
        colorCode: "d98e3a",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 100,
              },
              {
                size: "L",
                quantity: 110,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Polo 4",
    description: "Polo 4 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Polo",
            gender: Gender.M,
          },
        },
        create: {
          type: "Polo",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/4f952422-ee60-4231-9418-fa677976a264/polo_4.jpg",
        colorCode: "6aa1aa",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 100,
              },
              {
                size: "L",
                quantity: 110,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Polo 5",
    description: "Polo 5 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Polo",
            gender: Gender.M,
          },
        },
        create: {
          type: "Polo",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/f1fd360f-07a8-4c66-8ca6-afe7836d4630/polo_5.jpg",
        colorCode: "1b1a1f",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 100,
              },
              {
                size: "L",
                quantity: 110,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // male jeans
  {
    name: "Jeans 1",
    description: "Jeans 1 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Jeans",
            gender: Gender.M,
          },
        },
        create: {
          type: "Jeans",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 520,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/8be0aaa2-8468-4a83-927f-1b9dd6a00d18/jeans_1.jpg",
        colorCode: "465b6c",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 110,
              },
              {
                size: "XL",
                quantity: 100,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Jeans 2",
    description: "Jeans 2 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Jeans",
            gender: Gender.M,
          },
        },
        create: {
          type: "Jeans",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 520,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/d5a2940d-4ab2-436b-8356-3bce93b1af6d/jeans_2.jpg",
        colorCode: "8faabd",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 110,
              },
              {
                size: "XL",
                quantity: 100,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Jeans 3",
    description: "Jeans 3 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Jeans",
            gender: Gender.M,
          },
        },
        create: {
          type: "Jeans",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 520,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/2753dba7-4a11-420c-b71b-b9eb72c94200/jeans_3.jpg",
        colorCode: "162e4b",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 110,
              },
              {
                size: "XL",
                quantity: 100,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Jeans 4",
    description: "Jeans 4 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Jeans",
            gender: Gender.M,
          },
        },
        create: {
          type: "Jeans",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 520,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/55850a4d-1ab7-4a95-a9f3-c09e0eebe4f6/jeans_4.jpg",
        colorCode: "3e3b3f",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 110,
              },
              {
                size: "XL",
                quantity: 100,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Jeans 5",
    description: "Jeans 5 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Jeans",
            gender: Gender.M,
          },
        },
        create: {
          type: "Jeans",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 520,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/87547793-60af-49eb-9258-c2f78d62d7a7/jeans_5.jpg",
        colorCode: "1f3554",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 110,
              },
              {
                size: "XL",
                quantity: 100,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // male pants
  {
    name: "Pants 1",
    description: "Pants 1 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Pants",
            gender: Gender.M,
          },
        },
        create: {
          type: "Pants",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 450,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/e74ccbbe-6318-4810-89b2-cdf4c9f775e8/pants_1.jpg",
        colorCode: "949899",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Pants 2",
    description: "Pants 2 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Pants",
            gender: Gender.M,
          },
        },
        create: {
          type: "Pants",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 450,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/40a084da-c0f5-4f94-8817-bef10b44e31a/pants_2.jpg",
        colorCode: "202126",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Pants 3",
    description: "Pants 3 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Pants",
            gender: Gender.M,
          },
        },
        create: {
          type: "Pants",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 450,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/a584a597-4d62-4590-be14-64ecf9c5049f/pants_3.jpg",
        colorCode: "242b34",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Pants 4",
    description: "Pants 4 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Pants",
            gender: Gender.M,
          },
        },
        create: {
          type: "Pants",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 450,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/8258f32e-cdb1-4e07-8846-66173872a63d/pants_4.jpg",
        colorCode: "323654",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Pants 5",
    description: "Pants 5 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Pants",
            gender: Gender.M,
          },
        },
        create: {
          type: "Pants",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 450,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/36fd4e08-38bb-4b4a-a821-af4535ffab23/pants_5.jpg",
        colorCode: "1b324d",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // male Shorts
  {
    name: "Shorts 1",
    description: "Shorts 1 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shorts",
            gender: Gender.M,
          },
        },
        create: {
          type: "Shorts",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/602a9d4e-c150-44a0-90c6-eb912cf4adc5/shorts_1.jpg",
        colorCode: "0f1115",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shorts 2",
    description: "Shorts 2 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shorts",
            gender: Gender.M,
          },
        },
        create: {
          type: "Shorts",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/5eeea7b8-d124-4c95-a0ce-0d301654e461/shorts_2.jpg",
        colorCode: "d9ddde",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shorts 3",
    description: "Shorts 3 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shorts",
            gender: Gender.M,
          },
        },
        create: {
          type: "Shorts",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/60254b66-73b7-4af1-b6b4-d367ad7b5411/shorts_3.jpg",
        colorCode: "82a2b5",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shorts 4",
    description: "Shorts 4 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shorts",
            gender: Gender.M,
          },
        },
        create: {
          type: "Shorts",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/31029fa9-904a-442e-b55c-0e19324e0471/shorts_4.jpg",
        colorCode: "222126",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shorts 5",
    description: "Shorts 5 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shorts",
            gender: Gender.M,
          },
        },
        create: {
          type: "Shorts",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/83589a5e-2187-4562-abb7-f3b99b299c36/shorts_5.jpg",
        colorCode: "272429",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // male Sweater
  {
    name: "Sweater 1",
    description: "Sweater 1 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Sweater",
            gender: Gender.M,
          },
        },
        create: {
          type: "Sweater",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 480,
    productDetail: {
      // many color here for Sweater 1
      create: [
        {
          // brown
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/5c766128-bbe3-4b76-b5ed-750ae9df1d44/sweater_1_brown.jpg",
          colorCode: "c29c87",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // black
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/05449cd1-b6f9-491b-be39-5dbe04fa4d9e/sweater_1_black.jpg",
          colorCode: "1c1c1e",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // blue
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/c4e8a6d7-cdcc-4ec8-89b1-1038138b826e/sweater_1_blue.jpg",
          colorCode: "2c3d63",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // red
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/fb3c709c-447f-44ea-becb-eca6983e11b6/sweater_1_red.jpg",
          colorCode: "d1361d",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "Sweater 2",
    description: "Sweater 2 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Sweater",
            gender: Gender.M,
          },
        },
        create: {
          type: "Sweater",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 480,
    productDetail: {
      // many color here for Sweater 2
      create: [
        {
          // brown
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/98c0923b-7643-4df0-8576-af02ddd022a5/sweater_2_brown.jpg",
          colorCode: "b7936c",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // blue
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/eb95ea31-9e3b-4fa3-92d6-b2bd68d52144/sweater_2_blue.jpg",
          colorCode: "4982b1",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "Sweater 3",
    description: "Sweater 3 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Sweater",
            gender: Gender.M,
          },
        },
        create: {
          type: "Sweater",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 480,
    productDetail: {
      // many color here for Sweater 3
      create: [
        {
          // brown
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/0ce30be8-7843-4eaa-b72c-787e4e972072/sweater_3_brown.jpg",
          colorCode: "945b3d",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // black
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/a71b72ac-2411-4d08-9954-04960bf5c8da/sweater_3_black.jpg",
          colorCode: "18171c",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // grey
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/2fbe3e92-6a68-49db-9670-a8cc2694d380/sweater_3_grey.jpg",
          colorCode: "9a979c",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "Sweater 4",
    description: "Sweater 4 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Sweater",
            gender: Gender.M,
          },
        },
        create: {
          type: "Sweater",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 480,
    productDetail: {
      // many color here for Sweater 4
      create: [
        {
          // black
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/fb5c824e-1061-420d-b7e1-530db4ba1303/sweater_4_black.jpg",
          colorCode: "18171f",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // white
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/ed764515-da14-4db6-abfd-a1320480b1a7/sweater_4_white.jpg",
          colorCode: "e7dac8",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },

  // male coats
  {
    name: "Coat 1",
    description: "Coat 1 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Coat",
            gender: Gender.M,
          },
        },
        create: {
          type: "Coat",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 670,
    productDetail: {
      // many color here for Coat 1
      create: [
        {
          // green
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/e5974258-e724-45bb-a6e2-5520856cf9ef/coat_1_green.jpg",
          colorCode: "083941",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // black
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/3ff4a6cb-dd90-4088-a9ad-f0b159698999/coat_1_black.jpg",
          colorCode: "434351",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // coffee
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/7242d5ab-b94a-46a6-a269-873530d30551/coat_1_coffee.jpg",
          colorCode: "89635c",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "Coat 2",
    description: "Coat 2 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Coat",
            gender: Gender.M,
          },
        },
        create: {
          type: "Coat",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 670,
    productDetail: {
      // many color here for Coat 2
      create: [
        {
          // black
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/5083fc3a-5125-4e43-82a6-3dc778ce1020/coat_2_black.jpg",
          colorCode: "1e2225",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // white
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/c9125fcf-1164-4baa-9ba9-92d0d96013cf/coat_2_white.jpg",
          colorCode: "dacec2",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "Coat 3",
    description: "Coat 3 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Coat",
            gender: Gender.M,
          },
        },
        create: {
          type: "Coat",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 670,
    productDetail: {
      // many color here for Coat 3
      create: [
        {
          // black
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/feab328d-7dd3-40e8-b534-0fdd588af922/coat_3_black.jpg",
          colorCode: "212025",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // blue
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/7b7e0e16-eee7-41ed-a091-0fe9d49ac3ca/coat_3_blue.jpg",
          colorCode: "3f5e74",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "Coat 4",
    description: "Coat 4 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Coat",
            gender: Gender.M,
          },
        },
        create: {
          type: "Coat",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 670,
    productDetail: {
      // many color here for Coat 4
      create: [
        {
          // black
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/cfb97030-48a3-4ae4-8b16-5963f3d80dd2/coat_4_black.jpg",
          colorCode: "2d2c33",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // blue
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/1eeacc3a-9b4a-4b62-84f2-070cc71843c6/coat_4_blue.jpg",
          colorCode: "213146",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // brown
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/f000a3fc-5011-4b80-991d-82b9b9477369/coat_4_brown.jpg",
          colorCode: "ca9168",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // grey
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/96159920-163a-4e6c-b996-8ec7c27aa982/coat_4_grey.jpg",
          colorCode: "b6b4b4",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },

  // male PJ
  {
    name: "PJ 1",
    description: "PJ 1 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "PJ",
            gender: Gender.M,
          },
        },
        create: {
          type: "PJ",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 550,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/22028d0b-4014-48a5-a6e6-35d8ff1b2a6e/pj_1.jpg",
        colorCode: "181d35",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "PJ 2",
    description: "PJ 2 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "PJ",
            gender: Gender.M,
          },
        },
        create: {
          type: "PJ",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 550,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/05cd113f-f34b-4c75-90b3-afa63a0ab703/pj_2.jpg",
        colorCode: "ccd0d5",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "PJ 3",
    description: "PJ 3 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "PJ",
            gender: Gender.M,
          },
        },
        create: {
          type: "PJ",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 550,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/9c7be63d-4163-4b3d-bce7-5f3157645a7e/pj_3.jpg",
        colorCode: "4b5043",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "PJ 4",
    description: "PJ 4 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "PJ",
            gender: Gender.M,
          },
        },
        create: {
          type: "PJ",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 550,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/1f8c19e4-59ff-4d74-8492-14eaf24e0acf/pj_4.jpg",
        colorCode: "c6d7ea",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "PJ 5",
    description: "PJ 5 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "PJ",
            gender: Gender.M,
          },
        },
        create: {
          type: "PJ",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 550,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/d967af39-065e-40e4-b73c-81fb8a15257c/pj_5.jpg",
        colorCode: "214562",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // male t-shirt
  {
    name: "T-Shirt 1",
    description: "T-Shirt 1 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "T-Shirt",
            gender: Gender.M,
          },
        },
        create: {
          type: "T-Shirt",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/518bb36f-33dd-424f-8df1-cfbd18fcd1c9/t-shirt_1.jpg",
        colorCode: "151718",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "T-Shirt 2",
    description: "T-Shirt 2 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "T-Shirt",
            gender: Gender.M,
          },
        },
        create: {
          type: "T-Shirt",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/04738523-88f0-431d-91f4-266f76462a37/t-shirt_2.jpg",
        colorCode: "14181b",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "T-Shirt 3",
    description: "T-Shirt 3 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "T-Shirt",
            gender: Gender.M,
          },
        },
        create: {
          type: "T-Shirt",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/74716acc-c59d-4316-ada3-97e1836e0e6f/t-shirt_3.jpg",
        colorCode: "1a191e",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "T-Shirt 4",
    description: "T-Shirt 4 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "T-Shirt",
            gender: Gender.M,
          },
        },
        create: {
          type: "T-Shirt",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/a5d25bd0-e509-44e1-827e-00f03313676f/t-shirt_4.jpg",
        colorCode: "181d34",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "T-Shirt 5",
    description: "T-Shirt 5 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "T-Shirt",
            gender: Gender.M,
          },
        },
        create: {
          type: "T-Shirt",
          gender: Gender.M,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/c5f8fdce-6bc8-4cd0-a8a9-ddbdcdd6b503/t-shirt_5.jpg",
        colorCode: "f5f1ea",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // 5 female hoodies
  {
    name: "Hoodie 6",
    description: "Hoodie 6 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Hoodie",
            gender: Gender.F,
          },
        },
        create: {
          type: "Hoodie",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 420,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/59be02d8-e3be-4ec4-9e92-9c523f34747b/hoodie_1.jpg",
        colorCode: "d9d8de",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Hoodie 7",
    description: "Hoodie 7 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Hoodie",
            gender: Gender.F,
          },
        },
        create: {
          type: "Hoodie",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 610,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/682813f7-88f8-44c6-972b-ccedfcd2d489/hoodie_2.jpg",
        colorCode: "d7e3f3",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 106,
              },
              {
                size: "L",
                quantity: 210,
              },
              {
                size: "XL",
                quantity: 110,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Hoodie 8",
    description: "Hoodie 8 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Hoodie",
            gender: Gender.F,
          },
        },
        create: {
          type: "Hoodie",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 430,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/c2750d7d-c76b-402a-a209-e1d07fa6fec5/hoodie_3.jpg",
        colorCode: "1a1a1a",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 80,
              },
              {
                size: "M",
                quantity: 60,
              },
              {
                size: "L",
                quantity: 30,
              },
              {
                size: "XL",
                quantity: 50,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Hoodie 9",
    description: "Hoodie 9 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Hoodie",
            gender: Gender.F,
          },
        },
        create: {
          type: "Hoodie",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/902105d5-d5c2-4610-8dfb-244dbc99e2da/hoodie_4.jpg",
        colorCode: "e2c2c7",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 90,
              },
              {
                size: "M",
                quantity: 89,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 70,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Hoodie 10",
    description: "Hoodie 10 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Hoodie",
            gender: Gender.F,
          },
        },
        create: {
          type: "Hoodie",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 560,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/7fba867f-d467-42a0-9aa5-91f5fdbb5c54/hoodie_5.jpg",
        colorCode: "d2884b",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 95,
              },
              {
                size: "M",
                quantity: 100,
              },
              {
                size: "L",
                quantity: 80,
              },
              {
                size: "XL",
                quantity: 70,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // female shirts
  {
    name: "Shirt 6",
    description: "Shirt 6 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shirt",
            gender: Gender.F,
          },
        },
        create: {
          type: "Shirt",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/4320ea22-6613-422f-9498-989600ac59e9/shirt_1.jpg",
        colorCode: "eedfe8",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shirt 7",
    description: "Shirt 7 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shirt",
            gender: Gender.F,
          },
        },
        create: {
          type: "Shirt",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/1465ef50-80d7-4402-9088-e485fb739392/shirt_2.jpg",
        colorCode: "ebb0c2",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shirt 8",
    description: "Shirt 8 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shirt",
            gender: Gender.F,
          },
        },
        create: {
          type: "Shirt",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/c1e0c4ca-c05a-4eb1-88d9-3c7b4f8b88e7/shirt_3.jpg",
        colorCode: "c28d61",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shirt 9",
    description: "Shirt 9 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shirt",
            gender: Gender.F,
          },
        },
        create: {
          type: "Shirt",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/3ecadc8f-7a53-43f0-ac6b-def5329bf668/shirt_4.jpg",
        colorCode: "131313",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shirt 10",
    description: "Shirt 10 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shirt",
            gender: Gender.F,
          },
        },
        create: {
          type: "Shirt",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/a2cba77c-d46f-4829-9b90-fd0df4e73b0e/shirt_5.jpg",
        colorCode: "d7f5e0",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // female polo
  {
    name: "Polo 6",
    description: "Polo 6 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Polo",
            gender: Gender.F,
          },
        },
        create: {
          type: "Polo",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/a70e793c-6f2b-4e1c-8a2c-e00cf567cb0f/polo_1.jpg",
        colorCode: "f8f8f8",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Polo 7",
    description: "Polo 7 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Polo",
            gender: Gender.F,
          },
        },
        create: {
          type: "Polo",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/372bf6a2-d839-4d08-8d68-1d19317d447e/polo_2.jpg",
        colorCode: "f0e3e1",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Polo 8",
    description: "Polo 8 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Polo",
            gender: Gender.F,
          },
        },
        create: {
          type: "Polo",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/0b610a1f-92d6-462a-a592-0943001dfd88/polo_3.jpg",
        colorCode: "f1f5f9",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Polo 9",
    description: "Polo 9 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Polo",
            gender: Gender.F,
          },
        },
        create: {
          type: "Polo",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/223dd9da-0dd4-49ab-8a9a-8fa9b332e2e7/polo_4.jpg",
        colorCode: "191715",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Polo 10",
    description: "Polo 10 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Polo",
            gender: Gender.F,
          },
        },
        create: {
          type: "Polo",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 320,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/6fe275c5-3095-47f8-be88-654fc11459a8/polo_5.jpg",
        colorCode: "f5f4f9",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  //female jeans
  {
    name: "Jeans 6",
    description: "Jeans 6 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Jeans",
            gender: Gender.F,
          },
        },
        create: {
          type: "Jeans",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 520,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/02db9c3e-e408-4089-bf21-8c7353a9a416/jeans_1.jpg",
        colorCode: "4e5e7f",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Jeans 7",
    description: "Jeans 7 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Jeans",
            gender: Gender.F,
          },
        },
        create: {
          type: "Jeans",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 520,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/43fe6829-9979-4bd7-bf23-d86701d78c44/jeans_2.jpg",
        colorCode: "566e94",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Jeans 8",
    description: "Jeans 8 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Jeans",
            gender: Gender.F,
          },
        },
        create: {
          type: "Jeans",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 520,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/a4409d0d-ca5c-4245-8aff-f0e47806ab05/jeans_3.jpg",
        colorCode: "8c9fbc",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Jeans 9",
    description: "Jeans 9 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Jeans",
            gender: Gender.F,
          },
        },
        create: {
          type: "Jeans",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 520,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/aae34276-2a1f-42c7-8bc1-a317b79fa685/jeans_4.jpg",
        colorCode: "8c9fbc",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Jeans 10",
    description: "Jeans 10 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Jeans",
            gender: Gender.F,
          },
        },
        create: {
          type: "Jeans",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 520,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/727f74b7-bfc7-4565-b86d-f68980c0e27a/jeans_5.jpg",
        colorCode: "8c9fbc",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // female pants
  {
    name: "Pants 6",
    description: "Pants 6 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Pants",
            gender: Gender.F,
          },
        },
        create: {
          type: "Pants",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 470,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/a7d653ba-75c3-4350-be1c-042717a7b4dc/pants_1.jpg",
        colorCode: "efedec",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Pants 7",
    description: "Pants 7 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Pants",
            gender: Gender.F,
          },
        },
        create: {
          type: "Pants",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 470,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/109a59c0-89ad-4a71-a575-17e1dfdd2c59/pants_2.jpg",
        colorCode: "c8cde2",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Pants 8",
    description: "Pants 8 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Pants",
            gender: Gender.F,
          },
        },
        create: {
          type: "Pants",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 470,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/70b6f7af-c7b3-4f3d-8a03-ab75c66e03c9/pants_3.jpg",
        colorCode: "a2a3ae",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Pants 9",
    description: "Pants 9 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Pants",
            gender: Gender.F,
          },
        },
        create: {
          type: "Pants",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 470,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/b3a3b2b7-e75b-4e8e-9265-5cf8aecbd98e/pants_4.jpg",
        colorCode: "1e1f25",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Pants 10",
    description: "Pants 10 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Pants",
            gender: Gender.F,
          },
        },
        create: {
          type: "Pants",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 470,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/a9187c74-3a85-45e0-8291-b1c8e58701cb/pants_5.jpg",
        colorCode: "dfc4a9",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // female shorts
  {
    name: "Shorts 6",
    description: "Shorts 6 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shorts",
            gender: Gender.F,
          },
        },
        create: {
          type: "Shorts",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 330,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/edf3569b-aedc-4270-a4da-4a12d60993ab/shorts_1.jpg",
        colorCode: "272a2e",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shorts 7",
    description: "Shorts 7 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shorts",
            gender: Gender.F,
          },
        },
        create: {
          type: "Shorts",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 330,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/dcac8df0-051f-488b-8cdf-38cee5a908ed/shorts_2.jpg",
        colorCode: "365c99",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shorts 8",
    description: "Shorts 8 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shorts",
            gender: Gender.F,
          },
        },
        create: {
          type: "Shorts",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 330,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/d51d4144-1d78-4129-a8ec-df5d18bf717b/shorts_3.jpg",
        colorCode: "a7a7a5",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shorts 9",
    description: "Shorts 9 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shorts",
            gender: Gender.F,
          },
        },
        create: {
          type: "Shorts",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 330,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/1729e592-ce42-4a07-abe9-b5a5a945b338/shorts_4.jpg",
        colorCode: "accdc9",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "Shorts 10",
    description: "Shorts 10 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Shorts",
            gender: Gender.F,
          },
        },
        create: {
          type: "Shorts",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 330,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/d5aceed0-d516-4c54-832c-2ad8ad5de433/shorts_5.jpg",
        colorCode: "baaedb",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 90,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // female sweater
  {
    name: "Sweater 6",
    description: "Sweater 6 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Sweater",
            gender: Gender.F,
          },
        },
        create: {
          type: "Sweater",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 460,
    productDetail: {
      // many color here for Sweater 6
      create: [
        {
          // pink
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/8402618e-409f-4187-92ff-fdac57832d98/sweater_1_pink.jpg",
          colorCode: "f4ddde",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // black
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/681055b0-e1ae-4835-9659-c18868563422/sweater_1_black.jpg",
          colorCode: "020d1f",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // white
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/7626ee9e-5ac7-4041-b4d3-100a5ec0c6ac/sweater_1_white.jpg",
          colorCode: "e9e3de",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "Sweater 7",
    description: "Sweater 7 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Sweater",
            gender: Gender.F,
          },
        },
        create: {
          type: "Sweater",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 460,
    productDetail: {
      // many color here for Sweater 7
      create: [
        {
          // pink
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/da939076-6450-45a2-bb60-b1318cff1143/sweater_2_pink.jpg",
          colorCode: "f1aeae",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // white
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/f88b0de8-b3fe-45fc-b0cd-7eca033ea2cd/sweater_2_white.jpg",
          colorCode: "edece8",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },

  // female coat
  {
    name: "Coat 6",
    description: "Coat 6 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Coat",
            gender: Gender.F,
          },
        },
        create: {
          type: "Coat",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 600,
    productDetail: {
      // many color here for Coat 6
      create: [
        {
          // purple
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/40aa7e05-8637-4f6c-9a27-a7b7bd41128e/coat_1_purple.jpg",
          colorCode: "bda1c1",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // blue
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/bf166bba-7cd0-41a5-9b8e-f3bc37d8d6d5/coat_1_blue.jpg",
          colorCode: "c0d2dd",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // white
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/00828940-5199-4994-8691-fc131e839c5c/coat_1_white.jpg",
          colorCode: "f7ece6",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "Coat 7",
    description: "Coat 7 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Coat",
            gender: Gender.F,
          },
        },
        create: {
          type: "Coat",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 600,
    productDetail: {
      // many color here for Coat 7
      create: [
        {
          // purple
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/9d5bbcf0-f2dd-4450-ad9c-d58c911741a5/coat_2_purple.jpg",
          colorCode: "a38399",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // grey
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/855e0f53-5763-47ab-a2d7-96e62e7d4073/coat_2_grey.jpg",
          colorCode: "8f96a3",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "Coat 8",
    description: "Coat 8 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Coat",
            gender: Gender.F,
          },
        },
        create: {
          type: "Coat",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 600,
    productDetail: {
      // many color here for Coat 8
      create: [
        {
          // white
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/457309cd-b35a-44b2-976f-610977e963f9/coat_3_white.jpg",
          colorCode: "f2f5f1",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // mint
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/457309cd-b35a-44b2-976f-610977e963f9/coat_3_white.jpg",
          colorCode: "bacccd",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "Coat 9",
    description: "Coat 9 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Coat",
            gender: Gender.F,
          },
        },
        create: {
          type: "Coat",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 600,
    productDetail: {
      // many color here for Coat 9
      create: [
        {
          // white
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/6c190a81-69c2-4150-bace-eb199ea19a94/coat_4_white.jpg",
          colorCode: "edebe7",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // brown
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/204a7975-0687-4741-8c6d-e6619827ab70/coat_4_brown.jpg",
          colorCode: "d89668",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "Coat 10",
    description: "Coat 10 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "Coat",
            gender: Gender.F,
          },
        },
        create: {
          type: "Coat",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 600,
    productDetail: {
      // many color here for Coat 10
      create: [
        {
          // white
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/625fb1a3-adc5-4a6e-9747-59cf8e067e18/coat_5_white.jpg",
          colorCode: "d9d5d2",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // black
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/802918f1-1d00-4526-b5ce-c127c29b7e7a/coat_5_black.jpg",
          colorCode: "2f323a",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },

  // female pj
  {
    name: "PJ 6",
    description: "PJ 6 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "PJ",
            gender: Gender.F,
          },
        },
        create: {
          type: "PJ",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 550,
    productDetail: {
      // many color here for PJ 6
      create: [
        {
          // pink
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/a6cc4664-49e2-4666-b20c-18fc3f39c0a7/pj_1_pink.jpg",
          colorCode: "fcede9",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // black
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/9b0df2d1-e415-48e2-b1a6-ca3d24c124f2/pj_1_black.jpg",
          colorCode: "272942",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "PJ 7",
    description: "PJ 7 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "PJ",
            gender: Gender.F,
          },
        },
        create: {
          type: "PJ",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 510,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/dd03ec0a-f08c-4ecc-8a8f-41342c8935eb/pj_2.jpg",
        colorCode: "f2e2de",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 106,
              },
              {
                size: "L",
                quantity: 210,
              },
              {
                size: "XL",
                quantity: 110,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "PJ 8",
    description: "PJ 8 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "PJ",
            gender: Gender.F,
          },
        },
        create: {
          type: "PJ",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 530,
    productDetail: {
      // many color here for PJ 8
      create: [
        {
          // grey
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/a097a521-0a83-47e1-9fd3-32e39f1f60bb/pj_3_grey.jpg",
          colorCode: "c0c6cb",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // black
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/39082118-6cf8-4659-88af-a70b50ea9fbf/pj_3_black.jpg",
          colorCode: "222339",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
        {
          // pink
          image:
            "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/9a9d107b-b020-419a-896b-f34429531cc8/pj_3_pink.jpg",
          colorCode: "ffdad2",
          productInStock: {
            createMany: {
              data: [
                {
                  size: "S",
                  quantity: 150,
                },
                {
                  size: "M",
                  quantity: 150,
                },
                {
                  size: "L",
                  quantity: 100,
                },
                {
                  size: "XL",
                  quantity: 110,
                },
              ],
              skipDuplicates: true,
            },
          },
        },
      ],
    },
  },
  {
    name: "PJ 9",
    description: "PJ 9 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "PJ",
            gender: Gender.F,
          },
        },
        create: {
          type: "PJ",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 510,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/2da2e01d-c936-46b3-be25-ad94874859c0/pj_4.jpg",
        colorCode: "131b31",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 106,
              },
              {
                size: "L",
                quantity: 210,
              },
              {
                size: "XL",
                quantity: 110,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "PJ 10",
    description: "PJ 10 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "PJ",
            gender: Gender.F,
          },
        },
        create: {
          type: "PJ",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 540,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/2adb6af1-1791-449f-8bcd-227423a053d8/pj_5.jpg",
        colorCode: "f6d1bb",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 100,
              },
              {
                size: "M",
                quantity: 106,
              },
              {
                size: "L",
                quantity: 210,
              },
              {
                size: "XL",
                quantity: 110,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },

  // female t-shirts
  {
    name: "T-Shirt 6",
    description: "T-Shirt 6 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "T-Shirt",
            gender: Gender.F,
          },
        },
        create: {
          type: "T-Shirt",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/20cbc8bf-0107-4eca-b644-435a96bd8df6/t-shirt_1.jpg",
        colorCode: "eaece0",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "T-Shirt 7",
    description: "T-Shirt 7 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "T-Shirt",
            gender: Gender.F,
          },
        },
        create: {
          type: "T-Shirt",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/0c4afc00-1582-4f97-8a07-cfb4e7dedb68/t-shirt_2.jpg",
        colorCode: "f0f5f4",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "T-Shirt 8",
    description: "T-Shirt 8 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "T-Shirt",
            gender: Gender.F,
          },
        },
        create: {
          type: "T-Shirt",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/7f90d189-ec0b-4b17-bdc6-16c1350a9049/t-shirt_3.jpg",
        colorCode: "edc707",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "T-Shirt 9",
    description: "T-Shirt 9 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "T-Shirt",
            gender: Gender.F,
          },
        },
        create: {
          type: "T-Shirt",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/2628f1a2-76a8-470c-80e2-3192b2e385a0/t-shirt_4.jpg",
        colorCode: "d5c5d8",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
  {
    name: "T-Shirt 10",
    description: "T-Shirt 10 description",
    line: {
      connectOrCreate: {
        where: {
          type_gender: {
            type: "T-Shirt",
            gender: Gender.F,
          },
        },
        create: {
          type: "T-Shirt",
          gender: Gender.F,
        },
      },
    },
    buyPrice: 360,
    productDetail: {
      create: {
        image:
          "https://aladin-w22g4.s3.ap-southeast-1.amazonaws.com/next-s3-uploads/0321ed1c-4357-4ea1-bc08-f183b3f45d1e/t-shirt_5.jpg",
        colorCode: "161819",
        productInStock: {
          createMany: {
            data: [
              {
                size: "S",
                quantity: 110,
              },
              {
                size: "M",
                quantity: 120,
              },
              {
                size: "L",
                quantity: 95,
              },
              {
                size: "XL",
                quantity: 90,
              },
            ],
            skipDuplicates: true,
          },
        },
      },
    },
  },
];

export default async function createProducts(prisma: PrismaClient) {
  console.log(`\tCreating products`);
  let succeed = 0;
  for (const data of entries) {
    await prisma.product.upsert({
      where: {
        name: data.name,
      },
      create: data,
      update: {},
    });
    succeed++;
  }
  console.log(`\tCreated ${succeed} products out of ${entries.length}`);
}
