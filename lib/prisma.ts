import { PrismaClient } from "./generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn", "info"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;
