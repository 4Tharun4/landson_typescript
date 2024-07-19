import { PrismaClient } from '@prisma/client'

declare global {
  // This allows the `globalThis.prisma` to have a type of `PrismaClient | undefined`
  var prisma: PrismaClient | undefined;
}

const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}

export default db;
