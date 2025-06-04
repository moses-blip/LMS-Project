import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global;

if (!globalForPrisma.prisma) {
  globalForPrisma.prisma = new PrismaClient({
    log: ['query', 'error', 'warn'],
  });
}

const prisma = globalForPrisma.prisma;

if (!prisma) {
  throw new Error('Failed to initialize Prisma client');
}

// Ensure proper cleanup on application shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma; 