import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

// Use the same fallback secret as in authController
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-2024';

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export default authenticate;
