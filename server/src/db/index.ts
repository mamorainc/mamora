import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined; // Prevents re-initialization in development
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma; // In development, re-use the global instance
}

export default prisma;
