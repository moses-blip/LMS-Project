import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash('admin123', 10);

    // Create the admin user
    const admin = await prisma.User.create({
      data: {
        firstName: 'Super',
        lastName: 'Admin',
        email: 'superadmin@lms.com',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('Admin user created successfully:', admin);
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin(); 