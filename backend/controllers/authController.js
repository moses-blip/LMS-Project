import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Fallback JWT secret for development (not recommended for production)
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-2024';

export const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Input validation
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required'
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // Password strength validation
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
  }

  // Role validation
  const validRoles = ['STUDENT', 'LECTURER'];  // Removed ADMIN from public registration
  if (!validRoles.includes(role.toUpperCase())) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or unauthorized role selection'
    });
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({ 
      where: { email },
      select: { id: true } // Only select id for efficiency
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user with uppercase role (ADMIN role is not possible here due to validation above)
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role.toUpperCase()
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      }
    });

    // Generate JWT token using the fallback secret if needed
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send success response
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        role: true
      }
    });

    // Check if user exists and password is correct
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;

    // Generate JWT token using the fallback secret if needed
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send success response
    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
