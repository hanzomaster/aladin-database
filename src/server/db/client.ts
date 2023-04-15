// src/server/db/client.ts
import { PrismaClient } from "@prisma/client";
import { env } from "../../env/server.mjs";

declare global {
  // eslint-disable-next-line no-var
  var masterPrisma: PrismaClient | undefined;
  // eslint-disable-next-line no-var
  var slavePrisma: PrismaClient | undefined;
}

export const masterPrisma =
  global.masterPrisma ||
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  });
export const slavePrisma =
  global.slavePrisma ||
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    datasources: {
      db: {
        url: env.SLAVE_DATABASE_URl,
      },
    },
  });

if (env.NODE_ENV !== "production") {
  global.masterPrisma = masterPrisma;
  global.slavePrisma = slavePrisma;
}
