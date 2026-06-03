import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prismaClientSingleton = () => {
  // 1. Create the Neon driver adapter using your environment variable
  const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
  
  // 2. Pass the adapter instance directly into the Prisma Client constructor
  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : [],
  })
}

// 3. Prevent multiple instances of Prisma Client in development mode
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma