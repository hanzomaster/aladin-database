import { createClient } from "redis";
import { env } from "../env/server.mjs";

const redisUrl = env.REDIS_URL;
const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  redisClient.connect();
};

export const disconnectRedis = async () => {
  await new Promise<void>((resolve) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    redisClient.quit(() => {
      resolve();
    });
  });
  // redis.quit() creates a thread to close the connection.
  // We wait until all threads have been run once to ensure the connection closes.
  await new Promise((resolve) => setImmediate(resolve));
};

connectRedis();

redisClient.on("error", (err) => console.log(err));

export default redisClient;
