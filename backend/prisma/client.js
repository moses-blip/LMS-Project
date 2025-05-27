import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  errorFormat: 'pretty',
});

// Log any errors during initialization
prisma.$connect()
  .then(() => console.log('Successfully connected to the database'))
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });

export default prisma; 