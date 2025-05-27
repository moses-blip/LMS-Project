import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) {
    // Redirect to login if not authenticated
    return <Navigate to="/signin" replace />;
  }

  // Ensure user has a valid role
  const validRoles = ['admin', 'lecturer', 'student'];
  const userRole = user.role.toLowerCase();
  
  if (!validRoles.includes(userRole)) {
    // Redirect to login if role is invalid
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute; 