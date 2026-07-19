// apps/web/utils/prisma.ts
import { PrismaClient } from '@prisma/client'

// This prevents Next.js hot-reloading from creating too many database connections
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma