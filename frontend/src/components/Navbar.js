// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <Link to="/" className={styles.brand}>
          <img src={logo} alt="Thika Technical Logo" className={styles.logo} />
          <span className={styles.institution}>
            ThikaTechnical<span>TrainingInstitute</span>
          </span>
        </Link>
        <button className={styles.menuBtn} onClick={toggleMenu}>
          ☰
        </button>
      </div>

      <div className={`${styles.right} ${isMobileMenuOpen ? styles.show : ''}`}>
        <Link to="/">Home</Link>
        <span className={styles.dot}>·</span>
        <Link to="/courses">Courses</Link>
        <span className={styles.dot}>·</span>
        <Link to="/about">About Us</Link>
        <span className={styles.dot}>·</span>
        <Link to="/contact">Contact Info</Link>
        <span className={styles.dot}>·</span>
        <Link to="/signin">Sign In</Link>
        <span className={styles.dot}>·</span>
        <Link to="/register">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
