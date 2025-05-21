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
     - Set a strong root password
     - Complete the installation

2. **Create Database and User**
   - Open MySQL Command Line Client or MySQL Workbench
   - Log in with your root password
   - Create a new database and user with appropriate permissions
   - Use strong passwords for all database users

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
   - Copy `.env.example` to `.env` in the backend directory
   - Update the values in `.env` with your secure configuration
   - Never commit the `.env` file to version control

4. **Initialize Database**
   ```bash
   npm run init-db
   ```
   This will create the necessary tables and prompt you to create an admin user.

5. **Start Backend Server**
   ```bash
   npm start
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

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong, unique passwords
   - Rotate secrets regularly
   - Use different credentials for development and production

2. **Database**
   - Regularly backup the database
   - Use strong passwords
   - Limit database user privileges
   - Enable SSL for database connections

3. **API Security**
   - All sensitive routes are protected
   - Input validation is implemented
   - CORS is configured
   - Rate limiting is enabled
   - Use HTTPS in production

## Development Workflow

1. **Backend Development**
   - All API endpoints are prefixed with `/api`
   - Authentication is required for most endpoints
   - Use JWT token in Authorization header

2. **Frontend Development**
   - React components are in `frontend/src/components`
   - API calls should be made to the configured backend URL
   - Store JWT token securely
   - Use the `ProtectedRoute` component for authenticated routes

## Available Scripts

### Backend
- `npm start` - Start backend server
- `npm run init-db` - Initialize database

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License.

## Documentation

For detailed API documentation and development guidelines, please refer to the project's internal documentation or contact the development team. 