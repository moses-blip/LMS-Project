# LMS Backend

This is the backend server for the Learning Management System (LMS) built with Node.js, Express, and MySQL.

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=lms_db
   DB_PORT=3306
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h
   PORT=5000
   NODE_ENV=development
   UPLOAD_PATH=uploads
   ```

4. Initialize the database:
   ```bash
   npm run init-db
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Users
- GET /api/users - Get all users (Admin only)
- GET /api/users/:id - Get single user (Admin only)
- POST /api/users - Create user (Admin only)
- PUT /api/users/:id - Update user (Admin only)
- DELETE /api/users/:id - Delete user (Admin only)

### Courses
- GET /api/courses - Get all courses
- GET /api/courses/:id - Get single course
- POST /api/courses - Create course (Admin/Lecturer)
- PUT /api/courses/:id - Update course (Admin/Lecturer)
- DELETE /api/courses/:id - Delete course (Admin)
- POST /api/courses/:id/enroll - Enroll in course (Student)
- DELETE /api/courses/:id/enroll - Unenroll from course (Student)

## Default Admin Account
- Email: admin@example.com
- Password: admin123

## Development

The server uses nodemon for development, which automatically restarts when files change.

## Production

For production deployment:
1. Set NODE_ENV=production in .env
2. Run `npm start`

## Security

- All passwords are hashed using bcrypt
- JWT is used for authentication
- CORS is enabled
- Input validation is implemented
- SQL injection protection through Sequelize 