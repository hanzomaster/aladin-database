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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    meilisearchClient.createIndex("products");
    console.log("? Meilisearch client created...");
  }
};

connectMeilisearch();

export default meilisearchClient;
