import { Prisma, PrismaClient } from "@prisma/client";

const entries: Prisma.UserCreateInput[] = [
  {
    name: "Vinnie Lawton",
    email: "vlawton0@linkedin.com",
    image: "http://dummyimage.com/205x173.png/cc0000/ffffff",
    phone: "7849106222",
    address: {
      create: [
        {
          receiver: "Reinold Roose",
          phone: "6032366501",
          city: "Aghavnatun",
          detail: "1720 Superior Terrace",
          district: "viverra",
          ward: "pede venenatis",
        },
      ],
    },
    comment: {
      create: [],
    },
  },
  {
    name: "Leila Bovey",
    email: "lbovey1@disqus.com",
    image: "http://dummyimage.com/131x166.png/dddddd/000000",
    address: {
      create: [
        {
          receiver: "Madelene Baldree",
          phone: "3415312605",
          city: "Villa Nueva",
          detail: "53 Butternut Place",
          district: "vestibulum",
          ward: "pharetra magna",
        },
      ],
    },
    comment: {
      create: [
        {
          rating: 1,
          content: "interdum mauris non ligula pellentesque ultrices phasellus id sapien in sapien",
          product: {
            connect: {
              name: "Hoodie 1",
            },
          },
        },
        {
          rating: 4,
          content: "integer a nibh in quis justo maecenas",
          product: {
            connect: {
              name: "Shirt 4",
            },
          },
        },
      ],
    },
  },
  {
    name: "Mirna Clementel",
    email: "mclementel2@bloomberg.com",
    address: {
      create: [
        {
          receiver: "Georgi Allett",
          phone: "8129478350",
          city: "Tembol",
          detail: "10156 Mockingbird Junction",
          district: "turpis",
          ward: "cras",
        },
        {
          receiver: "Ileana Nassy",
          phone: "2226316029",
          city: "Chastyye",
          detail: "53 Clyde Gallagher Center",
          district: "etiam pretium",
          ward: "nulla suscipit",
        },
      ],
    },
    comment: {
      create: [
        {
          rating: 5,
          content: "dui vel sem sed sagittis",
          product: {
            connect: {
              name: "Hoodie 1",
            },
          },
        },
        {
          rating: 3,
          content: "vestibulum eget vulputate ut ultrices vel augue vestibulum ante ipsum",
          product: {
            connect: {
              name: "Shirt 4",
            },
          },
        },
        {
          rating: 4,
          content:
            "pede malesuada in imperdiet et commodo vulputate justo in blandit ultrices enim lorem ipsum dolor",
          product: {
            connect: {
              name: "Polo 3",
            },
          },
        },
      ],
    },
  },
  {
    name: "Suzie Girodin",
    email: "sgirodin3@paginegialle.it",
    image: "http://dummyimage.com/178x117.png/dddddd/000000",
    phone: "6128584581",
    address: {
      create: [],
    },
    comment: {
      create: [
        {
          rating: 1,
          content: "praesent id massa id nisl venenatis",
          product: {
            connect: {
              name: "Hoodie 1",
            },
          },
        },
        {
          rating: 5,
          content:
            "sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus",
          product: {
            connect: {
              name: "Shirt 4",
            },
          },
        },
      ],
    },
  },
  {
    name: "Sophey Leyfield",
    email: "sleyfield4@ucla.edu",
    phone: "2907329801",
    address: {
      create: [
        {
          receiver: "Torrance Wooland",
          phone: "8738772327",
          city: "Krajan",
          detail: "3485 Doe Crossing Avenue",
          district: "pellentesque",
          ward: "posuere felis",
        },
      ],
    },
    comment: {
      create: [
        {
          rating: 5,
          content: "sociis natoque",
          product: {
            connect: {
              name: "Hoodie 1",
            },
          },
        },
        {
          rating: 5,
          content: "risus dapibus",
          product: {
            connect: {
              name: "Shirt 4",
            },
          },
        },
      ],
    },
  },
  {
    name: "Nomi Gelder",
    email: "ngelder5@timesonline.co.uk",
    phone: "7973910883",
    address: {
      create: [
        {
          receiver: "Maryl Ducker",
          phone: "4444952245",
          city: "Vrbas",
          detail: "3 Manley Avenue",
          district: "cras pellentesque",
          ward: "magna vulputate",
        },
        {
          receiver: "Hesther Raftery",
          phone: "6566204315",
          city: "Höllviken",
          detail: "74383 Hollow Ridge Alley",
          district: "sit",
          ward: "platea dictumst",
        },
        {
          receiver: "Armstrong Ellaway",
          phone: "5936873447",
          city: "Mandalt",
          detail: "008 Green Ridge Pass",
          district: "enim",
          ward: "pede",
        },
      ],
    },
    comment: {
      create: [
        {
          rating: 3,
          content: "ipsum praesent blandit lacinia erat",
          product: {
            connect: {
              name: "Hoodie 1",
            },
          },
        },
        {
          rating: 2,
          content: "nisl venenatis lacinia aenean sit amet justo",
          product: {
            connect: {
              name: "Shirt 4",
            },
          },
        },
        {
          rating: 1,
          content: "hac habitasse platea dictumst",
          product: {
            connect: {
              name: "Polo 3",
            },
          },
        },
        {
          rating: 2,
          content:
            "ipsum dolor sit amet consectetuer adipiscing elit proin interdum mauris non ligula",
          product: {
            connect: {
              name: "Jeans 4",
            },
          },
        },
      ],
    },
  },
  {
    name: "Fidel Halladey",
    email: "fhalladey6@columbia.edu",
    image: "http://dummyimage.com/168x168.png/ff4444/ffffff",
    address: {
      create: [
        {
          receiver: "Englebert Erdis",
          phone: "9611070487",
          city: "Levski",
          detail: "26 Green Ridge Center",
          district: "elit",
          ward: "quam nec",
        },
        {
          receiver: "Lucina Meharry",
          phone: "6113543604",
          city: "Świnice Warckie",
          detail: "9918 Dayton Circle",
          district: "magnis dis",
          ward: "nulla",
        },
      ],
    },
    comment: {
      create: [
        {
          rating: 5,
          content: "ac tellus semper",
          product: {
            connect: {
              name: "Hoodie 1",
            },
          },
        },
        {
          rating: 4,
          content:
            "metus sapien ut nunc vestibulum ante ipsum primis in faucibus orci luctus et ultrices",
          product: {
            connect: {
              name: "Shirt 4",
            },
          },
        },
        {
          rating: 1,
          content: "amet consectetuer adipiscing elit proin risus praesent lectus vestibulum",
          product: {
            connect: {
              name: "Polo 3",
            },
          },
        },
      ],
    },
  },
  {
    name: "Ricard Steabler",
    email: "rsteabler7@house.gov",
    address: {
      create: [],
    },
    comment: {
      create: [
        {
          rating: 2,
          content: "eget tincidunt eget tempus",
          product: {
            connect: {
              name: "Hoodie 1",
            },
          },
        },
        {
          rating: 5,
          content: "aliquam non mauris morbi",
          product: {
            connect: {
              name: "Shirt 4",
            },
          },
        },
        {
          rating: 4,
          content: "ultrices aliquet maecenas leo odio condimentum id",
          product: {
            connect: {
              name: "Polo 3",
            },
          },
        },
        {
          rating: 2,
          content: "quis libero nullam",
          product: {
            connect: {
              name: "Jeans 4",
            },
          },
        },
      ],
    },
  },
  {
    name: "Kaylyn Domnin",
    email: "kdomnin8@census.gov",
    phone: "9571462688",
    address: {
      create: [
        {
          receiver: "Tomkin Colquitt",
          phone: "4049625220",
          city: "Pushchino",
          detail: "3741 Manley Place",
          district: "eu",
          ward: "aliquam convallis",
        },
        {
          receiver: "Symon Cordner",
          phone: "7197680692",
          city: "Ruoqiang",
          detail: "8 Summer Ridge Drive",
          district: "lacus",
          ward: "sapien sapien",
        },
      ],
    },
    comment: {
      create: [
        {
          rating: 2,
          content: "amet eros suspendisse accumsan tortor quis turpis sed ante vivamus tortor duis",
          product: {
            connect: {
              name: "Hoodie 1",
            },
          },
        },
        {
          rating: 4,
          content: "quam pede lobortis",
          product: {
            connect: {
              name: "Shirt 4",
            },
          },
        },
      ],
    },
  },
  {
    name: "Quent Targetter",
    email: "qtargetter9@ocn.ne.jp",
    phone: "7828921668",
    address: {
      create: [],
    },
    comment: {
      create: [
        {
          rating: 4,
          content: "consequat metus sapien ut nunc vestibulum ante",
          product: {
            connect: {
              name: "Hoodie 1",
            },
          },
        },
        {
          rating: 5,
          content:
            "justo pellentesque viverra pede ac diam cras pellentesque volutpat dui maecenas tristique est",
          product: {
            connect: {
              name: "Shirt 4",
            },
          },
        },
        {
          rating: 3,
          content: "lorem ipsum dolor sit amet consectetuer adipiscing elit",
          product: {
            connect: {
              name: "Polo 3",
            },
          },
        },
        {
          rating: 2,
          content: "quam suspendisse potenti nullam porttitor lacus",
          product: {
            connect: {
              name: "Jeans 4",
            },
          },
        },
      ],
    },
  },
];

export default async function createUsers(prisma: PrismaClient) {
  console.log(`\tCreating users`);
  let succeed = 0;
  for (const data of entries) {
    await prisma.user.create({
      data: data,
    });
    succeed++;
  }
  console.log(`\tCreated ${succeed} users out of ${entries.length}`);
}
