import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from './lib/prisma.js';

import authRoutes from './routes/authRoutes.js';
import enrollmentRoutes from './routes/enrollmentRoutes.js';
import lecturerRoutes from './routes/lecturerRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import userRoutes from './routes/userRoutes.js';

// ES module dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Test database connection
async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Test query to ensure database is working
    const userCount = await prisma.user.count();
    console.log(`✅ Database is accessible. Total users: ${userCount}`);
    
    console.log('📝 Environment variables loaded:', {
      PORT: process.env.PORT || 4000,
      DATABASE_URL: process.env.DATABASE_URL ? '✅ Set' : '❌ Missing',
      JWT_SECRET: process.env.JWT_SECRET ? '✅ Set' : '❌ Missing'
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/enrollment', enrollmentRoutes);
app.use('/api/lecturer', lecturerRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// Start server
const PORT = process.env.PORT || 4000;

// Ensure database is connected before starting server
testConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
