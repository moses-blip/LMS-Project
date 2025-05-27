import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Helper function to format time ago
function timeAgo(date) {
  const diff = Date.now() - new Date(date);
  const hours = Math.floor(diff / 1000 / 60 / 60);
  if (hours < 1) return 'less than an hour ago';
  if (hours < 24) return `${hours} hrs ago`;
  const days = Math.floor(hours / 24);
  return `${days} day(s) ago`;
}

// Stub for most skipped module calculation - replace with your real logic
async function findMostSkippedModule(courseId) {
  // TODO: Implement logic to find the most skipped module based on logs or progress
  return 'Module 3: Example';
}

export async function getDashboardData(req, res) {
  try {
    const lecturerId = req.user.id;

    // 1. Fetch all courses lecturer instructs
    const courses = await prisma.course.findMany({
      where: { lecturerId },
      select: {
        id: true,
        name: true,
      },
    });

    const courseIds = courses.map(c => c.id);

    // NEW METRIC: unitsInstructing
    const unitsInstructing = courses.length;

    // 2. Fetch all enrollments (students) for those courses
    const enrollments = await prisma.enrollment.findMany({
      where: {
        courseId: { in: courseIds },
        status: 'ACTIVE', // Only active enrollments (optional)
      },
      include: {
        student: true,
      },
    });

    // NEW METRIC: studentsInstructing
    const studentSet = new Set(enrollments.map(e => e.student.id));
    const studentsInstructing = studentSet.size;

    // Group students by courseId for easier processing
    const studentsByCourse = enrollments.reduce((acc, enrollment) => {
      if (!acc[enrollment.courseId]) acc[enrollment.courseId] = [];
      acc[enrollment.courseId].push(enrollment.student);
      return acc;
    }, {});

    const courseReport = {};

    for (const course of courses) {
      const students = studentsByCourse[course.id] || [];
      const totalStudents = students.length;

      const notStarted = students.filter(s => s.progress?.[course.id] === 'notStarted').length;
      const inProgress = students.filter(s => s.progress?.[course.id] === 'inProgress').length;
      const completed = students.filter(s => s.progress?.[course.id] === 'completed').length;

      const totalTime = students.reduce(
        (acc, s) => acc + (s.timeSpent?.[course.id] || 0),
        0
      );
      const avgTimeMinutes = totalStudents > 0 ? totalTime / totalStudents : 0;
      const averageTimeSpent = `${Math.floor(avgTimeMinutes / 60)}h ${Math.floor(avgTimeMinutes % 60)}m`;

      const engagement = totalStudents > 0 && completed / totalStudents > 0.7 ? 'High' : 'Medium';

      const mostSkippedModule = await findMostSkippedModule(course.id);

      courseReport[course.name] = {
        notStarted,
        inProgress,
        completed,
        totalStudents,
        averageTimeSpent,
        engagement,
        mostSkippedModule,
      };
    }

    // Student Progress Summary for all students assigned to this lecturer
    const lecturerEnrollments = await prisma.enrollment.findMany({
      where: {
        course: {
          lecturerId,
        },
        status: 'ACTIVE',
      },
      include: {
        student: true,
      },
    });

    const lecturerStudents = lecturerEnrollments.map(enr => enr.student);

    const averageCompletion = lecturerStudents.length
      ? lecturerStudents.reduce((acc, s) => acc + (s.completionPercentage || 0), 0) / lecturerStudents.length
      : 0;

    const topPerformerStudent = lecturerStudents.reduce((top, curr) => {
      return curr.completionPercentage > (top?.completionPercentage || 0) ? curr : top;
    }, null);

    const atRiskCount = lecturerStudents.filter(s => (s.completionPercentage || 0) < 50).length;

    const recentActivitiesRaw = await prisma.activityLog.findMany({
      where: {
        student: {
          enrollments: {
            some: {
              course: {
                lecturerId,
              },
            },
          },
        },
      },
      orderBy: { timestamp: 'desc' },
      take: 5,
      include: {
        student: true, // ensure student data is included
      },
    });

    const recentActivities = recentActivitiesRaw.map(act => ({
      name: act.student.firstName + ' ' + act.student.lastName,
      action: act.action,
      time: timeAgo(act.timestamp),
    }));

    const studentProgress = {
      averageCompletion: Math.round(averageCompletion),
      topPerformer: topPerformerStudent
        ? {
            name: `${topPerformerStudent.firstName} ${topPerformerStudent.lastName}`,
            percentage: Math.round(topPerformerStudent.completionPercentage),
          }
        : { name: '', percentage: 0 },
      atRiskCount,
      recentActivities,
    };

    // NEW METRIC: submissionsReceived
    const assignments = await prisma.assignment.findMany({
      where: {
        courseId: { in: courseIds },
      },
      include: {
        submissions: true,
      },
    });

    const submissionsReceived = assignments.reduce(
      (acc, assignment) => acc + assignment.submissions.length,
      0
    );

    return res.json({
      unitsInstructing,
      studentsInstructing,
      submissionsReceived,
      courseReport,
      studentProgress,
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({ message: 'Server error fetching dashboard data' });
  }
}
