import { createClient } from "redis";
import { env } from "../env/server.mjs";

const redisUrl = env.REDIS_URL;
const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log("? Redis client connected...");
  } catch (err) {
    if (err instanceof Error) {
      console.error("Redis client error: ", err.message);
    }
  }
};

connectRedis();

redisClient.on("error", (err) => console.log(err));

export default redisClient;
