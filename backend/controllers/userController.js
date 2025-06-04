import prisma from '../lib/prisma.js';

// Get all lecturers
export const getLecturers = async (req, res) => {
  try {
    const lecturers = await prisma.user.findMany({
      where: {
        role: 'LECTURER'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      }
    });

    res.json({
      success: true,
      users: lecturers
    });
  } catch (error) {
    console.error('Error fetching lecturers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lecturers',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await prisma.user.findMany({
      where: {
        role: 'STUDENT'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      }
    });

    res.json({
      success: true,
      users: students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 