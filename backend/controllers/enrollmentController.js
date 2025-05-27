import prisma from '../lib/prisma.js';

// 📥 GET all students (optionally filtered by search term)
export const getStudents = async (req, res) => {
  const search = req.query.search || '';
  try {
    const students = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
        OR: [
          { firstName: { contains: search, mode: 'insensitive' } },
          { lastName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      },
      include: {
        enrollments: {
          include: { 
            course: {
              include: {
                assignment: true,
                lecture: true
              }
            }
          },
        },
      },
    });

    const formatted = students.map((student) => {
      const currentEnrollment = student.enrollments[0];
      const course = currentEnrollment?.course;
      
      // Calculate progress if enrolled in a course
      let progress = 0;
      if (course) {
        const totalItems = course.assignment.length + course.lecture.length;
        const completedItems = 0; // This should be calculated based on completed assignments and attended lectures
        progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
      }

      return {
        id: student.id,
        name: `${student.firstName} ${student.lastName}`,
        regNo: `STD${student.id.toString().padStart(3, '0')}`,
        email: student.email,
        courseId: currentEnrollment?.courseId || null,
        courseName: course?.name || null,
        status: currentEnrollment ? currentEnrollment.status : 'Pending',
        progress: Math.round(progress),
      };
    });

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Failed to fetch students', error: err.message });
  }
};

// 📥 GET all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        _count: {
          select: {
            enrollments: true,
            assignment: true,
            lecture: true
          }
        }
      }
    });

    const formattedCourses = courses.map(course => ({
      id: course.id,
      name: course.name,
      description: course.description,
      enrolledStudents: course._count.enrollments,
      totalAssignments: course._count.assignment,
      totalLectures: course._count.lecture
    }));

    res.json(formattedCourses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
  }
};

// ✅ POST approve request or manual assignment
export const assignCourse = async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    // Check if student exists
    const student = await prisma.user.findUnique({
      where: { id: studentId },
      include: {
        enrollments: true
      }
    });

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId }
    });

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const enrollment = await prisma.enrollment.upsert({
      where: {
        studentId_courseId: {
          studentId,
          courseId
        },
      },
      update: {
        status: 'ACTIVE',
      },
      create: {
        studentId,
        courseId,
        status: 'ACTIVE',
        enrollmentDate: new Date()
      },
      include: {
        course: {
          include: {
            assignment: true,
            lecture: true
          }
        },
        student: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    res.json({ 
      success: true, 
      enrollment: {
        ...enrollment,
        studentName: `${enrollment.student.firstName} ${enrollment.student.lastName}`,
        courseName: enrollment.course.name,
        progress: 0, // Initial progress
        totalAssignments: enrollment.course.assignment.length,
        totalLectures: enrollment.course.lecture.length
      }
    });
  } catch (err) {
    console.error('Error assigning course:', err);
    res.status(500).json({ success: false, message: 'Failed to assign course', error: err.message });
  }
};

// ❌ DELETE enrollment
export const removeEnrollment = async (req, res) => {
  const { studentId, courseId } = req.body;
  try {
    await prisma.enrollment.delete({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });
    res.json({ success: true });
  } catch (err) {
    console.error('Error removing enrollment:', err);
    res.status(500).json({ success: false, message: 'Failed to remove enrollment', error: err.message });
  }
};
