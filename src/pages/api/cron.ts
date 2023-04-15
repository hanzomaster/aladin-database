import { masterPrisma } from "@db/client";
import meilisearchClient from "../../utils/meilisearch";
import { NextApiRequest, NextApiResponse } from "next";

export default async function indexProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    await meilisearchClient.getIndex("products");
  } catch (err) {
    await meilisearchClient.createIndex("products");
  }
  const productIndex = meilisearchClient.index("products");
  // remove index from products that not on sale
  const removeIndex = await masterPrisma.product.findMany({
    where: {
      onSale: false,
      indexed: true,
    },
    select: {
      code: true,
    },
  });
  let ids = removeIndex.map((product) => product.code);
  productIndex.deleteDocuments(ids);
  masterPrisma.product.updateMany({
    where: {
      code: {
        in: ids,
      },
    },
    data: {
      indexed: false,
    },
  });
  // add index to products that on sale and not indexed
  const unIndexedProducts = await masterPrisma.product.findMany({
    where: {
      onSale: true,
      indexed: false,
    },
    select: {
      code: true,
      name: true,
    },
    take: 1000,
  });
  productIndex.addDocuments(unIndexedProducts, {
    primaryKey: "code",
  });
  // update indexed to true for unIndexedProducts
  ids = unIndexedProducts.map((product) => product.code);
  masterPrisma.product.updateMany({
    where: {
      code: {
        in: ids,
      },
    },
    data: {
      indexed: true,
    },
  });
  const result = await productIndex.getDocuments();
  res.json(result.results);
}
