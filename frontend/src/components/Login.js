// src/components/Login.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';

function Login() {
  return (
    <div className={styles.loginPage}>
      
      
      {/* Main Login Container */}
      <div className={styles.container}>
        <div className={styles.welcomeSection}>
          <h1>Welcome!</h1>
          <p>Click the button below To see Our latest and updated Features.</p>
          <Link to="/Courses">
          <button className="learn-more-btn">Learn More</button>
          </Link>
        </div>

        <div className={styles.loginForm}>
          <h2>Sign in</h2>
          <form>
            <label>User Name</label>
            <input type="text" placeholder="Enter Username" />

            <label>Password</label>
            <input type="password" placeholder="Enter Password" />

            <button type="submit">Submit</button>
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
