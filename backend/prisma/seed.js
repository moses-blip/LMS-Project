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

    // Create Students
    const naomi = await prisma.user.create({
      data: {
        firstName: 'Naomi',
        lastName: 'Wamalwa',
        email: 'naomi@example.com',
        role: 'STUDENT',
        password: hashedUserPassword,
      },
    });

    const john = await prisma.user.create({
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'STUDENT',
        password: hashedUserPassword,
      },
    });

    // Create Courses
    const programmingCourse = await prisma.course.create({
      data: {
        name: 'Intro to Programming',
        description: 'Learn the basics of programming.',
        lecturerId: kanao.id,
      },
    });

    const webDevCourse = await prisma.course.create({
      data: {
        name: 'Web Development',
        description: 'Learn modern web development.',
        lecturerId: kanao.id,
      },
    });

    // Create Enrollments
    await prisma.enrollment.create({
      data: {
        studentId: naomi.id,
        courseId: programmingCourse.id,
        status: 'ACTIVE',
        progress: 75.0,
      },
    });

    await prisma.enrollment.create({
      data: {
        studentId: john.id,
        courseId: programmingCourse.id,
        status: 'ACTIVE',
        progress: 60.0,
      },
    });

    // Create Assignments
    const assignment1 = await prisma.assignment.create({
      data: {
        title: 'Programming Basics Quiz',
        description: 'Test your knowledge of programming fundamentals',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        courseId: programmingCourse.id,
        lecturerId: kanao.id,
      },
    });

    // Create Submissions
    await prisma.submission.create({
      data: {
        content: 'My submission for programming basics',
        status: 'SUBMITTED',
        grade: 85.0,
        studentId: naomi.id,
        assignmentId: assignment1.id,
      },
    });

    // Create Activity Logs
    await prisma.activityLog.create({
      data: {
        userId: naomi.id,
        courseId: programmingCourse.id,
        action: 'Submitted assignment: Programming Basics Quiz',
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: john.id,
        courseId: programmingCourse.id,
        action: 'Started course: Intro to Programming',
      },
    });

    console.log('🌱 Seeding complete: Created users, courses, enrollments, assignments, and activity logs');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 