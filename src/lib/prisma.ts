import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prismaClientOptions = {
  ...(process.env.NODE_ENV !== 'production' && {
    log: ['query', 'error', 'warn'],
  }),
};

let prismaInstance: PrismaClient | null = null;

try {
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions);
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prismaInstance;
  }
} catch (error) {
  console.error('Failed to initialize Prisma Client:', error);
  prismaInstance = new PrismaClient(prismaClientOptions);
}

export const prisma = prismaInstance;
