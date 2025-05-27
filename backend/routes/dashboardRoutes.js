import express from 'express';
import prisma from '../lib/prisma.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticate, async (req, res) => {
  const userId = req.user.userId;
  let dashboardData = {};

  try {
    // Get user with role
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        enrollment: {
          include: {
            course: {
              include: {
                assignment: {
                  include: {
                    submission: true
                  }
                },
                lecture: {
                  include: {
                    attendance: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    switch (user.role) {
      case 'STUDENT':
        // Get all active enrollments for the student
        const enrollments = await prisma.enrollment.findMany({
          where: {
            studentId: userId,
            status: 'ACTIVE'
          },
          include: {
            course: {
              include: {
                assignment: {
                  include: {
                    submission: {
                      where: {
                        studentId: userId
                      }
                    }
                  }
                },
                lecture: {
                  include: {
                    attendance: {
                      where: {
                        studentId: userId
                      }
                    }
                  }
                }
              }
            }
          }
        });

        // Calculate course statistics
        const courseStats = enrollments.map(enrollment => {
          const course = enrollment.course;
          const totalAssignments = course.assignment.length;
          const completedAssignments = course.assignment.filter(a => 
            a.submission.some(s => s.studentId === userId)
          ).length;
          const totalLectures = course.lecture.length;
          const attendedLectures = course.lecture.filter(l => 
            l.attendance.some(a => a.studentId === userId && a.attended)
          ).length;

          const progress = Math.round(
            ((completedAssignments / (totalAssignments || 1)) * 0.6 + 
             (attendedLectures / (totalLectures || 1)) * 0.4) * 100
          );

          return {
            id: course.id,
            name: course.name,
            description: course.description,
            progress,
            totalAssignments,
            completedAssignments,
            totalLectures,
            attendedLectures,
            nextAssignment: course.assignment
              .filter(a => !a.submission.some(s => s.studentId === userId))[0]
          };
        });

        dashboardData = {
          role: 'STUDENT',
          name: `${user.firstName} ${user.lastName}`,
          enrolledCourses: courseStats.length,
          completedCourses: courseStats.filter(c => c.progress === 100).length,
          averageProgress: Math.round(
            courseStats.reduce((sum, c) => sum + c.progress, 0) / (courseStats.length || 1)
          ),
          courses: courseStats
        };
        break;

      case 'LECTURER':
        // Fetch courses taught by lecturer
        const courses = await prisma.course.findMany({
          where: {
            lecturerId: userId
          },
          include: {
            enrollment: {
              include: {
                user: true
              }
            },
            assignment: {
              include: {
                submission: true
              }
            },
            lecture: {
              include: {
                attendance: true
              }
            }
          }
        });

        // Calculate dashboard metrics
        const unitsInstructing = courses.length;
        const studentsInstructing = new Set(courses.flatMap(c => 
          c.enrollment.map(e => e.user.id)
        )).size;

        const submissionsReceived = courses.reduce((total, course) =>
          total + course.assignment.reduce((sum, assignment) =>
            sum + assignment.submission.length, 0
          ), 0
        );

        // Process course reports
        const courseReport = {};
        for (const course of courses) {
          const totalStudents = course.enrollment.length;
          const notStarted = course.enrollment.filter(e => !e.progress).length;
          const completed = course.enrollment.filter(e => e.status === 'COMPLETED').length;
          const inProgress = totalStudents - notStarted - completed;

          courseReport[course.name] = {
            totalStudents,
            notStarted,
            inProgress,
            completed,
            averageTimeSpent: '2 hours',
            engagement: totalStudents > 0 ? `${Math.round((inProgress + completed) / totalStudents * 100)}%` : '0%',
            mostSkippedModule: 'Module 1'
          };
        }

        // Calculate student progress metrics
        const allStudents = courses.flatMap(c => c.enrollment.map(e => e.user));
        const uniqueStudents = Array.from(new Set(allStudents.map(s => s.id)))
          .map(id => allStudents.find(s => s.id === id));

        // Calculate average completion
        const averageCompletion = uniqueStudents.length > 0
          ? Math.round(uniqueStudents.reduce((sum, student) => {
              const studentEnrollments = courses.flatMap(c => 
                c.enrollment.filter(e => e.user.id === student.id)
              );
              const completedCount = studentEnrollments.filter(e => e.status === 'COMPLETED').length;
              return sum + (completedCount / Math.max(1, studentEnrollments.length) * 100);
            }, 0) / uniqueStudents.length)
          : 0;

        // Find top performer
        const topPerformer = uniqueStudents.reduce((top, student) => {
          const studentEnrollments = courses.flatMap(c => 
            c.enrollment.filter(e => e.user.id === student.id)
          );
          const completedCount = studentEnrollments.filter(e => e.status === 'COMPLETED').length;
          const progress = (completedCount / Math.max(1, studentEnrollments.length)) * 100;
          
          return (!top || progress > top.progress)
            ? { name: `${student.firstName} ${student.lastName}`, progress }
            : top;
        }, null) || { name: 'No students yet', progress: 0 };

        // Count at-risk students (below 50% progress)
        const atRiskCount = uniqueStudents.filter(student => {
          const studentEnrollments = courses.flatMap(c => 
            c.enrollment.filter(e => e.user.id === student.id)
          );
          const completedCount = studentEnrollments.filter(e => e.status === 'COMPLETED').length;
          const progress = (completedCount / Math.max(1, studentEnrollments.length)) * 100;
          return progress < 50;
        }).length;

        // Get recent activities
        const recentActivities = await prisma.activityLog.findMany({
          where: {
            courseId: {
              in: courses.map(c => c.id)
            }
          },
          include: {
            user: true
          },
          orderBy: {
            timestamp: 'desc'
          },
          take: 5
        });

        dashboardData = {
          role: 'LECTURER',
          name: `${user.firstName} ${user.lastName}`,
          unitsInstructing,
          studentsInstructing,
          submissionsReceived,
          courseReport,
          studentProgress: {
            averageCompletion,
            topPerformer: {
              name: topPerformer.name,
              percentage: Math.round(topPerformer.progress)
            },
            atRiskCount,
            recentActivities: recentActivities.map(activity => ({
              name: `${activity.user.firstName} ${activity.user.lastName}`,
              action: activity.action,
              time: new Date(activity.timestamp).toLocaleString()
            }))
          }
        };
        break;

      case 'ADMIN':
        // Fetch all students and their progress
        const students = await prisma.user.findMany({
          where: { role: 'STUDENT' },
          include: {
            enrollment: {
              include: {
                course: {
                  include: {
                    assignment: true
                  }
                }
              }
            },
            submission: true
          }
        });

        const studentProgress = students.map(student => {
          const completedAssignments = student.submission.length;
          const totalAssignments = student.enrollment.reduce((sum, enrollment) =>
            sum + enrollment.course.assignment.length, 0
          );
          const progress = totalAssignments > 0
            ? Math.round((completedAssignments / totalAssignments) * 100)
            : 0;

          return {
            name: `${student.firstName} ${student.lastName}`,
            progress,
            color: progress > 80 ? 'navy' : progress > 60 ? 'blue' : 'yellow'
          };
        });

        // Calculate admin working hours (from activity logs)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const adminLogs = await prisma.activityLog.count({
          where: {
            studentId: userId,
            timestamp: {
              gte: today
            }
          }
        });

        const adminWorkingHours = {
          targetHours: 8,
          completedHours: Math.min(8, Math.round(adminLogs / 10)), // Assuming each activity takes ~6 minutes
          percentage: Math.min(100, Math.round((adminLogs / 80) * 100)) // 80 activities = 8 hours
        };

        dashboardData = {
          studentProgress,
          adminWorkingHours
        };
        break;

      default:
        return res.status(403).json({ message: 'Invalid user role' });
    }

    res.json(dashboardData);
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: error.message });
  }
});

export default router; 