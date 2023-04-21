import MeiliSearch from "meilisearch";
import { env } from "../env/server.mjs";

const meilisearchClient = new MeiliSearch({
  host: env.MEILISEARCH_HOST,
  apiKey: env.MEILISEARCH_KEY,
});

const connectMeilisearch = async () => {
  const index = await meilisearchClient.index("products");
  if (index) {
    console.log("Meilisearch client connected...");
  } else {
    meilisearchClient.createIndex("products");
    console.log("? Meilisearch client created...");
  }
};

connectMeilisearch();

export default meilisearchClient;
