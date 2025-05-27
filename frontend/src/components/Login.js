// src/components/Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Redirect based on role
        switch(data.user.role.toLowerCase()) {
          case 'admin':
            navigate('/dashboard/admin');
            break;
          case 'lecturer':
            navigate('/dashboard/lecturer');
            break;
          case 'student':
            navigate('/dashboard/student');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      {/* Main Login Container */}
      <div className={styles.container}>
        <div className={styles.welcomeSection}>
          <h1>Welcome!</h1>
          <p>Click the button below To see Our latest and updated Features.</p>
          <Link to="/courses">
            <button className="learn-more-btn">Learn More</button>
          </Link>
        </div>

        <div className={styles.loginForm}>
          <h2>Sign in</h2>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <label>Email Address</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
              required
            />

            <label>Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password" 
              required
            />

            <button 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <div className={styles.registerLink}>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>
          <div className={styles.socialIcons}>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-pinterest"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
