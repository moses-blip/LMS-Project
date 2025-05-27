import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  try {
    // Hash passwords
    const hashedPassword = await bcrypt.hash('adminpassword', 10);
    const hashedUserPassword = await bcrypt.hash('securepassword', 10);

    // Create Admin
    const admin = await prisma.user.create({
      data: {
        firstName: 'System',
        lastName: 'Admin',
        email: 'admin@example.com',
        role: 'ADMIN',
        password: hashedPassword,
      },
    });

    // Create Lecturer
    const kanao = await prisma.user.create({
      data: {
        firstName: 'Kanao',
        lastName: 'Phiki',
        email: 'kanao@example.com',
        role: 'LECTURER',
        password: hashedUserPassword,
      },
    });

    // Create Student
    const naomi = await prisma.user.create({
      data: {
        firstName: 'Naomi',
        lastName: 'Wamalwa',
        email: 'naomi@example.com',
        role: 'STUDENT',
        password: hashedUserPassword,
      },
    });

    // Create Course
    await prisma.course.create({
      data: {
        name: 'Intro to Programming',
        description: 'Learn the basics of programming.',
        lecturerId: kanao.id,
      },
    });

    console.log('🌱 Seeding complete: Admin, Lecturer, Student, and Course created.');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
