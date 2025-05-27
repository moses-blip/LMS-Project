import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Register.module.css';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.name === 'role' 
      ? e.target.value.toUpperCase()
      : e.target.value;
      
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
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
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.registerPage}>
      <div className={styles.registerContainer}>
        <div className={styles.registerLeft}>
          <h1>Hello,</h1>
          <p>Welcome to the registration page of our E-LMS. Please fill out the form to access full features.</p>
          <p>If you already have an account, click below to login.</p>
          <Link to="/signin"><button className={styles.loginBtn}>LOGIN</button></Link>
        </div>

        <div className={styles.registerRight}>
          <h2>SIGN UP</h2>
          {error && <div className={styles.error}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className={styles.inputRow}>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
              />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />

            <div className={styles.positionGroup}>
              <label>Position:</label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="STUDENT"
                  checked={formData.role === 'STUDENT'}
                  onChange={handleChange}
                />
                Student
              </label>
              <label>
                <input
                  type="radio"
                  name="role"
                  value="LECTURER"
                  checked={formData.role === 'LECTURER'}
                  onChange={handleChange}
                />
                Lecturer
              </label>
            </div>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Retype Password"
              required
            />
            <button 
              type="submit" 
              className={styles.registerBtn}
              disabled={isLoading}
            >
              {isLoading ? 'REGISTERING...' : 'REGISTER'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
