# Learning Management System (LMS)

A comprehensive Learning Management System built with React (Frontend) and Node.js (Backend).

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- Git
- npm or yarn
- A code editor (VS Code recommended)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd LMS-Project
```

### 2. Database Setup

1. **Install MySQL**
   - Download MySQL Community Server from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)
   - During installation:
     - Choose "Developer Default" or "Server only" setup type
     - Set root password (remember this password)
     - Complete the installation

2. **Create Database and User**
   - Open MySQL Command Line Client or MySQL Workbench
   - Log in with your root password
   - Run the following commands:
   ```sql
   CREATE DATABASE IF NOT EXISTS lms_db;
   DROP USER IF EXISTS 'lms_user'@'localhost';
   CREATE USER 'lms_user'@'localhost' IDENTIFIED BY 'lms123';
   GRANT ALL PRIVILEGES ON lms_db.* TO 'lms_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 3. Backend Setup

1. **Navigate to Backend Directory**
   ```bash
   cd backend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the backend directory
   - Add the following configuration:
   ```
   # Database Configuration
   DB_HOST=localhost
   DB_USER=lms_user
   DB_PASSWORD=lms123
   DB_NAME=lms_db
   DB_PORT=3306

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=24h

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # File Upload Configuration
   UPLOAD_PATH=uploads
   ```

4. **Initialize Database**
   ```bash
   npm run init-db
   ```
   This will create the necessary tables and an admin user.

5. **Start Backend Server**
   ```bash
   npm run dev
   ```
   The server should start on http://localhost:5000

### 4. Frontend Setup

1. **Navigate to Frontend Directory**
   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Frontend Development Server**
   ```bash
   npm start
   ```
   The application should open in your browser at http://localhost:3000

## Default Admin Account
- Email: admin@example.com
- Password: admin123

## Testing the Setup

1. **Verify Backend**
   - Open your browser or Postman
   - Try accessing: http://localhost:5000/api/auth/login
   - You should see a response (even if it's an error about missing credentials)

2. **Verify Frontend**
   - Open http://localhost:3000 in your browser
   - You should see the login page
   - Try logging in with the admin credentials

## Common Issues and Solutions

1. **Database Connection Issues**
   - Ensure MySQL service is running
   - Verify database credentials in `.env`
   - Check if the database and user exist

2. **Port Conflicts**
   - If port 5000 is in use, change it in backend/.env
   - If port 3000 is in use, the frontend will prompt to use a different port

3. **Module Not Found Errors**
   - Delete node_modules folder
   - Delete package-lock.json
   - Run `npm install` again

## Development Workflow

1. **Backend Development**
   - All API endpoints are prefixed with `/api`
   - Authentication is required for most endpoints
   - Use JWT token in Authorization header

2. **Frontend Development**
   - React components are in `frontend/src/components`
   - API calls should be made to `http://localhost:5000/api`
   - Store JWT token in localStorage

## Available Scripts

### Backend
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run init-db` - Initialize database

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong passwords in production
   - Change JWT secret in production

2. **Database**
   - Regularly backup the database
   - Use strong passwords
   - Limit database user privileges

3. **API Security**
   - All sensitive routes are protected
   - Input validation is implemented
   - CORS is configured

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License. 