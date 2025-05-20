// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/logo.png'; // Replace with your actual logo path

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <img src={logo} alt="Thika Technical Logo" className={styles.logo} />
        <span className={styles.institution}>
          ThikaTechnical<span>TrainingInstitute</span>
        </span>
      </div>

      <div className={styles.right}>
        <Link to="/">Home</Link>
        <span className={styles.dot}>·</span>
        <Link to="/courses">Courses</Link>
        <span className={styles.dot}>·</span>
        <Link to="/about">About Us</Link>
        <span className={styles.dot}>.</span>
        <Link to="/contact">ContactInfo</Link>
        <span className={styles.dot}>·</span>
        <Link to="/signin">Sign In</Link>
        <span className={styles.dot}>·</span>
        <Link to="/signup">Sign Up</Link>
        

      </div>
    </nav>
  );
};

export default Navbar;
