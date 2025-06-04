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
        completionPercentage: 100.0,
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
        progress: { topics: ['Intro', 'Syntax'] },
        timeSpent: { hours: 5 },
        completionPercentage: 85.0,
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
        progress: { topicsCompleted: 3 },
        timeSpent: { hours: 10 },
        completionPercentage: 75.0,
      },
    });

    // Create Course
    const course = await prisma.course.create({
      data: {
        name: 'Intro to Programming',
        description: 'Learn the basics of programming.',
        lecturerId: kanao.id,
      },
    });

    // Enroll Student
    await prisma.enrollment.create({
      data: {
        userId: naomi.id,
        courseId: course.id,
        status: 'ACTIVE',
      },
    });

    // Create Assignment
    const assignment = await prisma.assignment.create({
      data: {
        title: 'Variables and Data Types',
        description: 'Basic concepts in programming.',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Due in 7 days
        maxScore: 100,
        courseId: course.id,
      },
    });

    // Create Submission
    await prisma.submission.create({
      data: {
        userId: naomi.id,
        assignmentId: assignment.id,
        status: 'SUBMITTED',
        score: 88,
        feedback: 'Well done!',
      },
    });

    // Create Activity Log
    await prisma.activitylog.create({
      data: {
        studentId: naomi.id,
        courseId: course.id,
        action: 'Submitted the first assignment',
      },
    });

    console.log('🌱 Seeding complete: Admin, Lecturer, Student, Course, Enrollment, Assignment, Submission, ActivityLog created.');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
