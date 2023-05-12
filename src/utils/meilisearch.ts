import MeiliSearch from "meilisearch";
import { env } from "../env/server.mjs";

const meilisearchClient = new MeiliSearch({
  host: env.MEILISEARCH_HOST,
  apiKey: env.MEILISEARCH_KEY,
});

const connectMeilisearch = () => {
  const index = meilisearchClient.index("products");
  if (!index) {
    meilisearchClient.createIndex("products");
  }
};

connectMeilisearch();

export default meilisearchClient;
