// src/components/Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
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
        switch(data.user.role) {
          case 'admin':
            navigate('/dashboard/admin');
            break;
          case 'instructor':
            navigate('/dashboard/lecturer');
            break;
          case 'student':
            navigate('/dashboard/student');
            break;
          default:
            navigate('/dashboard');
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
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

            <button type="submit">Sign In</button>
          </form>
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
