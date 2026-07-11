import type { PrismaConfig } from "prisma";
import "@dotenvx/dotenvx/config";

export default {
  schema: "./prisma/schema/",
  migrations: {
    path: "./prisma/migrations",
  },
} satisfies PrismaConfig;
