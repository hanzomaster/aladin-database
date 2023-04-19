import MeiliSearch from "meilisearch";
import { env } from "../env/server.mjs";

const meilisearchClient = new MeiliSearch({
  host: env.MEILISEARCH_HOST,
  apiKey: env.MEILISEARCH_KEY,
});

const connectMeilisearch = async () => {
  try {
    await meilisearchClient.getIndex("products");
    console.log("? Meilisearch client connected...");
  } catch (err) {
    meilisearchClient.createIndex("products");
    console.log("? Meilisearch client created...");
  }
};

connectMeilisearch();

export default meilisearchClient;
